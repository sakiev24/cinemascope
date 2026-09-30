interface PosterProps {
    src: string | null;
    title: string;
    className?: string;
    eager?: boolean;
}

// 2:3 poster image with a branded fallback when TMDB has no artwork
const Poster = ({ src, title, className = '', eager = false }: PosterProps) => {
    if (!src) {
        return (
            <div className={`flex aspect-[2/3] w-full flex-col items-center justify-center gap-3 bg-midnight-700 p-4 text-center ${className}`}>
                <svg className="h-8 w-8 text-sunburst/70" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path strokeLinecap="round" d="M3 9h18M8 4v5M16 4v5" />
                </svg>
                <span className="line-clamp-3 text-xs font-semibold text-midnight-200">{title}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={title}
            loading={eager ? 'eager' : 'lazy'}
            className={`aspect-[2/3] w-full object-cover ${className}`}
        />
    );
};

export default Poster;
