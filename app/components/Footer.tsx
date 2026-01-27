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
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className={`md:col-span-1 space-y-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0ms' }}>
                        <img src="/logo.png" alt="Very Good Cookie" className="h-8 w-auto mb-4" />
                        <p className="text-stone-600/80 text-sm leading-relaxed font-sans">
                            오늘 당신은 어떤 마음을 건네고 싶나요?<br />
                            그 마음을 오래 남게 하는 방법을 우리는 카카오에서 찾았습니다.<br />
                            삶에는 초콜릿이 필요한 순간들이 있습니다.<br />
                            우리는 초콜릿을 만들지만, 사실은 순간을 빚습니다.<br />
                            <strong className="font-bold">초콜릿이 생각날 땐 베리굿!</strong>
                        </p>
                    </div>

                    {/* Menu */}
                    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
                        <h4 className="font-bold text-[#4a3b32] mb-4 text-sm tracking-widest uppercase">MENU</h4>
                        <ul className="space-y-3 text-[#5d4037]/80 text-sm font-sans">
                            <li><a href="/" className="hover:text-[#4a3b32] transition-colors">Home</a></li>
                            <li><a href="https://verygood-chocolate.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4a3b32] transition-colors">Global Homepage</a></li>
                            <li><a href="https://kr.verygood-chocolate.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4a3b32] transition-colors">Official KR</a></li>
                            <li><a href="https://smartstore.naver.com/verygout" target="_blank" rel="noopener noreferrer" className="hover:text-[#4a3b32] transition-colors">스마트스토어</a></li>
                            <li><a href="#" className="hover:text-[#4a3b32] transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
                        <h4 className="font-bold text-[#4a3b32] mb-4 text-sm tracking-widest uppercase">CONTACT</h4>
                        <ul className="space-y-3 text-[#5d4037]/80 text-sm font-sans">
                            <li>
                                <a href="mailto:verygoutchocolate@gmail.com" className="hover:text-[#4a3b32] transition-colors">
                                    verygoutchocolate@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/verygood_chocolate" target="_blank" rel="noopener noreferrer" className="hover:text-[#4a3b32] transition-colors">
                                    @verygood_chocolate
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Legal Info Section */}
                <div
                    className={`border-t border-[#5d4037]/10 pt-8 text-center md:text-left transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '400ms' }}
                >
                    {/* Line 1: Terms */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-xs font-bold text-stone-600">
                        <a href="#" className="hover:text-[#4a3b32] transition-colors">이용약관</a>
                        <span className="text-stone-300">|</span>
                        <a href="#" className="hover:text-[#4a3b32] transition-colors">개인정보처리방침</a>
                    </div>

                    {/* Line 2: Business Info */}
                    <div className="text-[10px] md:text-xs text-stone-500 leading-relaxed font-sans space-y-1 md:space-y-0">
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1">
                            <span>상호명: 주식회사 베리굿 (Very Good Co., Ltd.)</span>
                            <span className="hidden md:inline text-stone-300">|</span>
                            <span>대표: 천정민</span>
                            <span className="hidden md:inline text-stone-300">|</span>
                            <span>사업자등록번호: 850-81-02950</span>
                            <span className="hidden md:inline text-stone-300">|</span>
                            <span>통신판매업신고: 2023-대구달서-1940</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1">
                            <span>전화: 070-7840-0717</span>
                            <span className="hidden md:inline text-stone-300">|</span>
                            <span>주소: 대구광역시 수성구 상록로11길 13 1층</span>
                            <span className="hidden md:inline text-stone-300">|</span>
                            <span>개인정보보호책임자: 천정민</span>
                        </div>
                    </div>

                    {/* Line 3: Copyright */}
                    <div className="mt-6 text-[10px] text-stone-400 font-sans">
                        Copyright © 2026 Very Good Chocolate. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
