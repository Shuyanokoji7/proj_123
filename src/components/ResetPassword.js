import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api";

const ResetPassword = () => {
    const { userId, token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(userId, token, password);
            setMessage("Password reset successful! Redirecting to login...");
            setError("");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Password reset failed.");
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
