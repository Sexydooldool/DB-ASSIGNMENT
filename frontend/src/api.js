import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/api';

export const getTopMoviesByOccupation = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/v1/movie/top-by-occupation/${userId}`);
    return response.data;
};

export const getTopMoviesByAge = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/v1/movie/top-by-age/${userId}`);
    return response.data;
};

export const getTopRecommendedMovies = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/v1/movie/recommendations/${userId}`);
    return response.data;
};
