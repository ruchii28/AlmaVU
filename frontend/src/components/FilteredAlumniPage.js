import React from 'react';
import { useLocation } from 'react-router-dom';
import './FilteredAlumniPage.css';

const FilteredAlumniPage = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };

    return (
        <div className="filtered-alumni-container">
            <div className="filtered-alumni-box">
                <h2>Filtered Alumni Data</h2>
                {results.length > 0 ? (
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Registration Number</th>
                                <th>Batch</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Birthday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((alumni, index) => (
                                <tr key={index}>
                                    <td>{alumni.fullName}</td>
                                    <td>{alumni.registrationNumber}</td>
                                    <td>{alumni.batch}</td>
                                    <td>{alumni.department}</td>
                                    <td>{alumni.email}</td>
                                    <td>{alumni.contact}</td>
                                    <td>{new Date(alumni.birthday).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No alumni data available.</p>
                )}
            </div>
        </div>
    );
};

export default FilteredAlumniPage;