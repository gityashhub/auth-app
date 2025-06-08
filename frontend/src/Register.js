import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Form.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post("/api/register", { name, email, password });
            if (res.data.status === "ok") navigate("/");
            else setError(res.data.error);
        } catch {
            setError("Registration failed. Please try again later.");
        }
    };

    return (
        <form onSubmit={registerUser} className="form-box">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Register</button>
            <p className="switch-link">Already have an account? <Link to="/">Login here</Link></p>
        </form>
    );
}

export default Register;