import React from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                Oops! Something went wrong
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center max-w-md">
                {message}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
