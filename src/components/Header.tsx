import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <header className="bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center">
                            <span className="text-lg font-bold text-light-text dark:text-white tracking-tight">
                                CinemaScope
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6">
                            <Link
                                to="/"
                                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === '/'
                                    ? 'text-dark-accent'
                                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-dark-accent'
                                    }`}
                            >
                                FILMS
                            </Link>
                        </nav>
                    </div>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-dark-accent transition-colors duration-200"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
