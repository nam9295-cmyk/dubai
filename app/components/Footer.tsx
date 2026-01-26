"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#e4d0cf] py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className={`md:col-span-1 space-y-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0ms' }}>
                        <h3 className="text-xl font-bold text-[#4a3b32] font-[family-name:var(--font-playfair)]">Very Good Chocolate</h3>
                        <p className="text-[#5d4037]/80 text-sm leading-relaxed font-sans">
                            Bringing the viral sensation<br />
                            from Dubai straight to you.<br />
                            Made with love and ingredients.
                        </p>
                    </div>

                    {/* Menu */}
                    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
                        <h4 className="font-bold text-[#4a3b32] mb-4 text-sm tracking-widest uppercase">MENU</h4>
                        <ul className="space-y-3 text-[#5d4037]/80 text-sm font-sans">
                            <li><a href="#" className="hover:text-[#4a3b32] transition-colors">Home</a></li>
                            <li><a href="#ingredients" className="hover:text-[#4a3b32] transition-colors">Products</a></li>
                            <li><a href="#story" className="hover:text-[#4a3b32] transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-[#4a3b32] transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Follow */}
                    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
                        <h4 className="font-bold text-[#4a3b32] mb-4 text-sm tracking-widest uppercase">FOLLOW</h4>
                        <ul className="space-y-3 text-[#5d4037]/80 text-sm font-sans">
                            <li><a href="#" className="hover:text-[#4a3b32] transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-[#4a3b32] transition-colors">TikTok</a></li>
                            <li><a href="#" className="hover:text-[#4a3b32] transition-colors">YouTube</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                        <h4 className="font-bold text-[#4a3b32] mb-4 text-sm tracking-widest uppercase">CONTACT</h4>
                        <ul className="space-y-3 text-[#5d4037]/80 text-sm font-sans">
                            <li>hello@verygoodchocolate.com</li>
                            <li>Instagram DM</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    className={`border-t border-[#5d4037]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '400ms' }}
                >
                    <p className="text-[#5d4037]/60 text-sm font-sans">
                        © 2025 Very Good Chocolate. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-[#5d4037]/60 text-sm font-sans">
                        <a href="#" className="hover:text-[#4a3b32] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#4a3b32] transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
