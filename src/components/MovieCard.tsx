import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { getImageUrl } from '../services/tmdbApi';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '';

    return (
        <Link
            to={`/movie/${movie.id}`}
            className="group block"
        >
            {/* Poster with smooth hover transition */}
            <div className="relative overflow-hidden rounded-poster shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-auto aspect-[2/3] object-cover"
                    loading="lazy"
                />

                {/* Smooth overlay with metadata on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{year}</span>
                            {rating && (
                                <div className="flex items-center space-x-1">
                                    <span className="text-dark-star">★</span>
                                    <span className="text-white font-medium">{rating}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
