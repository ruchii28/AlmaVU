import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterPage.css';

const FilterPage = () => {
    const [filters, setFilters] = useState({
        registrationNumber: '',
        batchFrom: '',
        batchTo: '',
        department: '',
        birthday: '',
        sortField: '',
        sortOrder: 'asc'
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from(new Array(currentYear - 1999), (val, index) => 2000 + index);

    const departments = [
        'AIML',
        'Chemical',
        'Civil',
        'Computer Science',
        'ECE',
        'EEE',
        'Mechanical'
    ];

    const handleFilter = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/alumni/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Error response text:', text);
                throw new Error(text || 'Failed to fetch data');
            }

            const data = await response.json();
            const filterDetails = getFilterDetails(filters);
            navigate('/filtered-results', { state: { results: data, filterDetails } });
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        }
    };

    const getFilterDetails = (filters) => {
        const filterDescriptions = [];

        if (filters.registrationNumber) filterDescriptions.push(`Registration Number: ${filters.registrationNumber}`);
        if (filters.batchFrom) filterDescriptions.push(`Batch From: ${filters.batchFrom}`);
        if (filters.batchTo) filterDescriptions.push(`Batch To: ${filters.batchTo}`);
        if (filters.department) filterDescriptions.push(`Department: ${filters.department}`);
        if (filters.birthday) filterDescriptions.push(`Birthday: ${new Date(filters.birthday).toLocaleDateString()}`);
        if (filters.sortField) filterDescriptions.push(`Sort By: ${filters.sortField} (${filters.sortOrder})`);

        return filterDescriptions.length > 0 ? filterDescriptions.join(', ') : 'All Data';
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleReset = () => {
        setFilters({
            registrationNumber: '',
            batchFrom: '',
            batchTo: '',
            department: '',
            birthday: '',
            sortField: '',
            sortOrder: 'asc'
        });
    };

    return (
        <div className="filter-container">
            <div className="filter-box">
                <h2>Filter Alumni Data</h2>
                <form onSubmit={handleFilter}>
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
                        <label htmlFor="batchFrom">Graduation Year (From):</label>
                        <select
                            id="batchFrom"
                            name="batchFrom"
                            value={filters.batchFrom}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {graduationYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="batchTo">Graduation Year (To):</label>
                        <select
                            id="batchTo"
                            name="batchTo"
                            value={filters.batchTo}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {graduationYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select
                            id="department"
                            name="department"
                            value={filters.department}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {departments.map(department => (
                                <option key={department} value={department}>{department}</option>
                            ))}
                        </select>
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
                            <option value="">Select</option>
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
                    <button type="submit" className="filter-button">Filter Data</button>
                    <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default FilterPage;