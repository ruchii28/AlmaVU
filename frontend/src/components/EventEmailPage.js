import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EventEmailPage.css';

const EventEmailPage = () => {
    const location = useLocation();
    const { results, showEmailOption } = location.state || { results: [], showEmailOption: false };
    const [emailContent, setEmailContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSendEmails = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const selectedAlumni = results.map(alumni => alumni._id);

        try {
            const response = await fetch('http://localhost:3000/alumni/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedAlumni, emailContent })
            });

            if (response.ok) {
                setSuccess('Emails sent successfully');
                setEmailContent('');
                navigate('/filter');
            } else {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            setError('Failed to send emails: ' + error.message);
        }
    };

    return (
        <div className="event-email-container">
            <div className="event-email-box">
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
                {showEmailOption && (
                    <>
                        <h2>Send Event Information</h2>
                        <form onSubmit={handleSendEmails}>
                            <div className="form-group">
                                <label htmlFor="emailContent">Email Content:</label>
                                <textarea
                                    id="emailContent"
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    rows="6"
                                    placeholder="Write your email content here..."
                                ></textarea>
                            </div>
                            <button type="submit" className="send-button">Send Email</button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default EventEmailPage;