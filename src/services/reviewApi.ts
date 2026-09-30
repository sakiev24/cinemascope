import type { Review } from '../types';

const STORAGE_KEY = 'cinemascope_reviews';
const MOCK_DELAY = 500; // Simulate network delay

// Helper to get reviews from storage
// Storage can be blocked, cleared or hand-edited, so never trust its shape
const getStoredReviews = (): Review[] => {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
        return Array.isArray(parsed) ? (parsed as Review[]).filter(isReview) : [];
    } catch {
        return [];
    }
};

const isReview = (r: unknown): r is Review => {
    const x = r as Review;
    return (
        !!x &&
        typeof x.movieId === 'number' &&
        typeof x.rating === 'number' &&
        typeof x.text === 'string' &&
        typeof x.author === 'string' &&
        typeof x.timestamp === 'string'
    );
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

export const getAllReviews = async (): Promise<Review[]> => {
    // Simulate async network call
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    return getStoredReviews().sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
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
