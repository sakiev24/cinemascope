import React, { useEffect, useState } from 'react';
import { getGenres } from '../services/tmdbApi';
import type { Genre } from '../types';

interface GenreFilterProps {
    onFilterChange: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onFilterChange }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    const handleGenreClick = (genreId: number) => {
        const newGenre = selectedGenre === genreId ? null : genreId;
        setSelectedGenre(newGenre);
        onFilterChange(newGenre);
    };

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 border border-light-border dark:border-dark-border">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                Genres
            </h3>
            <div className="space-y-2">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => handleGenreClick(genre.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${selectedGenre === genre.id
                                ? 'bg-light-accent dark:bg-dark-accent text-white'
                                : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-border'
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GenreFilter;
