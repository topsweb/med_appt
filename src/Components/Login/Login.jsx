import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showerr, setShowerr] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    };

    const login = async (e) => {
        e.preventDefault();

        setShowerr("");

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const json = await res.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("email", email);

                navigate("/");
                window.location.reload();
            } else {
                if (json.errors) {
                    setShowerr(json.errors[0].msg);
                } else {
                    setShowerr(json.error || "Login failed.");
                }
            }
        } catch (error) {
            setShowerr("Unable to connect to the server.");
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setErrors({});
        setShowerr("");
    };

    return (
        <div className="container">
            <div className="login-card">

                <h1>Login</h1>

                <p className="signup-link">
                    Are you a new member?{" "}
                    <Link to="/signup">Sign Up Here</Link>
                </p>

                <form onSubmit={login}>

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
                            <div
                                className="err"
                                style={{
                                    color: "red",
                                    marginTop: "5px"
                                }}
                            >
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

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={resetForm}
                        >
                            Reset
                        </button>

                    </div>

                    <p className="forgot-password">
                        Forgot Password?
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;