interface LogoMarkProps {
    className?: string;
    tone?: 'sunburst' | 'midnight';
}

// Lens/aperture mark: a ring with a focal point
export const LogoMark = ({ className = 'h-8 w-8', tone = 'sunburst' }: LogoMarkProps) => {
    const bg = tone === 'sunburst' ? '#F8C61E' : '#252C37';
    const fg = tone === 'sunburst' ? '#252C37' : '#F8C61E';

    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
            <rect width="32" height="32" rx="9" fill={bg} />
            <circle cx="16" cy="16" r="8.5" fill="none" stroke={fg} strokeWidth="3" />
            <circle cx="16" cy="16" r="2.5" fill={fg} />
        </svg>
    );
};

export const Wordmark = ({ className = '' }: { className?: string }) => (
    <span className={`font-extrabold uppercase tracking-tight ${className}`}>CinemaScope</span>
);
