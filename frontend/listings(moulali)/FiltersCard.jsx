import React from 'react';

const Filters = ({ filters, setFilters }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="filters-container">
            <h3>Filters</h3>

            <div className="filter-group">
                <label>Subject</label>
                <select name="subject" value={filters.subject} onChange={handleChange}>
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Min Rating</label>
                <select name="rating" value={filters.rating} onChange={handleChange}>
                    <option value="0">Any Rating</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                    <option value="5.0">5.0</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Max Price</label>
                <input
                    type="range"
                    name="maxPrice"
                    min="20"
                    max="100"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />
                <span>${filters.maxPrice}</span>
            </div>
        </div>
    );
};

export default Filters;
