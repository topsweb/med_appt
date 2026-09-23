import React from "react";
import "./ReviewForm.css";
import GiveReviews from "./GiveReviews";

const ReviewForm = () => {
    return (
        <div className="review-card">
            <h1>Consultation Reviews</h1>

            <div className="review-doctor-details">
                <h2>Dr. John Smith</h2>

                <p>
                    <strong>Speciality:</strong> Dentist
                </p>

                <p>
                    <strong>Provide Feedback:</strong>
                </p>

                <GiveReviews doctorName="Dr. John Smith" />
            </div>
        </div>
    );
};

export default ReviewForm;