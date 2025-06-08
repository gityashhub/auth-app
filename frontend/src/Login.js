import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Form.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post("/api/login", { email, password });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/profile");
            } else {
                setError(res.data.error);
            }
        } catch {
            setError("Login failed. Please try again later.");
        }
    };

    return (
        <form onSubmit={loginUser} className="form-box">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <p className="switch-link">Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
    );
}

export default Login;
