import type { Review } from '../types';

const STORAGE_KEY = 'cinemascope_reviews';
const MOCK_DELAY = 500; // Simulate network delay

// Helper to get reviews from storage
const getStoredReviews = (): Review[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

// Helper to save reviews to storage
const saveReviews = (reviews: Review[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const getReviewsByMovieId = async (movieId: number): Promise<Review[]> => {
    // Simulate async network call
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    const allReviews = getStoredReviews();
    return allReviews.filter(review => review.movieId === movieId);
};

export const createReview = async (reviewData: Omit<Review, 'id'>): Promise<Review> => {
    // Simulate async network call
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    const allReviews = getStoredReviews();

    const newReview: Review = {
        ...reviewData,
        id: Date.now(), // Use timestamp as a simple unique ID
    };

    allReviews.push(newReview);
    saveReviews(allReviews);

    return newReview;
};
