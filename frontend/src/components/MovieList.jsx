import React from 'react';
import MovieCardDetailed from './MovieCardDetailed';


const MovieList = ({ movies }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
			{movies.map((movie) => (
				<MovieCardDetailed key={movie.movieId} movie={movie} />
			))}
		</div>
	);
};

export default MovieList;