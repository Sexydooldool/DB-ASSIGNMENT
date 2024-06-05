import React, { useEffect, useState } from 'react';
import TopMoviesByOccupation from '../components/TopMoviesByOccupation';
import TopMoviesByAge from '../components/TopMoviesByAge';
import RecommendedMovies from '../components/RecommendedMovies';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import MovieSlider from '../components/MovieSlider';

const UserDetails = ({ user }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`http://localhost:8001/v1/user/${user.userId}/rated`);
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, [user]);

    return (
        <div className="max-w-screen-lg mx-auto w-full grid grid-cols-1 gap-10 pt-32 px-4 lg:px-0">
            {user === null ? (
                <h1 className="text-2xl font-bold">User not found</h1>
            ) : (
                <>
                    <div className='grid grid-cols-1 gap-4'>
                        <h1 className="text-2xl font-bold">Welcome User {user.userId}!</h1>
                        <p className="text-lg">You have rated {movies.length} movies</p>
                        <ul className="list-disc pl-4">
                            <li>User ID: {user.userId}</li>
                            <li>Occupation: {user.occupation}</li>
                            <li>Age: {user.age}</li>
                            <li>Gender: {user.gender}</li>
                            <li>Zip Code: {user.ZIPCODE}</li>
                        </ul>
                    </div>

                    <div className='grid grid-cols-1 gap-4'>
                        <h2 className="text-xl font-bold">Rated Movies in Slider format</h2>
                        <MovieSlider movies={movies} />
                    </div>

                    <div className='grid grid-cols-1 gap-4'>
                        <h2 className="text-xl font-bold">Rated Movies in List format</h2>
                        <MovieList movies={movies} />
                    </div>

                    {/* 추가된 섹션 */}
                    <div className='grid grid-cols-1 gap-4'>
                        <h2 className="text-xl font-bold">Top Movies by People in the Same Occupation</h2>
                        <TopMoviesByOccupation userId={user.userId} />
                    </div>

                    <div className='grid grid-cols-1 gap-4'>
                        <h2 className="text-xl font-bold">Top Movies by People in the Same Age Group</h2>
                        <TopMoviesByAge userId={user.userId} />
                    </div>

                    <div className='grid grid-cols-1 gap-4'>
                        <h2 className="text-xl font-bold">Top Recommended Movies</h2>
                        <RecommendedMovies userId={user.userId} />
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDetails;
