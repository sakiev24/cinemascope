import React, { useEffect, useState } from 'react';
import { getTrendingMovies, searchMovies, getMoviesByGenre } from '../services/tmdbApi';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';

const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);

        try {
            let data: Movie[];

            if (searchQuery) {
                data = await searchMovies(searchQuery);
            } else if (selectedGenre) {
                data = await getMoviesByGenre(selectedGenre);
            } else {
                data = await getTrendingMovies();
            }

            setMovies(data);
        } catch (err) {
            setError('Failed to load films.');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [searchQuery, selectedGenre]);

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-14 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-light-text dark:text-white mb-2">
                        {searchQuery ? 'Search Results' : selectedGenre ? 'Filtered Films' : 'Popular Films'}
                    </h1>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                        Discover and review your favorite films
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <SearchBar onSearch={setSearchQuery} />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-56 flex-shrink-0">
                        <GenreFilter onFilterChange={setSelectedGenre} />
                    </aside>

                    {/* Responsive poster grid */}
                    <main className="flex-1">
                        {error ? (
                            <ErrorMessage message={error} onRetry={fetchMovies} />
                        ) : loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                                {Array.from({ length: 18 }).map((_, i) => (
                                    <SkeletonLoader key={i} />
                                ))}
                            </div>
                        ) : movies.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    No films found.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
