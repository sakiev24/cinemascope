import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

const navLinks = [
    { to: '/', label: 'Discover' },
    { to: '/films', label: 'Films' },
    { to: '/reviews', label: 'Reviews' },
];

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/',
        path: 'M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.1 10.1 0 0022 12.23C22 6.58 17.52 2 12 2z',
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/',
        path: 'M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 100 9.88 4.94 4.94 0 000-9.88zm0 8.15a3.21 3.21 0 110-6.42 3.21 3.21 0 010 6.42zm5.13-9.5a1.15 1.15 0 100 2.3 1.15 1.15 0 000-2.3z',
    },
    {
        label: 'X',
        href: 'https://x.com/',
        path: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2z',
    },
    {
        label: 'TMDB',
        href: 'https://www.themoviedb.org/',
        path: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2 4v2h3v6h2v-6h3V8H6zm10 0v8h2V8h-2z',
    },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-24 bg-sunburst text-midnight">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-12 text-center">
                <Link to="/" aria-label="CinemaScope home" className="flex items-center gap-2">
                    <LogoMark className="h-9 w-9" tone="midnight" />
                    <span className="text-lg font-extrabold uppercase tracking-tight">CinemaScope</span>
                </Link>

                <nav aria-label="Footer">
                    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold">
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <Link to={to} className="text-midnight/75 transition-colors hover:text-midnight">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ul className="flex items-center gap-3">
                    {socials.map(({ label, href, path }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-midnight/10 text-midnight transition hover:bg-midnight hover:text-sunburst"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d={path} />
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="label text-[11px] text-midnight/60">
                    © {year} CinemaScope · Film data by TMDB
                </p>
            </div>
        </footer>
    );
};

export default Footer;
