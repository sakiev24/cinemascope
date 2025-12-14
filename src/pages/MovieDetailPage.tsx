import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdbApi';
import { getReviewsByMovieId } from '../services/reviewApi';
import type { MovieDetails, Review } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import Toast from '../components/Toast';

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchMovieData = async () => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const [movieData, reviewsData] = await Promise.all([
                getMovieDetails(Number(id)),
                getReviewsByMovieId(Number(id)),
            ]);

            setMovie(movieData);
            setReviews(reviewsData);
        } catch (err) {
            setError('Failed to load movie details. Please try again.');
            console.error('Error fetching movie data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmitted = async () => {
        if (!id) return;
        const updatedReviews = await getReviewsByMovieId(Number(id));
        setReviews(updatedReviews);
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
    };

    useEffect(() => {
        fetchMovieData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-20 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-light-surface dark:bg-dark-surface rounded-lg mb-8"></div>
                        <div className="h-8 bg-light-surface dark:bg-dark-surface rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-20 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ErrorMessage message={error || 'Movie not found'} onRetry={fetchMovieData} />
                </div>
            </div>
        );
    }

    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-20 pb-12">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center text-light-accent dark:text-dark-accent hover:underline mb-6"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Movies
                </Link>

                {/* Movie Header */}
                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <div className="md:w-1/3">
                        <img
                            src={getImageUrl(movie.poster_path, 'original')}
                            alt={movie.title}
                            className="w-full rounded-poster shadow-2xl"
                        />
                    </div>

                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-2">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="text-lg italic text-light-text-secondary dark:text-dark-text-secondary mb-4">
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 mb-6 text-light-text-secondary dark:text-dark-text-secondary">
                            <span>{year}</span>
                            <span>•</span>
                            <span>{runtime}</span>
                            <span>•</span>
                            <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-full text-sm text-light-text dark:text-dark-text"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
                                Overview
                            </h2>
                            <p className="text-light-text dark:text-dark-text leading-relaxed">
                                {movie.overview || 'No overview available.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Community Reviews Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                        Community Reviews ({reviews.length})
                    </h2>

                    {reviews.length === 0 ? (
                        <p className="text-light-text-secondary dark:text-dark-text-secondary text-center py-8">
                            No reviews yet. Be the first to review this movie!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Review Form */}
                <ReviewForm
                    movieId={movie.id}
                    onReviewSubmitted={handleReviewSubmitted}
                    onShowToast={showToast}
                />
            </div>
        </div>
    );
};

export default MovieDetailPage;
