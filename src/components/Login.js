import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            
            if (data.token) {
                localStorage.setItem("authToken", data.token);
                setAuth(true);
                alert("Login Successful!");
                navigate("/dashboard");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.log("Login Error:", err.response?.data || err.message); // Debugging
            setError(err.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{String(error)}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>
                <a href="/forgot-password" style={{ color: "blue", cursor: "pointer" }}>Forgot Password?</a>
            </p>
        </div>
    );
};

export default Login;
