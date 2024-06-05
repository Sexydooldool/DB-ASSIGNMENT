import React from 'react';
import MovieCard from './MovieCard';


const MovieSlider = ({ movies }) => {
	return (
		<div className="flex flex-nowrap gap-1 md:gap-2 overflow-x-scroll">
			{movies.map((movie) => (
				<MovieCard key={movie.movieId} movie={movie} />
			))}
		</div>
	);
};

export default MovieSlider;