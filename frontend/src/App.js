// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Login from './components/Login';
// // import FilterPage from './components/FilterPage';
// // import ResultsPage from './components/ResultsPage';

// // const App = () => {
// //     return (
// //         <Router>
// //             <div>
// //                 <Routes>
// //                     <Route path="/login" element={<Login />} />
// //                     <Route path="/filter" element={<FilterPage />} />
// //                     <Route path="/results" element={<ResultsPage />} />
// //                     <Route path="/" element={<Login />} />
// //                 </Routes>
// //             </div>
// //         </Router>
// //     );
// // };

// // export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import FilterPage from './components/FilterPage';
// import ResultsPage from './components/ResultsPage';
// import SelectionPage from './components/SelectionPage';
// import EventInfoPage from './components/EventInfoPage';

// const App = () => {
//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/filter" element={<FilterPage />} />
//                     <Route path="/results" element={<ResultsPage />} />
//                     <Route path="/selection" element={<SelectionPage />} />
//                     <Route path="/event-info" element={<EventInfoPage />} />
//                     <Route path="/" element={<Login />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage';
import FilterPage from './components/FilterPage';
import ResultsPage from './components/ResultsPage';
import SelectionPage from './components/SelectionPage';
import EventInfoPage from './components/EventInfoPage';
import EventEmailPage from './components/EventEmailPage';
import FilteredAlumniPage from './components/FilteredResultsPage';
import EmailPreviewPage from './components/EmailPreviewPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/filter" element={<FilterPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/selection" element={<SelectionPage />} />
                    <Route path="/event-info" element={<EventInfoPage />} />
                    <Route path="/event-email" element={<EventEmailPage />} />
                    <Route path="/filtered-alumni" element={<FilteredAlumniPage />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;