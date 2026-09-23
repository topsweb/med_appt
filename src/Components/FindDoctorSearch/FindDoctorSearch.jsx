import React, { useState } from "react";
import "./FindDoctorSearch.css";

const specialties = [
    "Dentist",
    "Bone",
    "Gynecologist/Obstetrician",
    "General Physician"
];

const FindDoctorSearch = ({ searchTerm, setSearchTerm }) => {
    const [showSpecialties, setShowSpecialties] = useState(false);

    const filteredSpecialties = specialties.filter((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (specialty) => {
        setSearchTerm(specialty);
        setShowSpecialties(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSpecialties(false);
        }, 150);
    };

    return (
        <div className="doctor-search-container">
            <h1>Find a Doctor</h1>

            <p>Search for a doctor by specialty.</p>

            <div className="doctor-search-box">
                <input
                    type="text"
                    className="doctor-search-input"
                    placeholder="Search by specialty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSpecialties(true)}
                    onBlur={handleBlur}
                />

                {showSpecialties && (
                    <ul className="specialty-list">
                        {filteredSpecialties.length > 0 ? (
                            filteredSpecialties.map((specialty) => (
                                <li
                                    key={specialty}
                                    onClick={() => handleSelect(specialty)}
                                >
                                    {specialty}
                                </li>
                            ))
                        ) : (
                            <li className="no-results">
                                No specialties found
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FindDoctorSearch;