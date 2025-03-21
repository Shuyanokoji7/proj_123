import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/user/"; // Adjust if backend is deployed

// Register User
export const registerUser = async (userData) => {
    console.log("Sending user data:", userData);
    try {
        const response = await axios.post(`${API_BASE_URL}register/`, userData, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("API Response:", response);
        return response.data;
    } catch (err) {
        console.log("Registration Error:", err.response?.data || err.message);
        throw err.response?.data || { error: "Registration failed. Please try again." };
    }
};

// Login User
export const loginUser = async (loginData) => {
    console.log("Sending login request with data:", JSON.stringify(loginData)); // Debugging
    
    try {
        const response = await axios.post(`${API_BASE_URL}login/`, loginData, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("API Response:", response.data);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || { error: "Login failed. Please check your credentials." };
    }
};


// Request Password Reset
export const requestPasswordReset = async (email) => {
    console.log("Sending password reset request:", email);
    try {
        const response = await axios.post(`${API_BASE_URL}password-reset/`, { email });
        console.log("Reset response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Password reset error:", error.response?.data || error.message);
        throw error.response?.data || { error: "Failed to send reset email" };
    }
};

// Reset Password
export const resetPassword = async (userId, token, password) => {
    console.log("Sending password reset confirmation:", userId, token, password);
    try {
        const response = await axios.post(
            `${API_BASE_URL}password-reset-confirm/${userId}/${token}/`,
            { password },
            { headers: { "Content-Type": "application/json" } }  // Ensure correct headers
        );
        return response.data;
    } catch (error) {
        console.error("Password reset confirmation error:", error.response?.data || error.message);
        throw error.response?.data || { error: "Password reset failed" };
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        const token = localStorage.getItem("token");
        await axios.post(`${API_BASE_URL}logout/`, {}, {
            headers: { Authorization: `Token ${token}` },
        });
        localStorage.removeItem("token"); // Remove token
    } catch (error) {
        throw error.response.data;
    }
};
