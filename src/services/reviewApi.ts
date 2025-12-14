import axios from 'axios';
import type { Review } from '../types';

const MOCK_API_URL = import.meta.env.VITE_MOCK_API_URL || 'http://localhost:3001';

const reviewClient = axios.create({
    baseURL: MOCK_API_URL,
});

export const getReviewsByMovieId = async (movieId: number): Promise<Review[]> => {
    try {
        const response = await reviewClient.get<Review[]>('/reviews', {
            params: { movieId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
};

export const createReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
    const response = await reviewClient.post<Review>('/reviews', review);
    return response.data;
};
