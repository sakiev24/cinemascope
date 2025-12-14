import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-top">
            <div
                className={`px-6 py-4 rounded-lg shadow-lg ${type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
            >
                <div className="flex items-center space-x-2">
                    <span className="text-xl">
                        {type === 'success' ? '✓' : '✕'}
                    </span>
                    <p className="font-medium">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;
