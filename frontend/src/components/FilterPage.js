// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './FilterPage.css';

// const FilterPage = () => {
//     const [registrationNumber, setRegistrationNumber] = useState('');
//     const [batch, setBatch] = useState('');
//     const [department, setDepartment] = useState('');
//     const [birthday, setBirthday] = useState('');
//     const [page, setPage] = useState(1);
//     const [sortField, setSortField] = useState('fullName');
//     const [sortOrder, setSortOrder] = useState(1);
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState('');

//     const navigate = useNavigate();

//     const handleFilter = async (event) => {
//         event.preventDefault();
//         try {
//             setError(''); // Clear any previous errors
//             const response = await fetch('http://localhost:3000/alumni/filter', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ registrationNumber, batch, department, birthday, page, sortField, sortOrder })
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             console.log('Data received:', data); // Debugging: Log data
//             if (data.length === 0) {
//                 setError('No results found.');
//             } else {
//                 setResults(data);
//                 navigate('/results', { state: { results: data } });
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setError('Error fetching data: ' + error.message);
//         }
//     };

//     return (
//         <div className="filter-container">
//             <div className="filter-box">
//                 <h2>Filter Alumni Data</h2>
//                 <form onSubmit={handleFilter}>
//                     {/* Form fields */}
//                     <div className="form-group">
//                         <label htmlFor="registrationNumber">Registration Number:</label>
//                         <input
//                             type="text"
//                             id="registrationNumber"
//                             placeholder="Enter Registration Number"
//                             value={registrationNumber}
//                             onChange={e => setRegistrationNumber(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="batch">Batch:</label>
//                         <select
//                             id="batch"
//                             value={batch}
//                             onChange={e => setBatch(e.target.value)}
//                         >
//                             <option value="">Select Batch Year</option>
//                             {Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => 1990 + i).map(year => (
//                                 <option key={year} value={year}>{year}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="department">Department:</label>
//                         <select
//                             id="department"
//                             value={department}
//                             onChange={e => setDepartment(e.target.value)}
//                         >
//                             <option value="">Select Department</option>
//                             <option value="Computer Science">Computer Science</option>
//                             <option value="Electrical Engineering">Electrical Engineering</option>
//                             <option value="Mechanical Engineering">Mechanical Engineering</option>
//                             <option value="Civil Engineering">Civil Engineering</option>
//                             <option value="Chemical Engineering">Chemical Engineering</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="birthday">Birthday:</label>
//                         <input
//                             type="date"
//                             id="birthday"
//                             value={birthday}
//                             onChange={e => setBirthday(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="sortField">Sort By:</label>
//                         <select id="sortField" value={sortField} onChange={e => setSortField(e.target.value)}>
//                             <option value="fullName">Name</option>
//                             <option value="batch">Batch</option>
//                             <option value="department">Department</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="sortOrder">Sort Order:</label>
//                         <select id="sortOrder" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))}>
//                             <option value={1}>Ascending</option>
//                             <option value={-1}>Descending</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="filter-button">Filter</button>
//                 </form>
//                 {error && <p className="error-message">{error}</p>}
//                 <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
//                 <button onClick={() => setPage(page + 1)}>Next</button>
//                 <div className="results">
//                     {results.length > 0 && (
//                         <table className="results-table">
//                             <thead>
//                                 <tr>
//                                     <th>Full Name</th>
//                                     <th>Registration Number</th>
//                                     <th>Batch</th>
//                                     <th>Department</th>
//                                     <th>Email</th>
//                                     <th>Contact</th>
//                                     <th>Birthday</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {results.map((alumni, index) => (
//                                     <tr key={index}>
//                                         <td>{alumni.fullName}</td>
//                                         <td>{alumni.registrationNumber}</td>
//                                         <td>{alumni.batch}</td>
//                                         <td>{alumni.department}</td>
//                                         <td>{alumni.email}</td>
//                                         <td>{alumni.contact}</td>
//                                         <td>{new Date(alumni.birthday).toLocaleDateString()}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FilterPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterPage.css';

const FilterPage = () => {
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
                navigate('/filtered-alumni', { state: { results: data } });
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
        <div className="filter-container">
            <div className="filter-box">
                <h2>Filter Alumni Data</h2>
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

export default FilterPage;

