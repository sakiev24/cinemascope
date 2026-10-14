import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// Classes are toggled on the DOM node directly (as the transitions.dev snippets do), so the
// element's className prop must stay constant or React will overwrite the state class.

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cssMs = (name: string, fallback: number) => {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
    return Number.isFinite(v) ? v : fallback;
};

const playReveal = (el: HTMLElement) => {
    el.classList.remove('is-hiding', 'is-shown');
    void el.offsetHeight;
    requestAnimationFrame(() => el.classList.add('is-shown'));
};

// Texts reveal: plays the staggered entrance whenever the element mounts, and replays when `key` changes
export const useTextsReveal = <T extends HTMLElement>(key?: unknown) => {
    const elRef = useRef<T | null>(null);
    const firstKey = useRef(true);

    const ref = useCallback((el: T | null) => {
        elRef.current = el;
        if (el) playReveal(el);
    }, []);

    useEffect(() => {
        if (firstKey.current) {
            firstKey.current = false;
            return;
        }
        if (elRef.current) playReveal(elRef.current);
    }, [key]);

    return ref;
};

const TILT_MAX = 10; // degrees at the card edges

// Card hover tilt: pointer is tracked on the flat .t-tilt wrapper, the inner .t-tilt-card rotates
export const useCardTilt = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const tilt = ref.current;
        const card = tilt?.querySelector<HTMLElement>('.t-tilt-card');
        if (!tilt || !card) return;

        const reset = () => {
            tilt.classList.remove('is-hover');
            card.classList.remove('is-tilting');
            card.style.setProperty('--tilt-rx', '0deg');
            card.style.setProperty('--tilt-ry', '0deg');
        };

        const track = (e: PointerEvent) => {
            // Mouse only: on touch the poster rows need to scroll
            if (e.pointerType !== 'mouse' || reducedMotion()) return;
            const r = tilt.getBoundingClientRect();
            const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
            const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
            tilt.classList.add('is-hover');
            card.classList.add('is-tilting');
            card.style.setProperty('--tilt-ry', ((px - 0.5) * TILT_MAX).toFixed(2) + 'deg');
            card.style.setProperty('--tilt-rx', ((0.5 - py) * TILT_MAX).toFixed(2) + 'deg');
            card.style.setProperty('--tilt-gx', (px * 100).toFixed(1) + '%');
            card.style.setProperty('--tilt-gy', (py * 100).toFixed(1) + '%');
        };

        tilt.addEventListener('pointermove', track);
        tilt.addEventListener('pointerleave', reset);
        return () => {
            tilt.removeEventListener('pointermove', track);
            tilt.removeEventListener('pointerleave', reset);
        };
    }, []);

    return ref;
};

// Text states swap: old text exits up, new text enters from below
export const useTextSwap = (text: string) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(text);

    useEffect(() => {
        const el = ref.current;
        if (!el || text === shown) return;
        el.classList.add('is-exit');
        const timer = setTimeout(() => {
            setShown(text);
            el.classList.remove('is-exit');
            el.classList.add('is-enter-start');
        }, cssMs('--text-swap-dur', 150));
        return () => clearTimeout(timer);
    }, [text, shown]);

    // After the new text has rendered: reflow, then let it animate back to rest
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el?.classList.contains('is-enter-start')) return;
        void el.offsetHeight;
        el.classList.remove('is-enter-start');
    }, [shown]);

    return [ref, shown] as const;
};

// Error state shake: replays the shake on the given element
export const shake = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.remove('is-shaking');
    void el.offsetWidth;
    el.classList.add('is-shaking');
    const total = cssMs('--shake-dur-a', 80) * 2 + cssMs('--shake-dur-b', 60) * 2;
    setTimeout(() => el.classList.remove('is-shaking'), total + 20);
};

export { cssMs };
