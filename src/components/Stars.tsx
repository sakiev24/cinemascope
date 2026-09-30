interface StarsProps {
    rating: number;
    className?: string;
}

const Stars = ({ rating, className = 'text-base' }: StarsProps) => (
    <span className={`inline-flex tracking-tight ${className}`} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
            <span key={i} aria-hidden="true" className={i < rating ? 'text-sunburst' : 'text-midnight-500'}>
                ★
            </span>
        ))}
    </span>
);

export default Stars;
