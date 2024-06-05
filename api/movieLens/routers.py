# routers.py

from fastapi import APIRouter, status, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from movieLens.models import Movie, MovieGenre, User, Rating
from movieLens.controllers import (
    get_movies,
    get_movie,
    get_users,
    get_user,
    get_genres,
    get_genre,
    get_ratings,
    get_rating,
    get_movie_rating,
    get_movie_genre,
    search_movies,
    get_average_rating,
    get_user_movie_rating,
    get_user_rated_movies,
    get_top_movies_by_occupation,
    get_top_movies_by_age,
    get_top_recommended_movies
)

movie_router = APIRouter()
user_router = APIRouter()
genre_router = APIRouter()
rating_router = APIRouter()

# Existing routes...

@movie_router.get("/v1/movie/top-by-occupation/{user_id}")
def get_top_movies_by_occupation_api(user_id: int):
    movies = get_top_movies_by_occupation(user_id)
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(movies))

@movie_router.get("/v1/movie/top-by-age/{user_id}")
def get_top_movies_by_age_api(user_id: int):
    movies = get_top_movies_by_age(user_id)
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(movies))

@movie_router.get("/v1/movie/recommendations/{user_id}")
def get_top_recommended_movies_api(user_id: int):
    recommendations = get_top_recommended_movies(user_id)
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(recommendations))


@movie_router.get("/v1/movie")
def get_movies_api(limit: int = 10, offset: int = 0):
	"""
	This movies get API allow you to fetch all movie data.
	"""
	movies = get_movies(limit, offset)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(movies))


@movie_router.get("/v1/movie/{movie_id}")
def get_movie_api(movie_id: int, user_id: int = None):
	"""
	This movie API allow you to fetch specific movie data.
	"""
	movie = get_movie(movie_id)
	movie["avgRating"] = get_average_rating(movie_id)
	movie["genres"] = get_movie_genre(movie_id)
	if user_id:
		rating = get_user_movie_rating(user_id, movie_id)
		if rating:
			movie["ratingScore"] = rating["ratingScore"]
			movie["timestamp"] = rating["timestamp"]
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(movie))


@movie_router.get("/v1/movie/{movie_id}/rating")
def get_movie_rating_api(movie_id: int):
	"""
	This rating API allow you to fetch specific rating data.
	"""
	rating = get_movie_rating(movie_id)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(rating))


@movie_router.get("/v1/search")
def search_movies_api(query: str = None, limit: int = 100, offset: int = 0):
	"""
	This search API allow you to search specific movie data.
	If query is empty, it will return all movies.
	"""
	if query:
		movies = search_movies(query, limit, offset)
	else:
		movies = get_movies(limit, offset)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(movies))


# User Controllers


@user_router.get("/v1/user")
def get_users_api(limit: int = 10, offset: int = 0):
	"""
	This users get API allow you to fetch all user data.
	"""
	users = get_users(limit, offset)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(users))


@user_router.get("/v1/user/{user_id}")
def get_user_api(user_id: int):
	"""
	This user API allow you to fetch specific user data.
	"""
	user = get_user(user_id)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(user))


@user_router.get("/v1/user/{user_id}/rated")
def get_user_rated_movies_api(user_id: int):
	"""
	This user rated movies API allow you to fetch specific user rated movies data.
	"""
	movies = get_user_rated_movies(user_id)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(movies))


# Genre Controllers


@genre_router.get("/v1/genre")
def get_genres_api(limit: int = 10, offset: int = 0):
	"""
	This genres get API allow you to fetch all genre data.
	"""
	genres = get_genres(limit, offset)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(genres))


@genre_router.get("/v1/genre/{genre_id}")
def get_genre_api(genre_id: int):
	"""
	This genre API allow you to fetch specific genre data.
	"""
	genre = get_genre(genre_id)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(genre))


# Rating Controllers


@rating_router.get("/v1/rating")
def get_ratings_api(limit: int = 10, offset: int = 0):
	"""
	This ratings get API allow you to fetch all rating data.
	"""
	ratings = get_ratings(limit, offset)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(ratings))


@rating_router.get("/v1/rating/{rating_id}")
def get_rating_api(rating_id: int):
	"""
	This rating API allow you to fetch specific rating data.
	"""
	rating = get_rating(rating_id)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(rating))


@rating_router.get("/v1/user/{user_id}/movie/{movie_id}/rating")
def get_user_movie_rating_api(user_id: int, movie_id: int):
	"""
	This user movie rating API allow you to fetch specific user movie rating data.
	"""
	rating = get_user_movie_rating(user_id, movie_id)
	return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(rating))
