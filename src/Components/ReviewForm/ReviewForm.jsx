import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({
    doctorName = "Dr. John Smith",
    speciality = "Dentist"
}) => {
    const [showForm, setShowForm] = useState(false);
    const [patientName, setPatientName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Review submission logic will be expanded in the next exercise.
        setShowForm(false);
    };

    return (
        <div className="review-card">
            <div className="review-doctor-details">
                <h2>{doctorName}</h2>
                <p>
                    <strong>Speciality:</strong> {speciality}
                </p>

                {!showForm && (
                    <button
                        className="review-btn"
                        onClick={() => setShowForm(true)}
                    >
                        Give Review
                    </button>
                )}
            </div>

            {showForm && (
                <form
                    className="review-form"
                    onSubmit={handleSubmit}
                >
                    <h3>Provide Feedback</h3>

                    <div className="form-group">
                        <label htmlFor="patient-name">
                            Patient Name
                        </label>

                        <input
                            type="text"
                            id="patient-name"
                            value={patientName}
                            onChange={(e) =>
                                setPatientName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">
                            Rating
                        </label>

                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select rating
                            </option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="feedback">
                            Feedback
                        </label>

                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) =>
                                setFeedback(e.target.value)
                            }
                            rows="4"
                            required
                        />
                    </div>

                    <div className="review-form-buttons">
                        <button
                            type="submit"
                            className="submit-review-btn"
                        >
                            Submit Review
                        </button>

                        <button
                            type="button"
                            className="cancel-review-btn"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;