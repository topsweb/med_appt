import React, { useState } from "react";
import "./ReviewForm.css";

const GiveReviews = ({ doctorName = "Dr. John Smith" }) => {
    const [showForm, setShowForm] = useState(false);
    const [submittedReview, setSubmittedReview] = useState(null);
    const [showWarning, setShowWarning] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        review: "",
        rating: ""
    });

    const handleButtonClick = () => {
        if (!submittedReview) {
            setShowForm(true);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.review.trim() ||
            !formData.rating
        ) {
            setShowWarning(true);
            return;
        }

        setShowWarning(false);
        setSubmittedReview(formData);
        setShowForm(false);

        setFormData({
            name: "",
            review: "",
            rating: ""
        });
    };

    return (
        <div className="give-review-container">

            <button
                className="review-btn"
                onClick={handleButtonClick}
                disabled={submittedReview !== null}
            >
                {submittedReview ? "Review Submitted" : "Click Here"}
            </button>

            {showForm && !submittedReview && (
                <form
                    className="review-form"
                    onSubmit={handleSubmit}
                >
                    <h3>Give Your Feedback</h3>

                    <p>
                        <strong>Doctor:</strong> {doctorName}
                    </p>

                    {showWarning && (
                        <p className="warning">
                            Please fill out all fields.
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="review">
                            Review
                        </label>

                        <textarea
                            id="review"
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            placeholder="Enter your feedback"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">
                            Rating
                        </label>

                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select Rating
                            </option>
                            <option value="5">
                                ★★★★★ - 5
                            </option>
                            <option value="4">
                                ★★★★☆ - 4
                            </option>
                            <option value="3">
                                ★★★☆☆ - 3
                            </option>
                            <option value="2">
                                ★★☆☆☆ - 2
                            </option>
                            <option value="1">
                                ★☆☆☆☆ - 1
                            </option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="submit-review-btn"
                    >
                        Submit
                    </button>
                </form>
            )}

            {submittedReview && (
                <div className="submitted-review">
                    <h3>Your Review</h3>

                    <p>
                        <strong>Name:</strong>{" "}
                        {submittedReview.name}
                    </p>

                    <p>
                        <strong>Rating:</strong>{" "}
                        {"★".repeat(
                            Number(submittedReview.rating)
                        )}
                    </p>

                    <p>
                        <strong>Feedback:</strong>{" "}
                        {submittedReview.review}
                    </p>
                </div>
            )}

        </div>
    );
};

export default GiveReviews;