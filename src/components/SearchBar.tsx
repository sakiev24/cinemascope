import React, { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, autoFocus = false }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative">
            <svg
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-midnight-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
            <input
                type="search"
                value={query}
                autoFocus={autoFocus}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a film…"
                aria-label="Search films"
                className="w-full rounded-full border border-midnight-600 bg-midnight-900 py-4 pl-14 pr-12 text-base text-white placeholder:text-midnight-300 transition-colors focus:border-sunburst focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
                <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-midnight-300 transition hover:bg-midnight-700 hover:text-sunburst"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
