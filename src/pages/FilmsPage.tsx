import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPopularMovies, searchMovies, getMoviesByGenre } from '../services/tmdbApi';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';

const grid = 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';

const FilmsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let data: Movie[];

            if (searchQuery) {
                data = await searchMovies(searchQuery);
            } else if (selectedGenre) {
                data = await getMoviesByGenre(selectedGenre);
            } else {
                data = await getPopularMovies();
            }

            setMovies(data);
        } catch (err) {
            setError('Failed to load films.');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, selectedGenre]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const heading = searchQuery ? `“${searchQuery}”` : selectedGenre ? 'By genre' : 'Popular';
    const eyebrow = searchQuery ? 'Search results' : 'Browse';

    return (
        <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
            <header className="animate-fade-up">
                <p className="label text-sunburst">{eyebrow}</p>
                <h1 className="display mt-3 break-words text-5xl text-white sm:text-7xl">{heading}</h1>
            </header>

            <div className="mt-10 space-y-5">
                <SearchBar onSearch={setSearchQuery} autoFocus={searchParams.get('focus') === 'search'} />
                <GenreFilter selected={selectedGenre} onFilterChange={setSelectedGenre} disabled={!!searchQuery} />
                {searchQuery && (
                    <p className="text-xs text-midnight-300">Genre filters are paused while searching.</p>
                )}
            </div>

            <div className="mt-12">
                {error ? (
                    <ErrorMessage message={error} onRetry={fetchMovies} />
                ) : loading ? (
                    <div className={grid}>
                        {Array.from({ length: 18 }).map((_, i) => (
                            <SkeletonLoader key={i} />
                        ))}
                    </div>
                ) : movies.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-midnight-600 py-20 text-center">
                        <p className="display text-3xl text-white">No films found</p>
                        <p className="mt-2 text-sm text-midnight-300">Try a different title or genre.</p>
                    </div>
                ) : (
                    <div className={grid}>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilmsPage;
