import React, { useEffect, useState } from 'react';
import { getGenres } from '../services/tmdbApi';
import type { Genre } from '../types';

interface GenreFilterProps {
    selected: number | null;
    onFilterChange: (genreId: number | null) => void;
    disabled?: boolean;
}

const chip = 'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40';
const chipIdle = 'bg-midnight-700 text-midnight-100 hover:bg-midnight-600 hover:text-white';
const chipActive = 'bg-sunburst text-midnight';

const GenreFilter: React.FC<GenreFilterProps> = ({ selected, onFilterChange, disabled = false }) => {
    const [genres, setGenres] = useState<Genre[]>([]);

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

    return (
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button
                onClick={() => onFilterChange(null)}
                disabled={disabled}
                aria-pressed={selected === null}
                className={`${chip} ${selected === null ? chipActive : chipIdle}`}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => onFilterChange(selected === genre.id ? null : genre.id)}
                    disabled={disabled}
                    aria-pressed={selected === genre.id}
                    className={`${chip} ${selected === genre.id ? chipActive : chipIdle}`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;
