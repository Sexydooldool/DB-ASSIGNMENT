import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Banner from '../components/Banner';
import MovieSlider from '../components/MovieSlider';


const MovieDetails = ({ movieId, user }) => {
	const baseurl = "https://image.tmdb.org/t/p/original";
	const [movie, setMovie] = useState({});

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				var fetchString = `http://localhost:8001/v1/movie/${movieId}`;
				if (user) { fetchString += `?user_id=${user.userId}`; }
				const response = await fetch(fetchString);
				const movie = await response.json();
				setMovie(movie);
			} catch (error) {
				console.error('Error fetching movie:', error);
			}
		};
		console.log('movieId:', movieId);
		fetchMovie();
	}, [movieId, user]);

	const [relatedMovies, setrelatedMovies] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await fetch('http://localhost:8001/v1/movie');
				const data = await response.json();
				setrelatedMovies(data);
			} catch (error) { }
		}

		fetchMovies();
	}, []);

	return (
		<div className="">
			<Banner imgsrc={baseurl + movie.backdrop_path} />

			<div className='max-w-screen-lg w-full mx-auto grid grid-cols-1 gap-10 px-4 lg:px-0'>
				<div className='flex flex-col md:flex-row gap-4 w-full'>
					<img src={baseurl + movie.poster_path} alt={movie.movieTitle} className="h-[300px] w-[200px]" />
					<div className='flex flex-col *:py-3 text-slate-400 font-bold divide-y-[1px] divide-slate-600 divide-opacity-50 grow'>
						<h1 className="text-2xl first:pt-0 text-slate-100 font-bold">{movie.movieTitle}</h1>
						<div className='flex gap-3'>
							<span>Release Date</span>
							<span className='text-slate-100'>
								{new Date(movie.releaseDate).toLocaleDateString()}
							</span>
						</div>
						<div className='flex gap-3'>
							<span>Average Rating</span>
							<span className='text-slate-100'>
								{parseFloat(movie.avgRating).toFixed(1)}
							</span>
						</div>
						{movie.ratingScore &&
							<div className='flex gap-3'>
								<span>Rated</span>
								<span className='text-slate-100'>
									{new Date(movie.timestamp).toLocaleDateString()}
								</span>
								<span className='text-slate-100'>
									{movie.ratingScore}
								</span>
							</div>
						}
						<div className='flex flex-wrap gap-2 text-sm text-slate-200 font-normal *:bg-slate-500 *:bg-opacity-40 *:px-4 *:py-1 *:rounded-full'>
							{movie.genres && [...new Set(movie.genres.map(genre => genre.genre))].map((genre, index) => (
								<Link className='hover:bg-slate-700' to={`/genre/${genre}`} key={index}>{genre}</Link>
							))}
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 gap-4'>
					<h2 className="text-xl font-bold">Related Movies</h2>
					<MovieSlider movies={relatedMovies} />
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;