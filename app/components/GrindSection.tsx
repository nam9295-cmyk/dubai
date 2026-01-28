"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function GrindSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-12 bg-[#f7f7f7]">
            <div className="max-w-7xl mx-auto px-4 h-[80vh]">
                {/* Image Container with Ken Burns Effect */}
                <div
                    className={`w-full h-full rounded-[48px] overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="w-full h-full animate-ken-burns relative bg-gray-100 flex items-center justify-center">
                        {/* Images removed as requested */}
                        <span className="text-gray-400">Image Removed</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
