import React, { useState } from 'react';
import { createReview } from '../services/reviewApi';
import type { Review } from '../types';

interface ReviewFormProps {
    movieId: number;
    onReviewSubmitted: () => void;
    onShowToast: (message: string, type: 'success' | 'error') => void;
}

const ratingLabels = ['Awful', 'Meh', 'Good', 'Great', 'Masterpiece'];

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onReviewSubmitted, onShowToast }) => {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
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
            onShowToast('Review published', 'success');

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

    const shownRating = hoverRating ?? rating;

    return (
        <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-sunburst p-6 text-midnight sm:p-8">
            <p className="label text-midnight/70">Your take</p>
            <h3 className="display mt-2 text-3xl">Write a review</h3>

            <fieldset className="mt-6">
                <legend className="mb-2 text-sm font-semibold">Rating</legend>
                <div className="flex items-center gap-3" onMouseLeave={() => setHoverRating(null)}>
                    <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setRating(i + 1)}
                                onMouseEnter={() => setHoverRating(i + 1)}
                                aria-label={`${i + 1} star${i ? 's' : ''}`}
                                aria-pressed={rating === i + 1}
                                className={`px-0.5 text-3xl leading-none transition-transform hover:scale-110 focus-visible:ring-offset-sunburst ${i < shownRating ? 'text-midnight' : 'text-midnight/20'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <span className="label text-[10px] text-midnight/70">{ratingLabels[shownRating - 1]}</span>
                </div>
            </fieldset>

            <div className="mt-5">
                <label htmlFor="review-author" className="mb-2 block text-sm font-semibold">
                    Your name
                </label>
                <input
                    id="review-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border-2 border-transparent bg-white/60 px-4 py-3 text-sm text-midnight placeholder:text-midnight/50 transition focus:border-midnight focus:bg-white/80 focus:outline-none"
                    placeholder="e.g. Alex"
                    maxLength={40}
                    aria-invalid={!!errors.author}
                />
                {errors.author && <p className="mt-1.5 text-xs font-semibold">⚠ {errors.author}</p>}
            </div>

            <div className="mt-5">
                <label htmlFor="review-text" className="mb-2 block text-sm font-semibold">
                    Your review
                </label>
                <textarea
                    id="review-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    maxLength={1000}
                    className="w-full resize-none rounded-xl border-2 border-transparent bg-white/60 px-4 py-3 text-sm text-midnight placeholder:text-midnight/50 transition focus:border-midnight focus:bg-white/80 focus:outline-none"
                    placeholder="What stayed with you after the credits rolled?"
                    aria-invalid={!!errors.text}
                />
                {errors.text && <p className="mt-1.5 text-xs font-semibold">⚠ {errors.text}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-full bg-midnight px-6 py-3.5 text-sm font-bold text-white transition hover:bg-midnight-950 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-offset-sunburst"
            >
                {isSubmitting ? 'Publishing…' : 'Publish review'}
            </button>
        </form>
    );
};

export default ReviewForm;
