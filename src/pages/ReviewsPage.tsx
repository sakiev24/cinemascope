import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllReviews } from '../services/reviewApi';
import { getMovieDetails, getImageUrl } from '../services/tmdbApi';
import type { MovieDetails, Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import Poster from '../components/Poster';

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [movies, setMovies] = useState<Record<number, MovieDetails>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const all = await getAllReviews();
            setReviews(all);

            // Look up each reviewed film once; a failed lookup just leaves that card without a poster
            const ids = [...new Set(all.map((r) => r.movieId))];
            const results = await Promise.allSettled(ids.map((movieId) => getMovieDetails(movieId)));
            const byId: Record<number, MovieDetails> = {};
            results.forEach((result) => {
                if (result.status === 'fulfilled') byId[result.value.id] = result.value;
            });
            setMovies(byId);
            setLoading(false);
        };
        load();
    }, []);

    const filmCount = new Set(reviews.map((r) => r.movieId)).size;
    const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

    const stats = [
        { label: 'Reviews', value: reviews.length },
        { label: 'Films', value: filmCount },
        { label: 'Avg rating', value: reviews.length ? `${avg.toFixed(1)}★` : '—' },
    ];

    return (
        <div className="mx-auto max-w-4xl px-4 pt-32 sm:px-6 lg:px-8">
            <header className="animate-fade-up">
                <p className="label text-sunburst">Your diary</p>
                <h1 className="display mt-3 text-5xl text-white sm:text-7xl">Reviews</h1>
                <p className="mt-4 max-w-lg text-midnight-200">
                    Every review you write is saved on this device. Here’s everything you’ve logged so far.
                </p>
            </header>

            <dl className="mt-10 grid grid-cols-3 overflow-hidden rounded-3xl border border-white/5 bg-midnight-900">
                {stats.map(({ label, value }, i) => (
                    <div key={label} className={`px-4 py-6 text-center sm:px-6 ${i ? 'border-l border-white/5' : ''}`}>
                        <dt className="label text-[10px] text-midnight-300">{label}</dt>
                        <dd className="display mt-2 text-3xl text-white sm:text-4xl">{loading ? '·' : value}</dd>
                    </div>
                ))}
            </dl>

            <div className="mt-12">
                {loading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-40 animate-pulse rounded-3xl bg-midnight-900" />
                        ))}
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="rounded-3xl bg-sunburst px-6 py-16 text-center text-midnight">
                        <p className="display text-4xl">Nothing logged yet</p>
                        <p className="mx-auto mt-3 max-w-sm font-medium text-midnight/75">
                            Pick a film, give it some stars, and your first review will show up here.
                        </p>
                        <Link
                            to="/films"
                            className="mt-8 inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-bold text-white transition hover:bg-midnight-950"
                        >
                            Find a film
                        </Link>
                    </div>
                ) : (
                    <ol className="space-y-5">
                        {reviews.map((review) => {
                            const movie = movies[review.movieId];
                            return (
                                <li key={review.id} className="flex gap-4 sm:gap-6">
                                    <Link
                                        to={`/movie/${review.movieId}`}
                                        className="w-16 shrink-0 self-start overflow-hidden rounded-xl ring-1 ring-white/10 transition hover:ring-2 hover:ring-sunburst sm:w-24"
                                        aria-label={movie?.title ?? 'View film'}
                                    >
                                        <Poster src={movie ? getImageUrl(movie.poster_path, 'w300') : null} title={movie?.title ?? ''} />
                                    </Link>
                                    <div className="min-w-0 flex-1">
                                        <Link
                                            to={`/movie/${review.movieId}`}
                                            className="mb-2 inline-block text-lg font-bold text-white transition hover:text-sunburst"
                                        >
                                            {movie?.title ?? `Film #${review.movieId}`}
                                        </Link>
                                        <ReviewCard review={review} />
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;
