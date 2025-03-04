import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage';
import FilterPage from './components/FilterPage';
// import ResultsPage from './components/ResultsPage';
import SelectionPage from './components/SelectionPage';
// import EventInfoPage from './components/EventInfoPage';
// import EventEmailPage from './components/EventEmailPage';
import FilteredResultsPage from './components/FilteredResultsPage';
// import EmailPreviewPage from './components/EmailPreviewPage';
import SendEventInfoEmailPage from './components/SendEventInfoEmailPage';
import EmailContentPage from './components/EmailContentPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/filter" element={<FilterPage />} />
                    {/* <Route path="/results" element={<ResultsPage />} /> */}
                    <Route path="/selection" element={<SelectionPage />} />
                    {/* <Route path="/event-info" element={<EventInfoPage />} /> */}
                    {/* <Route path="/event-email" element={<EventEmailPage />} /> */}
                    <Route path="/filtered-results" element={<FilteredResultsPage />} />
                    {/* <Route path="/email-preview" element={<EmailPreviewPage />} /> */}
                    <Route path="/send-event-info-email" element={<SendEventInfoEmailPage />} />
                    <Route path="/email-content" element={<EmailContentPage />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;