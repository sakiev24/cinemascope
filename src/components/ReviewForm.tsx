import React, { useState } from 'react';
import { createReview } from '../services/reviewApi';
import type { Review } from '../types';

interface ReviewFormProps {
    movieId: number;
    onReviewSubmitted: () => void;
    onShowToast: (message: string, type: 'success' | 'error') => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onReviewSubmitted, onShowToast }) => {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ text?: string; author?: string }>({});

    const validate = () => {
        const newErrors: { text?: string; author?: string } = {};

        if (!text.trim()) {
            newErrors.text = 'Review text is required';
        } else if (text.trim().length < 10) {
            newErrors.text = 'Review must be at least 10 characters';
        }

        if (!author.trim()) {
            newErrors.author = 'Name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const review: Omit<Review, 'id'> = {
                movieId,
                rating,
                text: text.trim(),
                author: author.trim(),
                timestamp: new Date().toISOString(),
            };

            await createReview(review);
            onShowToast('Review submitted successfully!', 'success');

            // Reset form
            setText('');
            setAuthor('');
            setRating(5);
            setErrors({});

            onReviewSubmitted();
        } catch (error) {
            console.error('Error submitting review:', error);
            onShowToast('Failed to submit review. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStarInput = () => {
        return (
            <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="text-3xl focus:outline-none transition-transform hover:scale-110"
                    >
                        <span className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
                            ★
                        </span>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-light-border dark:border-dark-border">
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                Write a Review
            </h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Your Name
                </label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                    placeholder="Enter your name"
                />
                {errors.author && (
                    <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Rating
                </label>
                {renderStarInput()}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Your Review
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent resize-none"
                    placeholder="Share your thoughts about this movie..."
                />
                {errors.text && (
                    <p className="text-red-500 text-sm mt-1">{errors.text}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

export default ReviewForm;
