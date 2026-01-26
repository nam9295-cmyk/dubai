"use client";

import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollProgressRef = useRef(0);
    const [showText, setShowText] = useState(false);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

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

        // Render loop - updates video time based on progress
        const renderLoop = () => {
            const video = videoRef.current;
            if (video && video.duration && !video.seeking) {
                const targetTime = scrollProgressRef.current * video.duration;
                // Only update if difference is significant
                if (Math.abs(video.currentTime - targetTime) > 0.05) {
                    video.currentTime = targetTime;
                }
            }
            rafIdRef.current = requestAnimationFrame(renderLoop);
        };

        // Initialize
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial calculation
        rafIdRef.current = requestAnimationFrame(renderLoop);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
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
                    playsInline
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
