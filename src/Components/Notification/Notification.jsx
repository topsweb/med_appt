import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const loadAppointment = () => {
        const storedEmail = sessionStorage.getItem("email");

        const storedDoctorData = JSON.parse(
            localStorage.getItem("doctorData")
        );

        let storedAppointmentData = null;

        if (storedDoctorData?.name) {
            storedAppointmentData = JSON.parse(
                localStorage.getItem(storedDoctorData.name)
            );
        }

        if (storedEmail) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        if (storedDoctorData && storedAppointmentData) {
            setDoctorData(storedDoctorData);
            setAppointmentData(storedAppointmentData);
            setShowNotification(true);
        } else {
            setDoctorData(null);
            setAppointmentData(null);
            setShowNotification(false);
        }
    };

    useEffect(() => {
        loadAppointment();

        window.addEventListener(
            "appointmentUpdated",
            loadAppointment
        );

        return () => {
            window.removeEventListener(
                "appointmentUpdated",
                loadAppointment
            );
        };
    }, []);

    return (
        <>
            {children}

            {isLoggedIn && showNotification && appointmentData && (
                <div className="appointment-notification">
                    <div className="appointment-card">
                        <h3>Appointment Details</h3>

                        <p>
                            <strong>Patient:</strong> {appointmentData.name}
                        </p>

                        <p>
                            <strong>Doctor:</strong> {doctorData?.name}
                        </p>

                        <p>
                            <strong>Date:</strong> {appointmentData.date}
                        </p>

                        <p>
                            <strong>Time:</strong> {appointmentData.time}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notification;