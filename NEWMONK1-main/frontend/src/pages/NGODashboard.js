import React, { useState, useEffect } from "react";
import { Container, Table, Card, Button, Form, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NGODashboard = () => {
  const navigate = useNavigate();
  const [fundsReceived, setFundsReceived] = useState("₹10,000");
  const [spendings, setSpendings] = useState([
    { id: 1, project: "Food Distribution", fundsUsed: "₹1800", date: "2024-03-18", invoice: null },
    { id: 2, project: "Tree Plantation Drive", fundsUsed: "₹2500", date: "2024-03-12", invoice: null },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleInvoiceUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      setSpendings(spendings.map((item) =>
        item.id === id ? { ...item, invoice: file.name } : item
      ));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Navbar.Brand href="#">NGO Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Nav>
      </Navbar>

      <Container className="dashboard-container">
        {/* NGO Profile */}
        <Card className="profile-card mb-4 shadow-sm">
          <Card.Body>
            <h4 className="card-title">NGO Profile</h4>
            <p className="card-text"><strong>Name:</strong> Helping Hands</p>
            <p className="card-text"><strong>Email:</strong> helpinghands@example.com</p>
            <p className="card-text"><strong>Total Donations Received:</strong> {fundsReceived}</p>
          </Card.Body>
        </Card>

        {/* Fund Allocation Table */}
        <h4 className="mb-3 text-secondary">Fund Usage & Invoice Upload</h4>
        <Table striped bordered hover className="shadow-sm">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Funds Used</th>
              <th>Date</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {spendings.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.project}</td>
                <td>{item.fundsUsed}</td>
                <td>{item.date}</td>
                <td>
                  {item.invoice ? (
                    <span className="text-success">{item.invoice}</span>
                  ) : (
                    <Form.Group controlId={`invoiceUpload-${item.id}`}>
                      <Form.Control
                        type="file"
                        onChange={(event) => handleInvoiceUpload(event, item.id)}
                        className="form-control-sm"
                      />
                    </Form.Group>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Update Milestones Button */}
        <div className="text-center">
          <Button variant="info" className="m-2">Update Milestones</Button>
        </div>
      </Container>
    </>
  );
};

export default NGODashboard;
