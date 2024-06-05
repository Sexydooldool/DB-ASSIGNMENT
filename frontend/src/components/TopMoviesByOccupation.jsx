import React, { useEffect, useState } from 'react';
import { getTopMoviesByOccupation } from '../api';

const TopMoviesByOccupation = ({ userId }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getTopMoviesByOccupation(userId);
            setMovies(moviesData);
        };

        fetchMovies();
    }, [userId]);

    return (
        <div>
            <h2>Top 10 Movies by Occupation</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.movieId}>
                        {movie.movieTitle} (Rating: {movie.average_rating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopMoviesByOccupation;
