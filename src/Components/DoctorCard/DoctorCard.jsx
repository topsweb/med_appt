import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);

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

                {!showAppointmentForm && (
                    <div>
                        <button
                            className="book-appointment-btn"
                            onClick={() => setShowAppointmentForm(true)}
                        >
                            <div>Book Appointment</div>
                            <div>No Booking Fee</div>
                        </button>
                    </div>
                )}

                {showAppointmentForm && (
                    <AppointmentForm
                        doctorName={name}
                        onClose={() => setShowAppointmentForm(false)}
                    />
                )}

            </div>
        </div>
    );
};

export default DoctorCard;