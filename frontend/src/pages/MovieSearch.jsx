import React, { useEffect, useState } from 'react';

import MovieList from '../components/MovieList';


const MovieSearch = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sort, setSort] = useState(true);
	const [sortType, setSortType] = useState('');

	const fetchMovies = async (query) => {
		try {
			const response = await fetch(`http://localhost:8001/v1/search?query=${query}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			setMovies(data);
			return data;
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = async (event) => {
		event.preventDefault();
		fetchMovies(searchTerm);
	};

	useEffect(() => {
		fetchMovies('');
	}, []);

	useEffect(() => {
		if (sortType === 'title') {
			setMovies(movies => [...movies].sort((a, b) => a.movieTitle.localeCompare(b.movieTitle)));
		} else if (sortType === 'release date') {
			setMovies(movies => [...movies].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)));
		}
		else {
			setMovies(movies => [...movies].sort((a, b) => a.movieId - b.movieId));
		}

		if (!sort) { setMovies(movies => [...movies].reverse()); }
	}, [sortType, sort]);

	return (
		<div className="max-w-screen-lg mx-auto w-full grid grid-cols-1 gap-24 pt-40">
			<div className='grid grid-cols-1 gap-4 mx-auto w-full md:w-2/3 p-4 bg-slate-700 rounded-none md:rounded-xl'>
				<form className='flex gap-[1px] *:py-2'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder='Search for movies'
						className={`bg-slate-800 text-slate-50 rounded-s-full transition-all px-4 grow`}
					/>
					<button
						onClick={handleSearchSubmit}
						className={`bg-slate-800 text-slate-50 pl-2 pr-4 rounded-e-full hover:text-slate-400 transition-all`}
					>
						Search
					</button>
				</form>

				<div className='flex'>
					<div className="flex gap-[1px] items-center bg-slate-600 rounded-lg pl-4">
						<label htmlFor="sort" className="mr-2">Sort by:</label>
						<button
							onClick={() => { sort ? setSort(false) : setSort(true) }}
							className='bg-slate-800 rounded-s-lg py-1 px-2 hover:text-slate-400 transition-all'
						>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
								className={`w-6 h-6 ${sort ? "rotate-180" : "rotate-0"} transition-all`}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						<select
							id="sort"
							className="rounded-e-lg bg-slate-800 px-2 py-1 h-8"
							onChange={(e) => { setSortType(e.target.value) }}
						>
							<option value="">Select</option>
							<option value="title">Title</option>
							<option value="release date">Release</option>
						</select>
					</div>
				</div>
			</div>

			<div className='w-full grid grid-cols-1 gap-4'>
				<h2 className="text-xl font-bold px-4 lg:p-0">Search Results</h2>

				<div className='bg-slate-800 p-4 rounded-lg'>
					{movies.length === 0 ?
						<h1 className='h-32 text-xl font-bold italic text-red-400 animate-pulse'>No movies found</h1> :
						<MovieList movies={movies} />
					}
				</div>
			</div>
		</div>
	);
};

export default MovieSearch;