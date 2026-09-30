import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdbApi';
import { getReviewsByMovieId } from '../services/reviewApi';
import type { MovieDetails, Review } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import Toast from '../components/Toast';
import Poster from '../components/Poster';
import Stars from '../components/Stars';

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchMovieData = useCallback(async () => {
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
    }, [id]);

    const handleReviewSubmitted = async () => {
        if (!id) return;
        const updatedReviews = await getReviewsByMovieId(Number(id));
        setReviews(updatedReviews);
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
    };

    const closeToast = useCallback(() => setToast(null), []);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl animate-pulse px-4 pt-32 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-10 md:flex-row">
                    <div className="aspect-[2/3] w-56 shrink-0 rounded-3xl bg-midnight-700 md:w-72" />
                    <div className="flex-1 space-y-5 pt-6">
                        <div className="h-3 w-32 rounded-full bg-midnight-700" />
                        <div className="h-16 w-3/4 rounded-2xl bg-midnight-700" />
                        <div className="h-4 w-1/2 rounded-full bg-midnight-700" />
                        <div className="h-24 w-full rounded-2xl bg-midnight-700" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="mx-auto max-w-3xl px-4 pt-32">
                <ErrorMessage message={error || 'Movie not found'} onRetry={fetchMovieData} />
            </div>
        );
    }

    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
    const backdrop = getImageUrl(movie.backdrop_path, 'w1280');
    const avgUserRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

            {/* Backdrop */}
            <div className="relative isolate">
                <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
                    {backdrop && <img src={backdrop} alt="" className="h-full w-full object-cover object-top opacity-50" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
                </div>

                <div className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 lg:px-8">
                    <Link
                        to="/films"
                        className="label inline-flex items-center gap-2 rounded-full bg-midnight/60 px-4 py-2 text-[11px] text-white backdrop-blur transition hover:bg-sunburst hover:text-midnight"
                    >
                        ← All films
                    </Link>

                    <div className="mt-8 flex animate-fade-up flex-col gap-10 md:flex-row md:items-end">
                        <div className="w-52 shrink-0 overflow-hidden rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:w-64 md:w-72">
                            <Poster src={getImageUrl(movie.poster_path, 'w780')} title={movie.title} eager />
                        </div>

                        <div className="flex-1 pb-2">
                            {year && <p className="label text-sunburst">{year}</p>}
                            <h1 className="display mt-3 text-5xl text-white sm:text-6xl lg:text-7xl">{movie.title}</h1>
                            {movie.tagline && (
                                <p className="mt-4 text-lg font-medium italic text-midnight-100">{movie.tagline}</p>
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                {movie.vote_average > 0 && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sunburst px-3 py-1.5 text-sm font-bold text-midnight">
                                        ★ {movie.vote_average.toFixed(1)}
                                        <span className="font-semibold text-midnight/60">/ 10</span>
                                    </span>
                                )}
                                {runtime && (
                                    <span className="rounded-full bg-midnight-700 px-3 py-1.5 text-sm font-semibold text-white">
                                        {runtime}
                                    </span>
                                )}
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-midnight-100"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Overview */}
                <section className="mt-16 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-[18rem_1fr] md:gap-10">
                    <h2 className="label text-midnight-300">Overview</h2>
                    <p className="max-w-3xl text-lg leading-relaxed text-midnight-50">
                        {movie.overview || 'No overview available.'}
                    </p>
                </section>

                {/* Reviews */}
                <section className="mt-16 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_24rem]">
                    <div>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="label text-sunburst">Community</p>
                                <h2 className="display mt-2 text-4xl text-white">
                                    Reviews <span className="text-midnight-400">{reviews.length}</span>
                                </h2>
                            </div>
                            {avgUserRating !== null && (
                                <div className="text-right">
                                    <Stars rating={Math.round(avgUserRating)} className="text-xl" />
                                    <p className="label mt-1 text-[10px] text-midnight-300">
                                        Avg {avgUserRating.toFixed(1)} / 5
                                    </p>
                                </div>
                            )}
                        </div>

                        {reviews.length === 0 ? (
                            <div className="mt-8 rounded-3xl border border-dashed border-midnight-600 px-6 py-14 text-center">
                                <p className="display text-2xl text-white">No reviews yet</p>
                                <p className="mt-2 text-sm text-midnight-300">Be the first to share your take on this film.</p>
                            </div>
                        ) : (
                            <div className="mt-8 space-y-4">
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ReviewForm
                            movieId={movie.id}
                            onReviewSubmitted={handleReviewSubmitted}
                            onShowToast={showToast}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MovieDetailPage;
