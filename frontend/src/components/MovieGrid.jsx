import React from 'react';
import MovieCard from './MovieCard';


const MovieGrid = ({ movies }) => {
	return (
		<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2">
			{movies.map((movie) => (
				<MovieCard key={movie.movieId} movie={movie} />
			))}
		</div>
	);
};

export default MovieGrid;