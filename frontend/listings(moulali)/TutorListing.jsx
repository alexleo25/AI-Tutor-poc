import React, { useState, useMemo } from 'react';
import TutorCard from '../components/TutorCard';
import Filters from '../components/Filters';
import { tutors } from '../data/mockData';
import './TutorListing.css'; // Ensure this file is created for styling

const TutorListing = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        subject: "",
        rating: "0",
        maxPrice: 100
    });

    const filteredTutors = useMemo(() => {
        return tutors.filter(tutor => {
            const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tutor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tutor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesSubject = filters.subject === "" || tutor.subject === filters.subject;
            const matchesRating = tutor.rating >= parseFloat(filters.rating);
            const matchesPrice = tutor.price <= parseInt(filters.maxPrice);

            return matchesSearch && matchesSubject && matchesRating && matchesPrice;
        });
    }, [searchTerm, filters]);

    return (
        <div className="tutor-listing-page">
            <header className="listing-header">
                <h1>Find Your AI Tutor</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name, subject, or keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="listing-content">
                <aside className="filters-sidebar">
                    <Filters filters={filters} setFilters={setFilters} />
                </aside>

                <main className="tutors-grid">
                    {filteredTutors.length > 0 ? (
                        filteredTutors.map(tutor => (
                            <TutorCard key={tutor.id} tutor={tutor} />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No tutors found matching your criteria.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TutorListing;
