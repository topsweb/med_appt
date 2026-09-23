import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sign_Up.css";

const Sign_Up = () => {
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        phone: "",
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

        if (!formData.role) {
            newErrors.role = "Please select a role.";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must contain exactly 10 digits.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
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

        sessionStorage.setItem("name", formData.name);
        sessionStorage.setItem("email", formData.email);

        alert("Sign up information is valid.");
    };

    return (
        <div className="container">
            <div className="signup-card">

                <h1>Sign Up</h1>

                <p className="login-link">
                    Already a member?{" "}
                    <Link to="/login">Login</Link>
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="role">Role</label>

                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>

                        {errors.role && (
                            <span className="error">{errors.role}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
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
                            type="email"
                            id="email"
                            name="email"
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
                            id="password"
                            name="password"
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
                            Submit
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                setFormData({
                                role: "",
                                name: "",
                                phone: "",
                                email: "",
                                password: ""
                            });
                            setErrors({});
                        }}
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