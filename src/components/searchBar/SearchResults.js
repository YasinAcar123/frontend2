// SearchResults.js
import React from 'react';
import styles from './searchresults.module.css';

function SearchResults({ results }) {
    if (!results.length) {
        return <div className={styles.noResults}>No cars available for the selected dates.</div>;
    }

    return (
        <div className={styles.resultsContainer}>
            {results.map((car) => (
                <div key={car.car_id} className={styles.resultItem}>
                    <h3>{car.brand} {car.model}</h3>
                    <p>Year: {car.year}</p>
                    <p>Daily Price: CHF{car.daily_price}</p>
                    <p>Availability: {car.availability ? 'Available' : 'Not Available'}</p>
                    <button className={styles.bookButton}>Book Now</button>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
