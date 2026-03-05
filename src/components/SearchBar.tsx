'use client';

import { useRef, useEffect } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isLoading?: boolean;
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Buscar repuesto, marca o modelo...',
    isLoading = false,
}: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus en desktop
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        if (mq.matches) inputRef.current?.focus();
    }, []);

    return (
        <div className="search-wrapper" role="search">
            <div className="search-inner">
                {/* Search icon */}
                <div className="search-icon" aria-hidden="true">
                    {isLoading ? (
                        <svg
                            className="w-5 h-5 animate-spin text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    )}
                </div>

                {/* Input */}
                <input
                    ref={inputRef}
                    id="search-input"
                    type="search"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="search-input"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Buscar repuestos"
                />

                {/* Clear button */}
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="search-clear"
                        aria-label="Limpiar búsqueda"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
