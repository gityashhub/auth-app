import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("/api/profile", {
                headers: { "x-access-token": token },
            }).then((res) => setUser(res.data.user))
              .catch(() => setError("Invalid token or please login again"));
        } else {
            setError("No token found. Please login first.");
        }
    }, []);

    return (
        <div className="profile-box">
            <h2>Profile</h2>
            {error && <p className="error">{error}</p>}
            {user ? (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </>
            ) : !error && <p>Loading...</p>}
        </div>
    );
}

export default Profile;
