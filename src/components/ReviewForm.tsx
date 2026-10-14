import React, { useRef, useState } from 'react';
import { createReview } from '../services/reviewApi';
import type { Review } from '../types';
import { shake, useTextSwap } from '../hooks/useMotion';

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
    const authorRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [labelRef, submitLabel] = useTextSwap(isSubmitting ? 'Publishing…' : 'Publish review');

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
        // Error state shake: replay on every failed submit
        if (newErrors.author) shake(authorRef.current);
        if (newErrors.text) shake(textRef.current);
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

            <div className={`t-input-wrap mt-5 ${errors.author ? 'is-error' : ''}`}>
                <label htmlFor="review-author" className="mb-2 block text-sm font-semibold">
                    Your name
                </label>
                <input
                    id="review-author"
                    type="text"
                    value={author}
                    ref={authorRef}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                        if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
                    }}
                    className="t-input w-full rounded-xl border-2 border-transparent aria-[invalid=true]:border-midnight bg-white/60 px-4 py-3 text-sm text-midnight placeholder:text-midnight/50 transition focus:border-midnight focus:bg-white/80 focus:outline-none"
                    placeholder="e.g. Alex"
                    maxLength={40}
                    aria-invalid={!!errors.author}
                />
                <p className="t-error-msg mt-1.5 min-h-4 text-xs font-semibold" aria-live="polite">
                    {errors.author && `⚠ ${errors.author}`}
                </p>
            </div>

            <div className={`t-input-wrap mt-5 ${errors.text ? 'is-error' : ''}`}>
                <label htmlFor="review-text" className="mb-2 block text-sm font-semibold">
                    Your review
                </label>
                <textarea
                    id="review-text"
                    value={text}
                    ref={textRef}
                    onChange={(e) => {
                        setText(e.target.value);
                        if (errors.text) setErrors((prev) => ({ ...prev, text: undefined }));
                    }}
                    rows={5}
                    maxLength={1000}
                    className="t-input w-full resize-none rounded-xl border-2 border-transparent aria-[invalid=true]:border-midnight bg-white/60 px-4 py-3 text-sm text-midnight placeholder:text-midnight/50 transition focus:border-midnight focus:bg-white/80 focus:outline-none"
                    placeholder="What stayed with you after the credits rolled?"
                    aria-invalid={!!errors.text}
                />
                <p className="t-error-msg mt-1.5 min-h-4 text-xs font-semibold" aria-live="polite">
                    {errors.text && `⚠ ${errors.text}`}
                </p>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-full bg-midnight px-6 py-3.5 text-sm font-bold text-white transition hover:bg-midnight-950 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-offset-sunburst"
            >
                <span ref={labelRef} className="t-text-swap">{submitLabel}</span>
            </button>
        </form>
    );
};

export default ReviewForm;
