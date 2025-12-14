import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-light-surface dark:bg-dark-surface rounded-poster aspect-[2/3] w-full"></div>
        </div>
    );
};

export default SkeletonLoader;
