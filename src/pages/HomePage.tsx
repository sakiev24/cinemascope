import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getNowPlayingMovies, getTopRatedMovies, getImageUrl } from '../services/tmdbApi';
import type { Movie } from '../types';
import MovieRow from '../components/MovieRow';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [trendingData, nowPlayingData, topRatedData] = await Promise.all([
                getTrendingMovies(),
                getNowPlayingMovies(),
                getTopRatedMovies(),
            ]);
            setTrending(trendingData);
            setNowPlaying(nowPlayingData);
            setTopRated(topRatedData);
        } catch (err) {
            setError('We couldn’t reach the film database. Check your connection and try again.');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const featured = trending.find((m) => m.backdrop_path) ?? null;
    const backdrop = featured ? getImageUrl(featured.backdrop_path, 'w1280') : null;
    const featuredYear = featured?.release_date ? new Date(featured.release_date).getFullYear() : null;

    if (error) {
        return (
            <div className="mx-auto max-w-3xl px-4 pt-32">
                <ErrorMessage message={error} onRetry={fetchAll} />
            </div>
        );
    }

    return (
        <div>
            {/* Hero */}
            <section className="relative isolate flex min-h-[36rem] items-end lg:h-[88vh] lg:max-h-[56rem] overflow-hidden">
                {backdrop ? (
                    <img
                        src={backdrop}
                        alt=""
                        className="absolute inset-0 -z-20 h-full w-full animate-fade-up object-cover object-top"
                    />
                ) : (
                    <div className="absolute inset-0 -z-20 animate-pulse bg-midnight-700" />
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/20" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight/90 via-midnight/30 to-transparent" />

                <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
                    {featured ? (
                        <div className="max-w-3xl animate-fade-up">
                            <p className="label text-sunburst">#1 Trending this week</p>
                            <h1 className="display mt-4 text-5xl text-white sm:text-7xl lg:text-8xl">
                                {featured.title}
                            </h1>
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-midnight-100">
                                {featuredYear && <span>{featuredYear}</span>}
                                {featured.vote_average > 0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-sunburst px-2.5 py-0.5 text-xs font-bold text-midnight">
                                        ★ {featured.vote_average.toFixed(1)}
                                    </span>
                                )}
                            </div>
                            {featured.overview && (
                                <p className="mt-5 line-clamp-3 max-w-xl text-base leading-relaxed text-midnight-100 sm:text-lg">
                                    {featured.overview}
                                </p>
                            )}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link to={`/movie/${featured.id}`} className="btn-primary">
                                    View film
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link to="/films" className="btn-ghost">
                                    Browse all films
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl animate-pulse space-y-5">
                            <div className="h-3 w-40 rounded-full bg-midnight-600" />
                            <div className="h-20 w-full rounded-2xl bg-midnight-600" />
                            <div className="h-4 w-2/3 rounded-full bg-midnight-600" />
                        </div>
                    )}
                </div>
            </section>

            <div className="space-y-20 pt-12">
                <MovieRow label="This week" title="Trending" movies={trending} loading={loading} ranked />
                <MovieRow label="On the big screen" title="Now playing" movies={nowPlaying} loading={loading} />

                {/* Brand split, echoing the two-color palette */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid overflow-hidden rounded-[2rem] md:grid-cols-2">
                        <Link to="/films" className="group flex min-h-64 flex-col justify-between bg-sunburst p-8 text-midnight sm:p-10">
                            <p className="label">Explore</p>
                            <div>
                                <h2 className="display text-5xl sm:text-6xl">Find it.</h2>
                                <p className="mt-3 max-w-sm font-medium text-midnight/75">
                                    Search thousands of films and filter by the genres you love.
                                </p>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1">
                                    Browse films →
                                </span>
                            </div>
                        </Link>
                        <Link to="/reviews" className="group flex min-h-64 flex-col justify-between bg-midnight-950 p-8 text-sunburst sm:p-10">
                            <p className="label">Remember</p>
                            <div>
                                <h2 className="display text-5xl sm:text-6xl">Review it.</h2>
                                <p className="mt-3 max-w-sm font-medium text-midnight-200">
                                    Rate what you watch and keep a personal diary of every take.
                                </p>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1">
                                    Your reviews →
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>

                <MovieRow label="All-time" title="Top rated" movies={topRated} loading={loading} />
            </div>
        </div>
    );
};

export default HomePage;
