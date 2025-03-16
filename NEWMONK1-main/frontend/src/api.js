import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed" };
  }
};
