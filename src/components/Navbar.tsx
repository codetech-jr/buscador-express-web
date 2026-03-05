'use client';

import { useState, useEffect } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <a href="/" className="navbar-logo">
                    <span className="text-accent-green text-xl">⚙️</span>
                    <span className="font-bold tracking-tight">
                        Repuestos <span className="text-accent-blue">Luigi</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="navbar-links hidden md:flex">
                    <a href="#" className="navbar-link">Catálogo</a>
                    <a href="#" className="navbar-link">Kits & Combos</a>
                    <a href="#" className="navbar-link">Ubicación</a>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '584120000000'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-btn"
                    >
                        Contacto
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-text-primary p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden navbar-mobile-menu">
                    <a href="#" className="navbar-mobile-link">Catálogo</a>
                    <a href="#" className="navbar-mobile-link">Kits & Combos</a>
                    <a href="#" className="navbar-mobile-link">Ubicación</a>
                    <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '584120000000'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-mobile-btn"
                    >
                        Contacto
                    </a>
                </div>
            )}
        </nav>
    );
}
