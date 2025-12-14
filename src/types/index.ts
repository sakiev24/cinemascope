// Movie data from TMDB API
export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    genres: Genre[];
    tagline: string;
    status: string;
}

export interface Genre {
    id: number;
    name: string;
}

// Review data from Mock API
export interface Review {
    id?: number;
    movieId: number;
    rating: number;
    text: string;
    author: string;
    timestamp: string;
}

// API Response types
export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface GenresResponse {
    genres: Genre[];
}
