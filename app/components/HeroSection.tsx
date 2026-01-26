"use client";

import { useRef, useEffect, useState } from "react";

// 비디오 소스 URL 정의
const DESKTOP_VIDEO_URL = "https://github.com/nam9295-cmyk/asset/raw/refs/heads/main/hero-cookie.mp4";
const MOBILE_VIDEO_URL = "https://github.com/nam9295-cmyk/asset/raw/refs/heads/main/hero-cookie-mobile.mp4";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showText, setShowText] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 화면 크기 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 비디오 소스 변경 시 로드
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const videoUrl = isMobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL;
        if (video.src !== videoUrl) {
            video.src = videoUrl;
            video.load();
        }
    }, [isMobile]);

    // 스크롤 기반 영상 제어
    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        let targetTime = 0;
        let animationId: number | null = null;

        const updateTargetTime = () => {
            const maxScroll = container.offsetHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            let scrollProgress = currentScroll / maxScroll;

            if (scrollProgress < 0) scrollProgress = 0;
            if (scrollProgress > 1) scrollProgress = 1;

            if (video.duration) {
                targetTime = scrollProgress * video.duration;
            }

            // Update text visibility state
            if (scrollProgress >= 0.8) {
                setShowText(true);
            } else {
                setShowText(false);
            }
        };

        // 부드러운 보간 방식으로 영상 시간 업데이트 (모바일 호환성 향상)
        const renderLoop = () => {
            if (video.readyState >= 2 && !video.seeking) {
                const diff = targetTime - video.currentTime;
                if (Math.abs(diff) > 0.01) {
                    video.currentTime += diff * 0.1;
                }
            }
            animationId = requestAnimationFrame(renderLoop);
        };

        const handleScroll = () => {
            updateTargetTime();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        animationId = requestAnimationFrame(renderLoop);
        updateTargetTime();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isMobile]);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh]"
        >
            {/* Sticky video container - with generous padding for breathing room */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 py-8 md:px-12 md:py-16 lg:px-24 lg:py-20">
                <video
                    ref={videoRef}
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
