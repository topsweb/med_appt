import React from "react";
import ReviewForm from "./ReviewForm";

const ReviewFormApp = () => {
    const email = sessionStorage.getItem("email");

    let doctorData = null;
    let appointmentData = null;

    if (email) {
        const storedDoctor = localStorage.getItem(
            `doctorData:${email}`
        );

        if (storedDoctor) {
            doctorData = JSON.parse(storedDoctor);

            const storedAppointment = localStorage.getItem(
                `appointment:${email}:${doctorData.name}`
            );

            if (storedAppointment) {
                appointmentData = JSON.parse(storedAppointment);
            }
        }
    }

    return (
        <ReviewForm
            doctorName={doctorData?.name || "Dr. John Smith"}
            speciality={doctorData?.speciality || "Dentist"}
            appointmentData={appointmentData}
        />
    );
};

export default ReviewFormApp;