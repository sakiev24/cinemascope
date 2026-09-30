import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogoMark } from './Logo';

const links = [
    { to: '/', label: 'Discover', end: true },
    { to: '/films', label: 'Films', end: false },
    { to: '/reviews', label: 'Reviews', end: false },
];

const SCROLL_THRESHOLD = 24;

// True once the page has scrolled past the threshold
const useScrolled = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    return scrolled;
};

const Header = () => {
    const glass = useScrolled();

    return (
        <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 pointer-events-none">
            <nav
                aria-label="Main"
                className={`nav-pill pointer-events-auto flex w-max items-center gap-1 rounded-full border p-1.5 ${glass
                    ? 'is-glass'
                    : 'border-black/5 bg-white/75 shadow-lg shadow-black/25 backdrop-blur-xl'
                    }`}
            >
                <Link
                    to="/"
                    aria-label="CinemaScope home"
                    className="flex items-center gap-2 rounded-full py-0.5 pl-0.5 pr-2 transition hover:opacity-80"
                >
                    <LogoMark className="h-8 w-8" tone={glass ? 'sunburst' : 'midnight'} />
                    <span className={`text-sm font-extrabold uppercase tracking-tight transition-colors duration-300 ${glass ? 'text-white' : 'text-midnight'}`}>
                        CinemaScope
                    </span>
                </Link>

                <span
                    aria-hidden="true"
                    className={`mx-1 hidden h-5 w-px transition-colors duration-300 md:block ${glass ? 'bg-white/20' : 'bg-midnight/15'}`}
                />

                <ul className="hidden items-center gap-0.5 md:flex">
                    {links.map(({ to, label, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${isActive
                                        ? 'bg-sunburst text-midnight shadow-sm'
                                        : glass
                                            ? 'text-white/75 hover:bg-white/10 hover:text-white'
                                            : 'text-midnight/70 hover:bg-midnight/5 hover:text-midnight'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <Link
                    to="/films?focus=search"
                    className={`ml-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${glass
                        ? 'bg-white text-midnight hover:bg-sunburst'
                        : 'bg-midnight text-white hover:bg-midnight-950'
                        }`}
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                    </svg>
                    Search
                </Link>
            </nav>
        </header>
    );
};

export default Header;
