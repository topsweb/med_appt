import React from "react";
import "./ReportsLayout.css";

const reports = [
    {
        id: 1,
        name: "Annual Physical Report",
        doctor: "Dr. Sarah Johnson",
        date: "2026-08-15",
        type: "General Health"
    },
    {
        id: 2,
        name: "Dental Examination",
        doctor: "Dr. John Smith",
        date: "2026-07-22",
        type: "Dental"
    },
    {
        id: 3,
        name: "Blood Test Results",
        doctor: "Dr. Sarah Johnson",
        date: "2026-06-10",
        type: "Laboratory"
    }
];

const ReportsLayout = () => {
    return (
        <div className="reports-page">
            <div className="reports-container">
                <h1>Your Medical Reports</h1>

                <p className="reports-intro">
                    View and access your available medical reports.
                </p>

                <div className="reports-table-wrapper">
                    <table className="reports-table">
                        <thead>
                            <tr>
                                <th>Report</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.name}</td>
                                    <td>{report.doctor}</td>
                                    <td>{report.date}</td>
                                    <td>{report.type}</td>
                                    <td>
                                        <button className="report-view-btn">
                                            View Report
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsLayout;