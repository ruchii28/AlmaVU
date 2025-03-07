import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage';
import FilterPage from './components/FilterPage';
import SelectionPage from './components/SelectionPage';
import FilteredResultsPage from './components/FilteredResultsPage';
import SendEventInfoEmailPage from './components/SendEventInfoEmailPage';
import EmailContentPage from './components/EmailContentPage';


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/filter" element={<FilterPage />} />
                    <Route path="/selection" element={<SelectionPage />} />
                    <Route path="/filtered-results" element={<FilteredResultsPage />} />
                    <Route path="/send-event-info-email" element={<SendEventInfoEmailPage />} />
                    <Route path="/email-content" element={<EmailContentPage />} />

                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;


