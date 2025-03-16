import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Show loading spinner
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token); // Debugging log

        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User data received:", response.data); // Debugging log

        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err.response ? err.response.data : err);
        setError(err.response?.data?.message || "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="text-center mt-5 text-danger">{error}</Container>;
  }

  return (
    <Container className="dashboard-container">
      <h2 className="mb-4 text-center text-primary">User Dashboard</h2>

      {/* User Profile */}
      <Card className="profile-card mb-4 shadow-sm">
        <Card.Body>
          <h4 className="card-title">Profile</h4>
          <p className="card-text"><strong>Name:</strong> {user.name}</p>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
        </Card.Body>
      </Card>

      {/* Dashboard Options */}
      <div className="text-center">
        <Button variant="primary" className="m-2" onClick={() => navigate("/donation-history")}>
          View Donation History
        </Button>
        <Button variant="success" className="m-2" onClick={() => navigate("/make-donation")}>
          Make a Donation
        </Button>
        <Button variant="info" className="m-2" onClick={() => navigate("/track-impact")}>
          Track Donation Impact
        </Button>
        <Button variant="warning" className="m-2" onClick={() => navigate("/profile-settings")}>
          Profile Details
        </Button>
        <Button variant="danger" className="m-2" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default UserDashboard;
