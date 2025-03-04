import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventInfoPage.css';

const EventInfoPage = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [batch, setBatch] = useState('');
    const [department, setDepartment] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sortField, setSortField] = useState('fullName');
    const [sortOrder, setSortOrder] = useState(1);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleFilter = async (event) => {
        event.preventDefault();
        try {
            setError(''); // Clear any previous errors
            const response = await fetch('http://localhost:3000/alumni/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registrationNumber, batch, department, birthday, sortField, sortOrder })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.length === 0) {
                setError('No results found.');
            } else {
                navigate('/event-email', { state: { results: data, showEmailOption: true } });
                handleReset();
            }
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        }
    };

    const handleReset = () => {
        setRegistrationNumber('');
        setBatch('');
        setDepartment('');
        setBirthday('');
        setSortField('fullName');
        setSortOrder(1);
        setError('');
    };

    return (
        <div className="event-info-container">
            <div className="event-info-box">
                <h2>Send Event Information</h2>
                <form onSubmit={handleFilter}>
                    {/* Form fields */}
                    <div className="form-group">
                        <label htmlFor="registrationNumber">Registration Number:</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            placeholder="Enter Registration Number"
                            value={registrationNumber}
                            onChange={e => setRegistrationNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="batch">Batch:</label>
                        <select
                            id="batch"
                            value={batch}
                            onChange={e => setBatch(e.target.value)}
                        >
                            <option value="">Select Batch Year</option>
                            {Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => 1990 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select
                            id="department"
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Chemical Engineering">Chemical Engineering</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday:</label>
                        <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sortField">Sort By:</label>
                        <select id="sortField" value={sortField} onChange={e => setSortField(e.target.value)}>
                            <option value="fullName">Name</option>
                            <option value="batch">Batch</option>
                            <option value="department">Department</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sortOrder">Sort Order:</label>
                        <select id="sortOrder" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))}>
                            <option value={1}>Ascending</option>
                            <option value={-1}>Descending</option>
                        </select>
                    </div>
                    <button type="submit" className="filter-button">Filter</button>
                    <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default EventInfoPage;