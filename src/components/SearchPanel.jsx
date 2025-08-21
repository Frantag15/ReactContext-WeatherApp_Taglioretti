import React, { useState } from 'react';
import { fetchCoordsByCity } from '../services/weatherService';
import './../styles/SearchPanel.css';

const SearchPanel = ({ onClose, onCitySelect }) => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!term.trim()) return;

        setError(null);
        setResults([]);

        try {
            const data = await fetchCoordsByCity(term);
            if (data.length === 0) {
                setError(`No results found for "${term}".`);
            } else {
                setResults(data);
            }
        } catch (err) {
            setError('Failed to fetch locations. Please try again.');
            console.error(err);
        }
    };

    const handleSelect = (city) => {
        onCitySelect(city.lat, city.lon);
    };

    return (
        <div className="search-panel">
            <div className="search-panel__header">
                <button className="search-panel__close" onClick={onClose} aria-label="Close search panel">
                    <span className="material-icons">close</span>
                </button>
            </div>
            <form className="search-panel__form" onSubmit={handleSearch}>
                <div className="search-panel__input-container">
                    <label htmlFor="location-search" className="visually-hidden">Search Location</label>
                    <span className="material-icons">search</span>
                    <input
                        id="location-search"
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="search location"
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            <div className="search-panel__results">
                {error && <p className="error-message">{error}</p>}
                <ul>
                    {results.map((city) => (
                        <li key={`${city.lat}-${city.lon}`}>
                            <button onClick={() => handleSelect(city)}>
                                <span>{city.name}{city.state ? `, ${city.state}` : ''}, {city.country}</span>
                                <span className="material-icons">chevron_right</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchPanel;
