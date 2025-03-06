import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterComponent = () => {
    const navigate = useNavigate();
    const [batchStart, setBatchStart] = useState('');
    const [batchEnd, setBatchEnd] = useState('');
    const [department, setDepartment] = useState('');

    const fetchFilteredData = (batchStart, batchEnd, department) => {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const filteredResults = [
                    { fullName: 'John Doe', registrationNumber: '12345', batch: '2018', department: 'Computer Science', email: 'john.doe@example.com', contact: '555-1234', birthday: '1998-04-12' },
                    { fullName: 'Jane Smith', registrationNumber: '67890', batch: '2019', department: 'Computer Science', email: 'jane.smith@example.com', contact: '555-5678', birthday: '1999-06-24' }
                ];
                resolve(filteredResults);
            }, 1000); // Simulate network delay
        });
    };

    const handleFilter = async () => {
        try {
            const data = await fetchFilteredData(batchStart, batchEnd, department);

            let filterDetails = '';
            if (batchStart && batchEnd) {
                filterDetails += `${batchStart} to ${batchEnd} `;
            } else if (batchStart) {
                filterDetails += `From ${batchStart} `;
            } else if (batchEnd) {
                filterDetails += `Up to ${batchEnd} `;
            }

            if (department) {
                filterDetails += `${department} Alumni`;
            } else {
                filterDetails = filterDetails.trim() || 'All Data';
            }

            navigate('/filtered-results', {
                state: {
                    results: data,
                    filterDetails: filterDetails
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <label>
                Batch Start:
                <input type="text" value={batchStart} onChange={(e) => setBatchStart(e.target.value)} />
            </label>
            <br />
            <label>
                Batch End:
                <input type="text" value={batchEnd} onChange={(e) => setBatchEnd(e.target.value)} />
            </label>
            <br />
            <label>
                Department:
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </label>
            <br />
            <button onClick={handleFilter}>Filter Results</button>
        </div>
    );
};

export default FilterComponent;