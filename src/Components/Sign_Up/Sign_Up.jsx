import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [showerr, setShowerr] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = "Phone number must contain exactly 10 digits.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        return newErrors;
    };

    const register = async (e) => {
        e.preventDefault();

        setShowerr("");

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);

                navigate("/");
                window.location.reload();
            } else {
                if (json.errors) {
                    setShowerr(json.errors[0].msg);
                } else {
                    setShowerr(json.error || "Registration failed.");
                }
            }
        } catch (error) {
            setShowerr("Unable to connect to the server.");
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setErrors({});
        setShowerr("");
    };

    return (
        <div className="container" style={{ marginTop: "5%" }}>
            <div className="signup-card">

                <h1>Sign Up</h1>

                <p className="login-link">
                    Already a member?{" "}
                    <Link to="/login">Login</Link>
                </p>

                <form method="POST" onSubmit={register}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />

                        {errors.name && (
                            <span className="error">{errors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            name="phone"
                            id="phone"
                            className="form-control"
                            placeholder="Enter 10 digit phone number"
                            maxLength="10"
                            required
                        />

                        {errors.phone && (
                            <span className="error">{errors.phone}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}

                        {showerr && (
                            <div className="err" style={{ color: "red", marginTop: "5px" }}>
                                {showerr}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />

                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={resetForm}
                        >
                            Reset
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Sign_Up;