import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
    const name = sessionStorage.getItem("name") || "Patient";
    const email = sessionStorage.getItem("email") || "Not available";
    const phone = sessionStorage.getItem("phone") || "Not available";

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-avatar">
                    {name.charAt(0).toUpperCase()}
                </div>

                <h1>Patient Profile</h1>

                <div className="profile-details">
                    <div className="profile-row">
                        <span className="profile-label">Name</span>
                        <span>{name}</span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-label">Email</span>
                        <span>{email}</span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-label">Phone</span>
                        <span>{phone}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;