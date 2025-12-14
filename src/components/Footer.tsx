const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-3">
                            <span className="font-bold text-light-text dark:text-white text-sm tracking-tight">
                                CinemaScope
                            </span>
                        </div>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-md">
                            Track films you've watched. Save those you want to see. Tell your friends what's good.
                        </p>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="font-semibold text-light-text dark:text-white mb-3 text-xs uppercase tracking-wider">Info</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-dark-accent transition-colors">
                                    Powered by TMDB
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-8 border-t border-light-border dark:border-dark-border">
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        © {currentYear} CinemaScope • Built with React & TMDB API
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
