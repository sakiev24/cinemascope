import React from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-midnight-900 px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sunburst text-2xl font-black text-midnight">
                !
            </span>
            <h3 className="display mt-6 text-2xl text-white">Something went wrong</h3>
            <p className="mt-2 max-w-md text-sm text-midnight-200">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn-primary mt-8">
                    Try again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
