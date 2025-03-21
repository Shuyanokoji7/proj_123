import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


const App = () => {
    const [isAuthenticated, setAuth] = useState(!!localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/logout" element={isAuthenticated ? <Logout setAuth={setAuth} /> : <Navigate to="/login" />} />
                <Route path="/" element={isAuthenticated ? <Navigate to="/register" /> : <Navigate to="/login" />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />           
            </Routes>
        </Router>
    );
};

export default App;
