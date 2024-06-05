import React from 'react';
import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
	const baseurl = "https://image.tmdb.org/t/p/w500";

	return (
		<Link to={"/movie/" + movie.movieId} className="relative overflow-hidden text-center flex shrink-0 items-center mb-2 *:transition-all *:ease-in-out group shadow">
			<div className='w-full h-full flex items-center *:transition-all *:ease-in-out'>
				<div className='w-full h-full absolute backdrop-blur-lg opacity-0 group-hover:opacity-100 backdrop-brightness-75 scale-[101%]'></div>
				<div className='flex flex-col absolute w-full'>
					<h2 className="w-full text-xl font-bold opacity-0 group-hover:opacity-100">{movie.movieTitle}</h2>
					{movie.ratingScore &&
						<h2 className="w-full text-2xl font-semibold opacity-0 group-hover:opacity-100">{movie.ratingScore}</h2>
					}
				</div>
			</div>

			<img src={baseurl + movie.poster_path} alt={movie.movieTitle} className="aspect-3/4 max-h-72 md:max-h-96" />
		</Link>
	);
};

export default MovieCard;