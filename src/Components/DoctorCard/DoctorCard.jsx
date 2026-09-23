import React, { useEffect, useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [appointment, setAppointment] = useState(null);

    const email = sessionStorage.getItem("email");

    const appointmentKey = email
        ? `appointment:${email}:${name}`
        : null;

    const doctorKey = email
        ? `doctorData:${email}`
        : null;

    // Reload an existing appointment when the DoctorCard is displayed again
    useEffect(() => {
        if (!appointmentKey) {
            setAppointment(null);
            return;
        }

        const storedAppointment = localStorage.getItem(appointmentKey);

        if (storedAppointment) {
            setAppointment(JSON.parse(storedAppointment));
        } else {
            setAppointment(null);
        }
    }, [appointmentKey]);

    const handleBookAppointment = (appointmentData) => {
        if (!email) {
            alert("Please log in before booking an appointment.");
            return;
        }

        const selectedDoctor = {
            name,
            speciality,
            experience,
            ratings
        };

        setAppointment(appointmentData);
        setShowAppointmentForm(false);

        localStorage.setItem(
            doctorKey,
            JSON.stringify(selectedDoctor)
        );

        localStorage.setItem(
            appointmentKey,
            JSON.stringify(appointmentData)
        );

        window.dispatchEvent(
            new Event("appointmentUpdated")
        );
    };

    const handleCancelAppointment = () => {
        setAppointment(null);
        setShowAppointmentForm(false);

        if (appointmentKey) {
            localStorage.removeItem(appointmentKey);
        }

        if (doctorKey) {
            localStorage.removeItem(doctorKey);
        }

        window.dispatchEvent(
            new Event("appointmentUpdated")
        );
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
                        onClick={() => {
                            if (!email) {
                                alert("Please log in before booking an appointment.");
                                return;
                            }

                            setShowAppointmentForm(true);
                        }}
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