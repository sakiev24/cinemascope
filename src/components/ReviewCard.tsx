import React from 'react';
import type { Review } from '../types';

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
                ★
            </span>
        ));
    };

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-light-accent dark:bg-dark-accent flex items-center justify-center text-white font-semibold">
                        {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-light-text dark:text-dark-text">{review.author}</p>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {formatDate(review.timestamp)}
                        </p>
                    </div>
                </div>
                <div className="flex text-xl">{renderStars(review.rating)}</div>
            </div>
            <p className="text-light-text dark:text-dark-text leading-relaxed">{review.text}</p>
        </div>
    );
};

export default ReviewCard;
