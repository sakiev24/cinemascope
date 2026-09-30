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
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-slide-in">
            <div
                className={`flex items-center gap-3 rounded-full py-2 pl-2 pr-5 shadow-2xl shadow-black/40 ${type === 'success'
                    ? 'bg-sunburst text-midnight'
                    : 'bg-white text-midnight'
                    }`}
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-midnight text-sm font-bold text-sunburst">
                    {type === 'success' ? '✓' : '!'}
                </span>
                <p className="text-sm font-semibold">{message}</p>
            </div>
        </div>
    );
};

export default Toast;
