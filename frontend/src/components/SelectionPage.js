import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionPage.css';

const SelectionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="selection-container">
            <div className="selection-box">
                <h2>Select an Option</h2>
                <button className="selection-button" onClick={() => navigate('/filter')}>Filter Alumni Data</button>
                <button className="selection-button" onClick={() => navigate('/send-event-info-email')}>Send Event Information via Email</button>
            </div>
        </div>
    );
};

export default SelectionPage;