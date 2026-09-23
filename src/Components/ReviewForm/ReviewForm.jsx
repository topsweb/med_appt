import React from "react";
import "./ReviewForm.css";
import GiveReviews from "./GiveReviews";

const ReviewForm = ({
    doctorName = "Dr. John Smith",
    speciality = "Dentist",
    appointmentData = null
}) => {
    return (
        <div className="review-card">
            <h1>Consultation Reviews</h1>

            <div className="review-doctor-details">
                <h2>{doctorName}</h2>

                <p>
                    <strong>Speciality:</strong> {speciality}
                </p>

                {appointmentData && (
                    <>
                        <p>
                            <strong>Appointment Date:</strong>{" "}
                            {appointmentData.date}
                        </p>

                        <p>
                            <strong>Appointment Time:</strong>{" "}
                            {appointmentData.time}
                        </p>
                    </>
                )}

                <p>
                    <strong>Provide Feedback:</strong>
                </p>

                <GiveReviews doctorName={doctorName} />
            </div>
        </div>
    );
};

export default ReviewForm;