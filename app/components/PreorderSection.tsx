"use client";

import { useState, useEffect, useRef } from "react";

// 2026년 2월 3일 오전 10:00 (KST 기준 가정)
const TARGET_DATE = new Date("2026-02-03T10:00:00");

export default function PreorderSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // 카운트다운 상태
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

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

    // 타이머 로직
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +TARGET_DATE - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={sectionRef} id="preorder" className="py-32 px-4 bg-[#F9F8F6]">
            <div className="max-w-4xl mx-auto text-center">

                {/* Header Text */}
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-4xl md:text-6xl font-serif text-[#3E2723] mb-6 font-[family-name:var(--font-song-myung)] tracking-tight">
                        2월 3일, 주문 시작
                    </h2>
                    <p className="text-[#5d4037] text-lg md:text-xl font-sans leading-relaxed">
                        현재 주문 폭주를 대비해 마지막 물량을 확보 중입니다.<br className="hidden md:block" />
                        조금만 기다려주시면 최고의 두바이 쫀득 쿠키로 보답하겠습니다.
                    </p>
                </div>

                {/* Countdown Card */}
                <div className={`mt-16 bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-[#efebe9] transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                    <div className="grid grid-cols-4 gap-4 md:gap-8 justify-center text-[#3E2723] mb-12">
                        {/* Days */}
                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tighter">
                                {String(timeLeft.days).padStart(2, '0')}
                            </span>
                            <span className="text-sm md:text-base text-[#edc5c4] font-bold tracking-widest uppercase mt-4">
                                Days
                            </span>
                        </div>

                        {/* Hours */}
                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tighter">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                            <span className="text-sm md:text-base text-[#edc5c4] font-bold tracking-widest uppercase mt-4">
                                Hours
                            </span>
                        </div>

                        {/* Minutes */}
                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tighter">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                            <span className="text-sm md:text-base text-[#edc5c4] font-bold tracking-widest uppercase mt-4">
                                Mins
                            </span>
                        </div>

                        {/* Seconds */}
                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tighter text-[#d16d72]">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                            <span className="text-sm md:text-base text-[#d16d72] font-bold tracking-widest uppercase mt-4">
                                Secs
                            </span>
                        </div>
                    </div>

                    {/* Disabled Button */}
                    <button
                        disabled
                        className="w-full md:w-auto px-12 py-5 bg-gray-200 text-gray-500 text-lg md:text-xl font-bold rounded-full cursor-not-allowed transition-all shadow-inner"
                    >
                        2026. 02. 03 (월) 10:00 OPEN
                    </button>

                </div>
            </div>
        </section>
    );
}
