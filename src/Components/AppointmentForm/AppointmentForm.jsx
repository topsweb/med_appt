import React, { useState } from "react";

const AppointmentForm = ({ doctorName, onClose }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !date || !time) {
            setMessage("Please complete all appointment fields.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            setMessage("Phone number must contain exactly 10 digits.");
            return;
        }

        setMessage(
            `Appointment booked with ${doctorName} on ${date} at ${time}.`
        );
    };

    return (
        <div className="appointment-form">
            <h3>Book Appointment</h3>

            <p>
                Doctor: <strong>{doctorName}</strong>
            </p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="appointment-name">Name</label>
                    <input
                        type="text"
                        id="appointment-name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter patient name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appointment-phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="appointment-phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter 10 digit phone number"
                        maxLength="10"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appointment-date">
                        Appointment Date
                    </label>
                    <input
                        type="date"
                        id="appointment-date"
                        name="date"
                        value={date}
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appointment-time">
                        Appointment Time
                    </label>
                    <input
                        type="time"
                        id="appointment-time"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div className="appointment-buttons">
                    <button type="submit" className="btn btn-primary">
                        Book Time Slot
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>

                {message && (
                    <p className="appointment-message">{message}</p>
                )}

            </form>
        </div>
    );
};

export default AppointmentForm;