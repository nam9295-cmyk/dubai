"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="story" className="py-24 px-4 bg-[#fffcf8] overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Block A: The Motivation */}
                <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-16 lg:gap-x-24 items-center text-left">
                    {/* Visual - Left (5 columns approx 41%) */}
                    <div className={`col-span-12 md:col-span-5 relative aspect-[4/5] md:aspect-square order-1 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative rotate-1 hover:rotate-0 transition-transform duration-700">
                            <Image
                                src="/story-family.webp"
                                alt="Mother and child sharing a moment"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            {/* Sentiment Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Text - Right (7 columns) */}
                    <div className={`col-span-12 md:col-span-7 md:pl-8 order-2 space-y-8 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div>
                            <span className="text-gray-400 font-medium tracking-widest text-xs uppercase block mb-3">The Motivation</span>
                            <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-song-myung)] font-serif text-[#3e2723] leading-tight tracking-tight mb-6">
                                유행을 쫓지 않았습니다.<br />
                                <span className="block mt-2">사랑을 쫓았을 뿐.</span>
                            </h3>
                        </div>
                        <div className="space-y-6 text-gray-800 text-lg leading-loose tracking-tight font-sans">
                            <p>
                                2025년, 3개월을 앓아누우며 다짐했습니다. 다시는 유행에 흔들리지 않겠다고.
                            </p>
                            <p>
                                하지만 {"'"}엄마...{"'"} 하고 부르는 윤이의 귓속말 한마디에 다시 앞치마를 맸습니다.
                            </p>
                            <p>
                                가장 사랑하는 내 아이에게 먹일 것이기에, <strong className="text-[#d16d72] font-bold">베리굿은 타협할 수 없었습니다.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Block B: The Quality */}
                <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-16 lg:gap-x-24 items-center text-left">
                    {/* Text - Left (7 columns) */}
                    <div className={`col-span-12 md:col-span-7 md:pr-8 order-2 md:order-1 space-y-8 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div>
                            <span className="text-gray-400 font-medium tracking-widest text-xs uppercase block mb-3">The Quality</span>
                            <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-song-myung)] font-serif text-[#3e2723] leading-tight tracking-tight mb-6">
                                시판 페이스트?<br />
                                <span className="block mt-2">절대 안 씁니다.</span>
                            </h3>
                        </div>
                        <div className="space-y-6 text-gray-800 text-lg leading-loose tracking-tight font-sans">
                            <p>
                                두바이 초콜릿 속을 직접 만들어 본 사람은 압니다.
                                시판 제품에는 갓 볶은 피스타치오의 그 고소한 향기가 없다는 것을요.
                            </p>
                            <p>
                                피스타치오를 수입하고 껍질을 까느라 밤을 새워도 괜찮습니다.
                            </p>
                            <p>
                                누가 모르더라도, <strong className="text-[#d16d72] font-bold">만드는 제가 아니까요.</strong> 이게 진짜 {"'"}베리굿{"'"}이니까요.
                            </p>
                        </div>
                    </div>

                    {/* Visual - Right (5 columns) */}
                    <div className={`col-span-12 md:col-span-5 relative aspect-[4/5] md:aspect-square order-1 md:order-2 transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative -rotate-1 hover:rotate-0 transition-transform duration-700">
                            <Image
                                src="/story-ingredients.webp"
                                alt="Premium Pistachio and Chocolate Ingredients"
                                fill
                                className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#edc5c4]/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>

            </div>
        </section>
    );
}
