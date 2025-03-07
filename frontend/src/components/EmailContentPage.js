import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EmailContentPage.css';

const ITEMS_PER_PAGE = 10;

const EmailContentPage = () => {
    const location = useLocation();
    const { filteredAlumni } = location.state || { filteredAlumni: [] };
    const [emailContent, setEmailContent] = useState('');
    const [status, setStatus] = useState('');
    const [visibleAlumniCount, setVisibleAlumniCount] = useState(ITEMS_PER_PAGE);

    const handleSendEmails = async () => {
        try {
            const response = await fetch('http://localhost:3000/alumni/email-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedAlumni: filteredAlumni.map(alum => alum._id), emailContent })
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Error response text:', text);
                throw new Error(text || 'Failed to send emails');
            }

            setStatus('Emails sent successfully!');
        } catch (error) {
            console.error('Failed to send emails:', error);
            setStatus(`Failed to send emails: ${error.message}`);
        }
    };

    const handleReadMore = () => {
        setVisibleAlumniCount(prevCount => prevCount + ITEMS_PER_PAGE);
    };

    const handleReadLess = () => {
        setVisibleAlumniCount(prevCount => Math.max(prevCount - ITEMS_PER_PAGE, ITEMS_PER_PAGE));
    };

    return (
        <div className="email-content-container">
            <div className="email-content-box">
                <h2>Send Event Information via Email</h2>
                <div className="alumni-details">
                    <h3>Filtered Alumni:</h3>
                    <table className="alumni-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Registration Number</th>
                                <th>Batch</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlumni.slice(0, visibleAlumniCount).map(alumni => (
                                <tr key={alumni._id}>
                                    <td>{alumni.fullName}</td>
                                    <td>{alumni.email}</td>
                                    <td>{alumni.registrationNumber}</td>
                                    <td>{alumni.batch}</td>
                                    <td>{alumni.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-buttons">
                        {visibleAlumniCount < filteredAlumni.length && (
                            <button onClick={handleReadMore} className="read-more-button">Read More</button>
                        )}
                        {visibleAlumniCount > ITEMS_PER_PAGE && (
                            <button onClick={handleReadLess} className="read-less-button">Read Less</button>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailContent">Email Content:</label>
                    <textarea
                        id="emailContent"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        rows="10"
                    />
                </div>
                <button onClick={handleSendEmails} className="send-button">Send Emails</button>
                {status && <p className="status-message">{status}</p>}
            </div>
        </div>
    );
};

export default EmailContentPage;