import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventEmailPage.css';

const EventEmailPage = () => {
    const [filters, setFilters] = useState({
        registrationNumber: '',
        batch: '',
        department: '',
        birthday: '',
        sortField: 'fullName',
        sortOrder: 'asc'
    });
    const [emailContent, setEmailContent] = useState('');
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const handleFilterAndSendEmails = async (event) => {
        event.preventDefault();
        setError('');
        setResults([]);

        try {
            // First, filter the data
            const filterResponse = await fetch('http://localhost:3000/alumni/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            });

            if (!filterResponse.ok) {
                const data = await filterResponse.json();
                throw new Error(data.message || 'Failed to fetch data');
            }

            const filteredData = await filterResponse.json();
            setResults(filteredData);

            // Navigate to the results page to display filtered data and email content
            navigate('/email-preview', { state: { results: filteredData, emailContent } });
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleEmailContentChange = (event) => {
        setEmailContent(event.target.value);
    };

    const handleReset = () => {
        setFilters({
            registrationNumber: '',
            batch: '',
            department: '',
            birthday: '',
            sortField: 'fullName',
            sortOrder: 'asc'
        });
        setEmailContent('');
        setError('');
    };

    return (
        <div className="send-event-container">
            <div className="send-event-box">
                <h2>Send Event Information</h2>
                <form onSubmit={handleFilterAndSendEmails}>
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
                        <label htmlFor="batch">Batch:</label>
                        <input
                            type="text"
                            id="batch"
                            name="batch"
                            value={filters.batch}
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
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday:</label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={filters.birthday}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sortField">Sort By:</label>
                        <select
                            id="sortField"
                            name="sortField"
                            value={filters.sortField}
                            onChange={handleChange}
                        >
                            <option value="fullName">Full Name</option>
                            <option value="registrationNumber">Registration Number</option>
                            <option value="batch">Batch</option>
                            <option value="department">Department</option>
                            <option value="birthday">Birthday</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sortOrder">Order:</label>
                        <select
                            id="sortOrder"
                            name="sortOrder"
                            value={filters.sortOrder}
                            onChange={handleChange}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailContent">Email Content:</label>
                        <textarea
                            id="emailContent"
                            value={emailContent}
                            onChange={handleEmailContentChange}
                            rows="6"
                            placeholder="Write your email content here..."
                        ></textarea>
                    </div>
                    <button type="submit" className="send-button">Send Email</button>
                    <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default EventEmailPage;