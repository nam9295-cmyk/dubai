"use client";

import { useEffect, useRef, useState } from "react";
// Removed React Icons imports as we are switching to images

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
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const ingredients = [
        {
            imageSrc: "/pistachio.webp",
            title: "100% 수제 피스타치오 페이스트",
            description: "시판 페이스트? 절대 안 씁니다. 최상급 원물을 매장에서 직접 갈아 만든 100% 수제 페이스트. 인위적인 단맛 대신, 피스타치오 본연의 묵직하고 고소한 풍미가 쿠키를 가득 채웁니다.",
        },
        {
            imageSrc: "/kadayif.webp",
            title: "버터에 볶은 바삭한 카다이프",
            description: "튀르키예 전통 카다이프면을 버터에 노릇하게 볶아냈습니다. 부드러운 쿠키를 베어 무는 순간, '와삭'하고 부서지며 식감의 클라이맥스를 선사합니다. 쫀득함 속에 숨겨진 반전 식감!",
        },
        {
            imageSrc: "/lecordon.webp",
            title: "르 꼬르동 블루의 터치",
            description: "프랑스 요리 학교 출신 쇼콜라티에의 섬세한 배합. 발로나 초콜릿과 독자적인 반죽 비율로, 너무 달지 않으면서도 깊은 여운을 남기는 맛을 완성했습니다. 요리가 된 디저트.",
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="ingredients"
            className="relative py-24 px-4 bg-[#fffcf8]"
        >
            <div className="max-w-7xl mx-auto">
                {/* Scroll container: Slider on Mobile (flex), Grid on Desktop */}
                <div
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 -mx-4 pb-4 md:pb-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:mx-0 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {ingredients.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                flex-shrink-0 w-[85vw] snap-center md:w-auto
                                relative overflow-visible
                                bg-white
                                rounded-3xl
                                shadow-lg hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all duration-500 ease-out
                                group
                                border border-[#3e2723]/5
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                            `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Restored Image */}
                            <img
                                src={item.imageSrc}
                                alt={item.title}
                                className="w-full h-[200px] object-cover rounded-t-2xl"
                            />

                            {/* Content Area */}
                            <div className="p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-[#3e2723] mb-2 font-[family-name:var(--font-song-myung)]">
                                    {item.title}
                                </h3>



                                <p className="text-gray-600 text-base leading-relaxed font-sans break-keep">
                                    {item.description}
                                </p>
                            </div>

                            {/* Decorative Corner Blob */}
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#d16d72]/5 rounded-full blur-xl group-hover:bg-[#d16d72]/10 transition-colors duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
