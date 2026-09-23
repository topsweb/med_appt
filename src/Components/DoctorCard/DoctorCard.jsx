import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
    return (
        <div className="doctor-card">
            <div className="doctor-card-details-container">

                <h2>{name}</h2>

                <p>
                    <strong>Speciality:</strong> {speciality}
                </p>

                <p>
                    <strong>Experience:</strong> {experience}
                </p>

                <p>
                    <strong>Rating:</strong> ⭐ {ratings}
                </p>

                <div>
                    <button className="book-appointment-btn">
                        <div>Book Appointment</div>
                        <div>No Booking Fee</div>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DoctorCard;
