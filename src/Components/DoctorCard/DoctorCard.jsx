import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [appointment, setAppointment] = useState(null);

    const handleBookAppointment = (appointmentData) => {
        setAppointment(appointmentData);
        setShowAppointmentForm(false);
    };

    const handleCancelAppointment = () => {
        setAppointment(null);
        setShowAppointmentForm(false);
    };

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

                {!appointment && !showAppointmentForm && (
                    <button
                        className="book-appointment-btn"
                        onClick={() => setShowAppointmentForm(true)}
                    >
                        <div>Book Appointment</div>
                        <div>No Booking Fee</div>
                    </button>
                )}

                {showAppointmentForm && !appointment && (
                    <AppointmentForm
                        doctorName={name}
                        onBook={handleBookAppointment}
                        onClose={() => setShowAppointmentForm(false)}
                    />
                )}

                {appointment && (
                    <div className="doctor-card-options-container">
                        <h3>Appointment Booked</h3>

                        <p>
                            <strong>Patient:</strong> {appointment.name}
                        </p>

                        <p>
                            <strong>Date:</strong> {appointment.date}
                        </p>

                        <p>
                            <strong>Time:</strong> {appointment.time}
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={handleCancelAppointment}
                        >
                            Cancel Appointment
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DoctorCard;