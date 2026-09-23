import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    <span className="logo-icon">✚</span>
                    StayHealthy
                </Link>
            </div>

            <div className="nav__icon" onClick={handleClick}>
                <i className={menuOpen ? "fa fa-times" : "fa fa-bars"}></i>
            </div>

            <ul className={menuOpen ? "nav__links active" : "nav__links"}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>

                <li className="link">
                    <a href="#">Appointments</a>
                </li>

                <li className="link">
                    <a href="#">
                        <button className="btn secondary">Sign Up</button>
                    </a>
                </li>

                <li className="link">
                    <a href="#">
                        <button className="btn primary">Login</button>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;