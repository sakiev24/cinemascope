import { useRef } from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';
import SkeletonLoader from './SkeletonLoader';

interface MovieRowProps {
    label: string;
    title: string;
    movies: Movie[];
    loading: boolean;
    ranked?: boolean;
}

// Horizontally scrolling shelf of posters with arrow controls on desktop
const MovieRow = ({ label, title, movies, loading, ranked = false }: MovieRowProps) => {
    const scroller = useRef<HTMLDivElement>(null);

    const scroll = (direction: 1 | -1) => {
        const el = scroller.current;
        if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    const arrow = 'hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-sunburst hover:bg-sunburst hover:text-midnight sm:flex';

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="label text-sunburst">{label}</p>
                    <h2 className="display mt-2 text-3xl text-white sm:text-4xl">{title}</h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`} className={arrow}>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={() => scroll(1)} aria-label={`Scroll ${title} right`} className={arrow}>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={scroller}
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 pt-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
            >
                {loading
                    ? Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="w-36 shrink-0 sm:w-44">
                            <SkeletonLoader />
                        </div>
                    ))
                    : movies.map((movie, i) => (
                        <div key={movie.id} className="w-36 shrink-0 snap-start sm:w-44">
                            <MovieCard movie={movie} rank={ranked ? i + 1 : undefined} />
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default MovieRow;
