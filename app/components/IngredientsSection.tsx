"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// React Icons
import { GiChocolateBar, GiWheat, GiPeanut } from "react-icons/gi";
import { LuFlame } from "react-icons/lu";

export default function IngredientsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Icon style preset
    const iconClass = "w-12 h-12 text-[#edc5c4]"; // Accent pink or gold tone

    const ingredients = [
        {
            icon: <GiChocolateBar className={iconClass} />,
            title: "Belgian Origin",
            description: "벨기에산 프리미엄 초콜릿이 주는 깊고 진한 풍미.",
        },
        {
            icon: <GiWheat className={iconClass} />,
            title: "Fresh Kadayif",
            description: "중동의 전통 카다이프를 버터에 볶아 만들어낸, 씹을 때마다 터지는 바삭한 식감.",
        },
        {
            icon: <GiPeanut className={iconClass} />,
            title: "100% Pistachio",
            description: "피스타치오 원물 그대로 갈아 만든, 꾸덕하고 고소한 피스타치오 페이스트.",
        },
        {
            // 4번째 카드는 이미지를 사용
            imageSrc: "/le-cordon-bleu.svg",
            title: "Le Cordon Bleu",
            description: "세계적인 프랑스 요리 학교 르 꼬르동 블루 출신의 노하우로 완성한, 섬세하고 깊이 있는 맛의 차이.",
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="ingredients"
            className="relative -mt-32 z-50 pb-24 px-4 bg-transparent pointer-events-none"
        >
            <div className="max-w-7xl mx-auto pointer-events-auto relative">

                {/* Glassmorphism Cards - Slider on Mobile, Grid on Desktop */}
                <div
                    className="flex overflow-x-auto snap-x snap-proximity lg:grid lg:grid-cols-4 gap-6 pb-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 touch-pan-x"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch' // iOS smooth scrolling
                    }}
                >
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {ingredients.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-auto snap-center
                                overflow-hidden relative
                                bg-black/60 backdrop-blur-md
                                border border-white/10
                                rounded-[32px] p-10
                                shadow-2xl
                                hover:bg-black/70 hover:-translate-y-2
                                transition-all duration-500
                                text-left
                                cursor-default
                                group
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                            `}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Inner Glow Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                            {/* Icon Wrapper */}
                            <div className="mb-6 relative z-10 p-3 bg-white/5 rounded-2xl w-fit backdrop-blur-sm border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                {item.imageSrc ? (
                                    <div className="relative h-12 w-auto flex items-center justify-center">
                                        {/* 이미지 렌더링: width/height 비율 유지 */}
                                        <img
                                            src={item.imageSrc}
                                            alt={item.title + " Mark"}
                                            className="h-12 w-auto object-contain"
                                        />
                                    </div>
                                ) : (
                                    item.icon
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10 tracking-wide font-[family-name:var(--font-playfair)]">
                                {item.title}
                            </h3>

                            <p className="text-white/80 text-base leading-relaxed relative z-10 font-sans break-keep">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
