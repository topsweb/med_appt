import React, { useState } from "react";
import "./FindDoctorSearch.css";
import DoctorCard from "../DoctorCard/DoctorCard";

const specialties = [
    "Dentist",
    "Bone",
    "Gynecologist/Obstetrician",
    "General Physician"
];
const doctors = [
    {
        name: "Dr. John Smith",
        speciality: "Dentist",
        experience: "10 years",
        ratings: "4.8"
    },
    {
        name: "Dr. Sarah Johnson",
        speciality: "General Physician",
        experience: "8 years",
        ratings: "4.7"
    },
    {
        name: "Dr. Emily Davis",
        speciality: "Gynecologist/Obstetrician",
        experience: "12 years",
        ratings: "4.9"
    },
    {
        name: "Dr. Robert Brown",
        speciality: "Bone",
        experience: "15 years",
        ratings: "4.6"
    }
];
const FindDoctorSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSpecialties, setShowSpecialties] = useState(false);

    const filteredSpecialties = specialties.filter((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredDoctors = searchTerm
    ? doctors.filter((doctor) =>
          doctor.speciality
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
      )
    : doctors;

    const handleSelect = (specialty) => {
        setSearchTerm(specialty);
        setShowSpecialties(false);
    };

    const handleBlur = () => {
        // Short delay allows a specialty to be clicked
        // before the dropdown disappears.
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
            <div className="doctor-cards-container">
    {filteredDoctors.map((doctor) => (
        <DoctorCard
            key={doctor.name}
            name={doctor.name}
            speciality={doctor.speciality}
            experience={doctor.experience}
            ratings={doctor.ratings}
        />
    ))}
</div>
        </div>
    );
};

export default FindDoctorSearch;