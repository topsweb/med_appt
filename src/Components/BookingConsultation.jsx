import React, { useState } from "react";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";

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

const BookingConsultation = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDoctors = searchTerm
        ? doctors.filter((doctor) =>
              doctor.speciality
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
          )
        : doctors;

    return (
        <div className="booking-consultation">

            <FindDoctorSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="doctor-cards-container">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <DoctorCard
                            key={doctor.name}
                            name={doctor.name}
                            speciality={doctor.speciality}
                            experience={doctor.experience}
                            ratings={doctor.ratings}
                        />
                    ))
                ) : (
                    <p>No doctors found for this specialty.</p>
                )}
            </div>

        </div>
    );
};

export default BookingConsultation;
