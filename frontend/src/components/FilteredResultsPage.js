import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FilteredResultsPage.css';

const ITEMS_PER_PAGE = 10;

const FilteredResultsPage = () => {
    const location = useLocation();
    const { results, filterDetails } = location.state || { results: [], filterDetails: "All Data" };
    const [visibleResultsCount, setVisibleResultsCount] = useState(ITEMS_PER_PAGE);

    const handlePrint = () => {
        window.print();
    };

    const handleReadMore = () => {
        setVisibleResultsCount(prevCount => prevCount + ITEMS_PER_PAGE);
    };

    const handleReadLess = () => {
        setVisibleResultsCount(prevCount => Math.max(prevCount - ITEMS_PER_PAGE, ITEMS_PER_PAGE));
    };

    return (
        <div className="results-container">
            <div className="results-box">
                <h2>Filtered Alumni Data</h2>
                <p className="filter-details">{filterDetails}</p>
                {results.length > 0 ? (
                    <>
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
                                {results.slice(0, visibleResultsCount).map((alumni, index) => (
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
                        <div className="pagination-buttons">
                            {visibleResultsCount < results.length && (
                                <button className="read-more-button" onClick={handleReadMore}>Read More</button>
                            )}
                            {visibleResultsCount > ITEMS_PER_PAGE && (
                                <button className="read-less-button" onClick={handleReadLess}>Read Less</button>
                            )}
                        </div>
                        <button className="print-button" onClick={handlePrint}>Print</button>
                    </>
                ) : (
                    <p>No alumni data available.</p>
                )}
            </div>
        </div>
    );
};

export default FilteredResultsPage;