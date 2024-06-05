const API_BASE_URL = 'http://localhost:8001/api';

export const getTopMoviesByOccupation = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/movie/top-by-occupation/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching top movies by occupation:', error);
        throw error;
    }
};

export const getTopMoviesByAge = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/movie/top-by-age/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching top movies by age:', error);
        throw error;
    }
};

export const getTopRecommendedMovies = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/movie/recommendations/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching top recommended movies:', error);
        throw error;
    }
};
