import React from 'react';
import { Link } from 'react-router-dom';


const MovieCardDetailed = ({ movie }) => {
	const baseurl = "https://image.tmdb.org/t/p/w500";

	return (
		<Link to={"/movie/" + movie.movieId} className="overflow-hidden flex flex-row w-full *:transition-all *:ease-in-out group shadow bg-slate-800 rounded-xl">
			<img src={baseurl + movie.poster_path} alt={movie.movieTitle} className="h-[150px] w-[100px] group-hover:scale-[102%]" />

			<div className='relative w-full h-full'>
				<div className='
					absolute w-full h-full flex flex-col p-4 *:py-2 
					text-slate-400 font-bold 
					divide-y-[1px] divide-slate-600 divide-opacity-50
					transition-all ease-in-out 
					backdrop-blur-3xl group-hover:backdrop-blur-xl backdrop-brightness-50 group-hover:backdrop-brightness-75'>
					<h1 className="text-xl first:pt-0 text-slate-100">{movie.movieTitle}</h1>

					<div className='flex gap-3 text-sm font-semibold'>
						<span>Release Date</span>
						<span className='text-slate-100'>
							{new Date(movie.releaseDate).toLocaleDateString()}
						</span>
					</div>
					{movie.ratingScore &&
						<div className='flex gap-3 text-sm font-semibold'>
							<span>Rated</span>
							<span className='text-slate-100'>
								{new Date(movie.timestamp).toLocaleDateString()}
							</span>
							<span className='text-slate-100'>
								{movie.ratingScore}
							</span>
						</div>
					}
				</div>

				<img src={baseurl + movie.backdrop_path} alt={movie.movieTitle} className="max-h-[150px] w-full object-cover" />
			</div>
		</Link>
	);
};

export default MovieCardDetailed;