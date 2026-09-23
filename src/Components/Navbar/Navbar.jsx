import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const authToken = sessionStorage.getItem("auth-token");
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    const displayName =
        storedName ||
        (storedEmail ? storedEmail.split("@")[0] : "");

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("email");

        navigate("/");
        window.location.reload();
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
    <Link to="/appointments">Appointments</Link>
</li>
<li className="link">
    <Link to="/reviews">Reviews</Link>
</li>
<li className="link">
    <Link to="/instant-consultation">
        Instant Consultation
    </Link>
</li>

                {authToken ? (
                    <>
                        <li className="link user-name">
                            {displayName}
                        </li>

                        <li className="link">
                            <button
                                className="btn primary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn secondary">
                                    Sign Up
                                </button>
                            </Link>
                        </li>

                        <li className="link">
                            <Link to="/login">
                                <button className="btn primary">
                                    Login
                                </button>
                            </Link>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    );
};

export default Navbar;