from pydantic import BaseModel


class Movie(BaseModel):
    movieId: int
    movieTitle: str
    releaseDate: str
    videoReleaseDate: str
    year: int
    backdrop_path: str
    poster_path: str


class MovieGenre(BaseModel):
    mgenreId: int
    movieId: int
    genre: str


class User(BaseModel):
    userId: int
    age: int
    gender: str
    occupation: str
    ZIPCODE: str


class Rating(BaseModel):
    ratingId: int
    userId: int
    movieId: int
    ratingScore: int
    timestamp: str
