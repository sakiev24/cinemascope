import React, { useEffect, useRef } from 'react';
import { cssMs } from '../hooks/useMotion';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const VISIBLE_MS = 3000;

// Toast open / close: rises in with a cross-blur, then closes on the faster clock before unmounting
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        let closeTimer: ReturnType<typeof setTimeout>;
        const openFrame = requestAnimationFrame(() => el?.classList.add('is-open'));
        const hideTimer = setTimeout(() => {
            el?.classList.remove('is-open');
            closeTimer = setTimeout(onClose, cssMs('--toast-close', 250));
        }, VISIBLE_MS);

        return () => {
            cancelAnimationFrame(openFrame);
            clearTimeout(hideTimer);
            clearTimeout(closeTimer);
        };
    }, [message, onClose]);

    return (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div
                ref={ref}
                className={`t-toast flex items-center gap-3 rounded-full py-2 pl-2 pr-5 shadow-2xl shadow-black/40 ${type === 'success'
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
