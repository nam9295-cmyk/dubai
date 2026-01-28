"use client";

import { useEffect, useRef, useState } from "react";

export default function StorySection() {
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

    return (
        <section ref={sectionRef} id="story" className="py-24 px-4 bg-[#fffcf8] overflow-hidden relative min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full relative">

                {/* Header Title */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="text-[#d16d72] font-semibold tracking-widest text-sm uppercase block mb-3 font-[family-name:var(--font-song-myung)]">Our History</span>
                    <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-song-myung)] text-[#3e2723]">
                        베리굿이 걸어온 길
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Line - Absolute Center on Desktop, Left on Mobile */}
                    <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3e2723]/0 via-[#3e2723]/30 to-[#3e2723]/0 transform -translate-x-1/2 transition-all duration-1000 delay-300 origin-top ${isVisible ? 'scale-y-100' : 'scale-y-0'}`} />

                    {/* [Season 1] 2024: Text (Left) - Image (Right) */}
                    <div className={`relative mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                        {/* Dot - Centered on Desktop, Left on Mobile */}
                        <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-[#3e2723] border-4 border-[#fffcf8] transform -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-md" />

                        {/* Content: Text (Desktop Left / Mobile 2nd) */}
                        <div className="pl-20 md:pl-0 md:text-right w-full order-2 md:order-1">
                            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#3e2723]/5 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <span className="inline-block px-3 py-1 rounded-full bg-[#3e2723]/10 text-[#3e2723] text-xs font-bold tracking-wider mb-4 font-[family-name:var(--font-song-myung)]">
                                    2024 Heritage
                                </span>
                                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-song-myung)] text-[#3e2723] mb-4 leading-tight">
                                    [Season 1]<br />
                                    2024년 여름, 대한민국 첫 번째<br />
                                    라이브 임팩트
                                </h3>
                                <div className="space-y-4 text-gray-700 leading-relaxed font-sans text-base md:text-lg">
                                    <p>
                                        모두가 완제품을 팔 때, 우리는 국내 최초로 팝업 매장에서 <strong className="text-[#3e2723] bg-[#3e2723]/5 px-1 rounded">'라이브'</strong>로 두바이 초콜릿을 만들었습니다.
                                    </p>
                                    <p>
                                        눈앞에서 펼쳐지는 꾸덕한 피스타치오와 바삭한 카다이프의 향연.
                                    </p>
                                    <p>
                                        수많은 분들이 오픈런으로 증명해주신 그 뜨거운 사랑이 베리굿의 시작이었습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visual: Image (Desktop Right / Mobile 1st) */}
                        <div className="pl-20 md:pl-0 w-full order-1 md:order-2">
                            <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg group">
                                <img
                                    src="/2024_dubai.webp"
                                    alt="2024 Dubai Chocolate Story"
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* [Season 2] 2026: Image (Left) - Text (Right) */}
                    <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                        {/* Dot - Centered on Desktop, Left on Mobile */}
                        <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-[#d16d72] border-4 border-[#fffcf8] transform -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-md animate-pulse" />

                        {/* Visual: Image (Desktop Left / Mobile 1st) */}
                        <div className="pl-20 md:pl-0 w-full order-1 md:order-1">
                            <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg group">
                                <img
                                    src="/2026_dubai.webp"
                                    alt="2026 Sticky Cookie Story"
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Content: Text (Desktop Right / Mobile 2nd) */}
                        <div className="pl-20 md:pl-0 w-full text-left order-2 md:order-2">
                            <div className="bg-gradient-to-br from-white/80 to-[#d16d72]/5 backdrop-blur-sm p-8 rounded-2xl border border-[#d16d72]/10 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                                {/* Decorative blurry blob */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d16d72]/10 rounded-full blur-2xl"></div>

                                <span className="relative inline-block px-3 py-1 rounded-full bg-[#d16d72] text-white text-xs font-bold tracking-wider mb-4 shadow-sm font-[family-name:var(--font-song-myung)]">
                                    2026 Evolution
                                </span>
                                <h3 className="relative text-2xl md:text-3xl font-[family-name:var(--font-song-myung)] text-[#8c3639] mb-4 leading-tight">
                                    [Season 2]<br />
                                    2026년, '두바이 쫀득 쿠키(두쫀쿠)'의 탄생
                                </h3>
                                <div className="time-line-text space-y-4 text-gray-700 leading-relaxed font-sans text-base md:text-lg relative z-10">
                                    <p>
                                        그 압도적인 맛을 더 색다르게, 더 쫀득하게 즐길 수는 없을까?
                                    </p>
                                    <p>
                                        초콜릿의 황홀함에 식감의 재미를 더하기 위한 2년간의 연구.
                                    </p>
                                    <p>
                                        마침내 초콜릿의 풍미는 가두고, 쿠키의 쫀득함 속에 바삭한 카다이프를 완벽하게 만들었습니다.
                                    </p>
                                    <p className="font-medium text-[#8c3639]">
                                        당신이 알던 두바이 초콜릿, 그 이상의 경험. <strong className="text-[#d16d72] underline decoration-[#d16d72]/30 decoration-4 underline-offset-2">'두쫀쿠'</strong>를 시작합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
