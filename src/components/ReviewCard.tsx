import React from 'react';
import type { Review } from '../types';
import Stars from './Stars';

interface ReviewCardProps {
    review: Review;
    children?: React.ReactNode;
}

const formatDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

const ReviewCard: React.FC<ReviewCardProps> = ({ review, children }) => {
    return (
        <article className="rounded-3xl border border-white/5 bg-midnight-900 p-6 transition-colors hover:border-white/10">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sunburst text-sm font-extrabold text-midnight">
                        {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-white">{review.author}</p>
                        <p className="label text-[10px] text-midnight-300">{formatDate(review.timestamp)}</p>
                    </div>
                </div>
                <Stars rating={review.rating} className="text-lg" />
            </div>
            {children}
            <p className="mt-4 whitespace-pre-line leading-relaxed text-midnight-100">{review.text}</p>
        </article>
    );
};

export default ReviewCard;
