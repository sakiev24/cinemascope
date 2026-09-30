import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { getImageUrl } from '../services/tmdbApi';
import Poster from './Poster';

interface MovieCardProps {
    movie: Movie;
    rank?: number;
}

const MovieCard = ({ movie, rank }: MovieCardProps) => {
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '';

    return (
        <Link to={`/movie/${movie.id}`} className="group block focus-visible:rounded-2xl">
            <div className="relative overflow-hidden rounded-2xl bg-midnight-700 ring-1 ring-white/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-sunburst group-hover:shadow-2xl group-hover:shadow-black/40">
                <Poster src={getImageUrl(movie.poster_path)} title={movie.title} />

                {rating && (
                    <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-midnight/80 px-2 py-0.5 text-[11px] font-bold text-sunburst backdrop-blur">
                        ★ {rating}
                    </span>
                )}

                {rank !== undefined && (
                    <span className="absolute left-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-sunburst px-2 text-xs font-extrabold text-midnight">
                        {rank}
                    </span>
                )}
            </div>

            <div className="mt-3 px-0.5">
                <h3 className="line-clamp-1 text-sm font-semibold text-white transition-colors group-hover:text-sunburst">
                    {movie.title}
                </h3>
                {year && <p className="label mt-1 text-[10px] text-midnight-300">{year}</p>}
            </div>
        </Link>
    );
};

export default MovieCard;
