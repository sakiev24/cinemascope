import axios from 'axios';
import type { Movie, MovieDetails, Genre, TMDBResponse, GenresResponse } from '../types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbClient = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

export const getTrendingMovies = async (): Promise<Movie[]> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/trending/movie/week');
    return response.data.results;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/movie/popular');
    return response.data.results;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${id}`);
    return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    if (!query.trim()) return [];
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/search/movie', {
        params: { query },
    });
    return response.data.results;
};

export const getGenres = async (): Promise<Genre[]> => {
    const response = await tmdbClient.get<GenresResponse>('/genre/movie/list');
    return response.data.genres;
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/discover/movie', {
        params: { with_genres: genreId },
    });
    return response.data.results;
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500'): string => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
