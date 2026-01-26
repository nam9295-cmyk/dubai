"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Process", href: "#grind" },
        { label: "Ingredients", href: "#ingredients" },
        { label: "Our Story", href: "#story" },
    ];

    return (
        <header
            className={`
        sticky top-0 z-50 w-full bg-white
        transition-shadow duration-300
        ${isScrolled ? "shadow-sm" : ""}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left: Navigation (Desktop) / Hamburger (Mobile) */}
                <div className="flex items-center gap-6 flex-1">
                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 -ml-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-[#3E2723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-[#5D4037] hover:text-[#3E2723] transition-colors font-medium font-sans"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link href="/" className="block">
                        <img
                            src="/logo.png"
                            alt="Very Good Cookie"
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Right: Pre-order Button */}
                <div className="flex items-center justify-end flex-1">
                    <Link
                        href="#preorder"
                        className="px-4 py-2 bg-[#edc5c4] hover:bg-[#e0b3b2] text-white text-sm font-medium rounded-full transition-colors font-[family-name:var(--font-playfair)]"
                    >
                        Pre-order
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
                    <nav className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-[#5D4037] hover:text-[#3E2723] transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
