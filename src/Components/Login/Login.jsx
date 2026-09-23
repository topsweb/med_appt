import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        sessionStorage.setItem("email", formData.email);

        alert("Login information is valid.");
    };

    return (
        <div className="container">
            <div className="login-card">

                <h1>Login</h1>

                <p className="signup-link">
                    Are you a new member?{" "}
                    <Link to="/signup">Sign Up Here</Link>
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
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
                            Login
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                setFormData({
                                    email: "",
                                    password: ""
                                });
                                setErrors({});
                            }}
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