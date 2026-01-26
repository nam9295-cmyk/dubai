"use client";

import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollProgressRef = useRef(0);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scroll handler - only updates progress variable
        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const scrollableHeight = container.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
            scrollProgressRef.current = progress;

            // Update text visibility state
            if (progress >= 0.8) {
                setShowText(true);
            } else {
                setShowText(false);
            }
        };

        // Initialize
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // iOS Safari needs programmatic play() call
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const attemptPlay = () => {
            video.play().catch(() => {
                // Autoplay blocked, will show poster or first frame
            });
        };

        // Try to play immediately
        attemptPlay();

        // Also try on user interaction (touch)
        const handleInteraction = () => {
            attemptPlay();
            document.removeEventListener('touchstart', handleInteraction);
        };
        document.addEventListener('touchstart', handleInteraction, { once: true });

        return () => {
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh]"
        >
            {/* Sticky video container - with generous padding for breathing room */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 py-8 md:px-12 md:py-16 lg:px-24 lg:py-20">
                <video
                    ref={videoRef}
                    src="/hero-cookie.mp4"
                    muted
                    autoPlay
                    loop
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    className="
            w-full h-auto max-h-[70vh]
            object-contain
            md:max-h-[75vh]
            lg:max-h-[80vh]
          "
                />

                {/* Overlay content - centered with pink border and white text */}
                <div
                    className={`
                        absolute inset-0 mx-auto
                        flex flex-col items-center justify-center
                        max-w-[700px] px-4
                        transition-all duration-700 ease-out
                        ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center tracking-tight px-8 py-5 bg-[#edc5c4] rounded-lg">
                        두바이 쫀득 쿠키
                    </h1>

                    {/* Scroll indicator */}
                    <div className="mt-8 animate-bounce">
                        <svg
                            className="w-6 h-6 text-[#8D6E63]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
