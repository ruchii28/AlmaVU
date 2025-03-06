import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SendEventInfoEmailPage.css';

const SendEventInfoEmailPage = () => {
    const [filters, setFilters] = useState({
        registrationNumber: '',
        batchFrom: '',
        batchTo: '',
        department: '',
        sortBy: '',
        order: 'asc'
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from(new Array(currentYear - 1999), (val, index) => 2000 + index);

    const departments = [
        'AIML',
        'Chemical',
        'Civil',
        'Computer Science',
        'ECE',
        'EEE',
        'Mechanical'
    ];

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/alumni/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Error response text:', text);
                throw new Error(text || 'Failed to fetch data');
            }

            const data = await response.json();
            navigate('/email-content', { state: { filteredAlumni: data } });
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        }
    };

    return (
        <div className="send-event-info-email-container">
            <div className="send-event-info-email-box">
                <h2>Send Event Information via Email</h2>
                <form onSubmit={handleFilterSubmit}>
                    <div className="form-group">
                        <label htmlFor="registrationNumber">Registration Number:</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            name="registrationNumber"
                            value={filters.registrationNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="batchFrom">Graduation Year (From):</label>
                        <select
                            id="batchFrom"
                            name="batchFrom"
                            value={filters.batchFrom}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {graduationYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="batchTo">Graduation Year (To):</label>
                        <select
                            id="batchTo"
                            name="batchTo"
                            value={filters.batchTo}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {graduationYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select
                            id="department"
                            name="department"
                            value={filters.department}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {departments.map(department => (
                                <option key={department} value={department}>{department}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sortBy">Sort By:</label>
                        <select
                            id="sortBy"
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="registrationNumber">Registration Number</option>
                            <option value="batch">Batch</option>
                            <option value="department">Department</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="order">Order:</label>
                        <select
                            id="order"
                            name="order"
                            value={filters.order}
                            onChange={handleChange}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <button type="submit" className="filter-button">Filter</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default SendEventInfoEmailPage;