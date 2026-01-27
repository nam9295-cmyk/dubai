"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { LuGlobe, LuMonitor, LuShoppingBag } from "react-icons/lu";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const socialLinks = [
        {
            title: "Global Official",
            label: "Global",
            url: "https://verygood-chocolate.com",
            icon: <LuGlobe className="w-4 h-4" />,
            type: "ghost",
        },
        {
            title: "Korea Official",
            label: "한국 공식홈",
            url: "https://kr.verygood-chocolate.com",
            icon: <LuMonitor className="w-4 h-4" />,
            type: "ghost",
        },
        {
            title: "Smart Store",
            label: "스마트스토어",
            url: "https://smartstore.naver.com/verygout",
            icon: <LuShoppingBag className="w-4 h-4" />,
            type: "cta",
        },
    ];

    return (
        <header
            className={`
        sticky top-0 z-50 w-full bg-white
        transition-shadow duration-300
        ${isScrolled ? "shadow-sm" : ""}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
                {/* Left: Mobile Navigation (Global & Korea) */}
                <div className="flex-1 flex items-center justify-start gap-2 md:hidden">
                    {socialLinks
                        .filter((link) => link.title !== "Smart Store")
                        .map((link) => (
                            <a
                                key={link.title}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 text-[#5D4037] hover:bg-gray-100/80 hover:text-[#3E2723]"
                                title={link.title}
                                aria-label={link.title}
                            >
                                {link.icon}
                            </a>
                        ))}
                </div>
                {/* Desktop Left Placeholder */}
                <div className="hidden md:flex flex-1 items-center justify-start"></div>

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

                {/* Right: Pill Buttons */}
                <div className="flex-1 flex items-center justify-end gap-2 md:gap-3">
                    {socialLinks.map((link) => {
                        const isCta = link.type === "cta";
                        // Base styles for all pill buttons
                        const baseStyles =
                            "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all duration-200";

                        // Type-specific styles
                        const typeStyles = isCta
                            ? "bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100 hover:scale-105 hover:shadow-sm" // Soft Filled CTA
                            : "text-[#5D4037] hover:bg-gray-100/80 hover:text-[#3E2723]"; // Ghost

                        // Visibility logic:
                        // Smart Store (CTA): Always visible (block)
                        // Others: Hidden on mobile, valid on desktop (hidden md:flex)
                        const visibilityClass = isCta ? "flex" : "hidden md:flex";

                        return (
                            <a
                                key={link.title}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${baseStyles} ${typeStyles} ${visibilityClass}`}
                                title={link.title}
                                aria-label={link.title}
                            >
                                {link.icon}
                                {/* Text visibility: CTA always shows text, Ghost hides on mobile (but here ghost is hidden on mobile entirely by parent logic usually, but consistent with desktop view) */}
                                <span className={isCta ? "" : "hidden md:inline"}>
                                    {link.label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
