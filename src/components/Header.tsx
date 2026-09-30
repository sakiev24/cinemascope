import { Link, NavLink } from 'react-router-dom';
import { LogoMark } from './Logo';

const links = [
    { to: '/', label: 'Discover', end: true },
    { to: '/films', label: 'Films', end: false },
    { to: '/reviews', label: 'Reviews', end: false },
];

const Header = () => {
    return (
        <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 pointer-events-none">
            <nav
                aria-label="Main"
                className="pointer-events-auto flex w-max items-center gap-1 rounded-full border border-black/5 bg-white/75 p-1.5 shadow-lg shadow-black/25 backdrop-blur-xl"
            >
                <Link
                    to="/"
                    aria-label="CinemaScope home"
                    className="flex items-center gap-2 rounded-full py-0.5 pl-0.5 pr-2 transition hover:opacity-80"
                >
                    <LogoMark className="h-8 w-8" tone="midnight" />
                    <span className="text-sm font-extrabold uppercase tracking-tight text-midnight">
                        CinemaScope
                    </span>
                </Link>

                <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-midnight/15 md:block" />

                <ul className="hidden items-center gap-0.5 md:flex">
                    {links.map(({ to, label, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
                                        ? 'bg-sunburst text-midnight shadow-sm'
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
                    className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-midnight px-4 py-2 text-sm font-semibold text-white transition hover:bg-midnight-950"
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
