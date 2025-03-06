// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './EmailContentPage.css';

// const EmailContentPage = () => {
//     const location = useLocation();
//     const { filteredAlumni } = location.state || [];
//     const [emailContent, setEmailContent] = useState('');
//     const [status, setStatus] = useState('');

//     const handleSendEmails = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/alumni/send-email', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ selectedAlumni: filteredAlumni.map(alum => alum._id), emailContent })
//             });

//             if (!response.ok) {
//                 const text = await response.text();
//                 console.error('Error response text:', text);
//                 throw new Error(text || 'Failed to send emails');
//             }

//             setStatus('Emails sent successfully!');
//         } catch (error) {
//             setStatus('Failed to send emails.');
//         }
//     };

//     return (
//         <div className="email-content-container">
//             <div className="email-content-box">
//                 <h2>Send Event Information via Email</h2>
//                 <div className="alumni-details">
//                     <h3>Filtered Alumni:</h3>
//                     <ul>
//                         {filteredAlumni.map(alumni => (
//                             <li key={alumni._id}>{alumni.name} - {alumni.email}</li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="emailContent">Email Content:</label>
//                     <textarea
//                         id="emailContent"
//                         value={emailContent}
//                         onChange={(e) => setEmailContent(e.target.value)}
//                     />
//                 </div>
//                 <button onClick={handleSendEmails} className="send-button">Send Emails</button>
//                 {status && <p className="status-message">{status}</p>}
//             </div>
//         </div>
//     );
// };

// export default EmailContentPage;


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EmailContentPage.css';

const EmailContentPage = () => {
    const location = useLocation();
    const { filteredAlumni } = location.state || [];
    const [emailContent, setEmailContent] = useState('');
    const [status, setStatus] = useState('');

    const handleSendEmails = async () => {
        try {
            const response = await fetch('http://localhost:3000/alumni/email-content', { // Corrected URL
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

    return (
        <div className="email-content-container">
            <div className="email-content-box">
                <h2>Send Event Information via Email</h2>
                <div className="alumni-details">
                    <h3>Filtered Alumni:</h3>
                    <ul>
                        {filteredAlumni.map(alumni => (
                            <li key={alumni._id}>{alumni.name} - {alumni.email}</li>
                        ))}
                    </ul>
                </div>
                <div className="form-group">
                    <label htmlFor="emailContent">Email Content:</label>
                    <textarea
                        id="emailContent"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                    />
                </div>
                <button onClick={handleSendEmails} className="send-button">Send Emails</button>
                {status && <p className="status-message">{status}</p>}
            </div>
        </div>
    );
};

export default EmailContentPage;