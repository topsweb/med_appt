import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const [updatedDetails, setUpdatedDetails] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");

        if (!authtoken) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            if (!authtoken || !email) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/auth/user`,
                {
                    headers: {
                        Authorization: `Bearer ${authtoken}`,
                        Email: email
                    }
                }
            );

            if (response.ok) {
                const user = await response.json();

                setUserDetails(user);
                setUpdatedDetails(user);
                setError("");
            } else {
                setError("Failed to fetch user profile.");
            }
        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");
        }
    };

    const handleEdit = () => {
        setUpdatedDetails(userDetails);
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            if (!authtoken || !email) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/auth/user`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                        Email: email
                    },
                    body: JSON.stringify(updatedDetails)
                }
            );

            if (response.ok) {
                setUserDetails(updatedDetails);

                sessionStorage.setItem(
                    "name",
                    updatedDetails.name
                );

                sessionStorage.setItem(
                    "phone",
                    updatedDetails.phone
                );

                setEditMode(false);
                setError("");

                alert("Profile Updated Successfully!");
            } else {
                setError("Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");
        }
    };

    const handleCancel = () => {
        setUpdatedDetails(userDetails);
        setEditMode(false);
        setError("");
    };

    return (
        <div className="profile-page">
            <div className="profile-card">

                <div className="profile-avatar">
                    {userDetails.name
                        ? userDetails.name.charAt(0).toUpperCase()
                        : "P"}
                </div>

                {error && (
                    <p className="profile-error">
                        {error}
                    </p>
                )}

                {editMode ? (
                    <>
                        <h1>Edit Profile</h1>

                        <form
                            className="profile-form"
                            onSubmit={handleSubmit}
                        >
                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={userDetails.email || ""}
                                    disabled
                                />
                            </label>

                            <label>
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedDetails.name || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>

                            <label>
                                Phone
                                <input
                                    type="text"
                                    name="phone"
                                    value={updatedDetails.phone || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>

                            <div className="profile-buttons">
                                <button
                                    type="submit"
                                    className="profile-save-btn"
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    className="profile-cancel-btn"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h1>
                            Welcome, {userDetails.name}
                        </h1>

                        <div className="profile-details">
                            <div className="profile-row">
                                <span className="profile-label">
                                    Name
                                </span>
                                <span>
                                    {userDetails.name}
                                </span>
                            </div>

                            <div className="profile-row">
                                <span className="profile-label">
                                    Email
                                </span>
                                <span>
                                    {userDetails.email}
                                </span>
                            </div>

                            <div className="profile-row">
                                <span className="profile-label">
                                    Phone
                                </span>
                                <span>
                                    {userDetails.phone}
                                </span>
                            </div>
                        </div>

                        <button
                            className="profile-edit-btn"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default ProfileCard;