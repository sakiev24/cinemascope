import { useCallback, useRef } from 'react';

interface PosterProps {
    src: string | null;
    title: string;
    className?: string;
    eager?: boolean;
}

// 2:3 poster image with a branded fallback when TMDB has no artwork
const Poster = ({ src, title, className = '', eager = false }: PosterProps) => {
    const skelRef = useRef<HTMLDivElement>(null);
    const reveal = () => skelRef.current?.classList.add('is-revealed');

    // Cached images can finish before React attaches onLoad
    const imgRef = useCallback((img: HTMLImageElement | null) => {
        if (img?.complete && img.naturalWidth) skelRef.current?.classList.add('is-revealed');
    }, []);

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

    // Skeleton reveal: the pulse cross-fades into the poster once it has loaded
    return (
        <div key={src} ref={skelRef} className={`t-skel poster-skel aspect-[2/3] w-full ${className}`}>
            <div className="t-skel-skeleton is-pulsing" aria-hidden="true">
                <div className="h-full w-full bg-midnight-700" />
            </div>
            <img
                ref={imgRef}
                src={src}
                alt={title}
                loading={eager ? 'eager' : 'lazy'}
                onLoad={reveal}
                onError={reveal}
                className="t-skel-content h-full w-full object-cover"
            />
        </div>
    );
};

export default Poster;
