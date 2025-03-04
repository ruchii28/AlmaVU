import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterPage.css';

const FilterPage = () => {
    const [filters, setFilters] = useState({
        registrationNumber: '',
        batch: '',
        department: '',
        birthday: '',
        sortField: 'fullName',
        sortOrder: 'asc'
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

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
                const data = await response.json();
                throw new Error(data.message || 'Failed to fetch data');
            }

            const data = await response.json();
            navigate('/filtered-results', { state: { results: data } });
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
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
                    <button type="submit" className="filter-button">Filter Data</button>
                    <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default FilterPage;