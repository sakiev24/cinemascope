import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="aspect-[2/3] w-full rounded-2xl bg-midnight-700"></div>
            <div className="mt-3 h-3 w-3/4 rounded-full bg-midnight-700"></div>
            <div className="mt-2 h-2 w-1/4 rounded-full bg-midnight-700"></div>
        </div>
    );
};

export default SkeletonLoader;
