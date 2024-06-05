import React, { useEffect, useState } from 'react';
import { getTopRecommendedMovies } from '../api';

const RecommendedMovies = ({ userId }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getTopRecommendedMovies(userId);
            setMovies(moviesData);
        };

        fetchMovies();
    }, [userId]);

    return (
        <div>
            <h2>Top 10 Recommended Movies</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.movieId}>
                        {movie.movieTitle} (Predicted Rating: {movie.predictedRating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendedMovies;
