interface LogoMarkProps {
    className?: string;
    tone?: 'sunburst' | 'midnight';
}

// Widescreen C: a C whose opening is the 2.39:1 CinemaScope frame (masters live in brand/logo)
export const LogoMark = ({ className = 'h-8 w-8', tone = 'sunburst' }: LogoMarkProps) => {
    const bg = tone === 'sunburst' ? '#F8C61E' : '#252C37';
    const fg = tone === 'sunburst' ? '#252C37' : '#F8C61E';

    return (
        <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
            <rect width="256" height="256" rx="56" fill={bg} />
            <path
                fill={fg}
                d="M199.15 106.3A72.8 72.8 0 1 0 199.15 149.7H116.35A21.7 21.7 0 0 1 116.35 106.3Z"
            />
        </svg>
    );
};

export const Wordmark = ({ className = '' }: { className?: string }) => (
    <span className={`font-extrabold uppercase tracking-tight ${className}`}>CinemaScope</span>
);
