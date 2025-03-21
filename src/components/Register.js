import React, { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", role: "student" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            alert("Registration Successful!");
            console.log(data);
        } catch (err) {
            console.error("Registration Error:", err); // Debugging
            setError(err); // Ensure it's always a string
        }
    };


    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{String(error)}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <select name="role" onChange={handleChange} required>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>

        </div>
    );
};

export default Register;
