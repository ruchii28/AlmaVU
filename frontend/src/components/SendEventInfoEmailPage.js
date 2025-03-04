import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SendEventInfoEmailPage.css';

const SendEventInfoEmailPage = () => {
    const [filters, setFilters] = useState({
        registrationNumber: '',
        graduationYearFrom: '',
        graduationYearTo: '',
        department: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

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
                        <label htmlFor="graduationYearFrom">Graduation Year (From):</label>
                        <input
                            type="text"
                            id="graduationYearFrom"
                            name="graduationYearFrom"
                            value={filters.graduationYearFrom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="graduationYearTo">Graduation Year (To):</label>
                        <input
                            type="text"
                            id="graduationYearTo"
                            name="graduationYearTo"
                            value={filters.graduationYearTo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={filters.department}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="filter-button">Filter</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default SendEventInfoEmailPage;