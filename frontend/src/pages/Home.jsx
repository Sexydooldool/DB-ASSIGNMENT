import React from 'react';
import { useEffect, useState } from 'react';

import MovieGrid from '../components/MovieGrid';
import MovieSlider from '../components/MovieSlider';


const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await fetch('http://localhost:8001/v1/movie');
				const data = await response.json();
				setMovies(data);
			} catch (error) {
				console.error('Error fetching movies:', error);
			}
		}

		fetchMovies();
	}, []);

	return (
		<div className="max-w-screen-lg mx-auto w-full grid grid-cols-1 gap-10 pt-32 px-4 lg:px-0">
			<div className='grid grid-cols-1 gap-4'>
				<h1 className="text-2xl font-bold">Welcom to the Homepage</h1>
			</div>

			<div className='grid grid-cols-1 gap-4'>
				<h2 className="text-xl font-bold">Movies in Slider format</h2>
				<MovieSlider movies={movies} />
			</div>

			<div className='grid grid-cols-1 gap-4'>
				<h2 className="text-xl font-bold">Movies in Grid format</h2>
				<MovieGrid movies={movies} />
			</div>
		</div>
	);
};

export default Home;