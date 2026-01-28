"use client";

import { useState, useEffect, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp, QuerySnapshot, DocumentData } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Reply {
    id: string;
    name: string;
    message: string;
    createdAt: Timestamp | null;
}

// 🎨 Graffiti Presets: Pre-defined chaotic styles
// Randomness is deterministic based on index to avoid hydration mismatch
const STYLES = [
    { rotate: "rotate-[-2deg]", rotateVal: -2, bg: "bg-yellow-50", text: "text-gray-800", translate: "translate-y-2", z: "z-0" },
    { rotate: "rotate-[3deg]", rotateVal: 3, bg: "bg-blue-50", text: "text-indigo-900", translate: "-translate-x-1", z: "z-10" },
    { rotate: "rotate-[1deg]", rotateVal: 1, bg: "bg-red-50", text: "text-red-900", translate: "translate-y-[-5px]", z: "z-0" },
    { rotate: "rotate-[-3deg]", rotateVal: -3, bg: "bg-green-50", text: "text-green-900", translate: "translate-x-2", z: "z-0" },
    { rotate: "rotate-[4deg]", rotateVal: 4, bg: "bg-purple-50", text: "text-purple-900", translate: "translate-y-1", z: "z-20" },
    { rotate: "rotate-[-1deg]", rotateVal: -1, bg: "bg-orange-50", text: "text-orange-900", translate: "-translate-y-2", z: "z-0" },
    { rotate: "rotate-[2deg]", rotateVal: 2, bg: "bg-pink-50", text: "text-pink-900", translate: "translate-x-1", z: "z-10" },
    { rotate: "rotate-[-4deg]", rotateVal: -4, bg: "bg-white", text: "text-gray-900", translate: "translate-y-3", z: "z-0" },
    { rotate: "rotate-[5deg]", rotateVal: 5, bg: "bg-gray-100", text: "text-gray-800", translate: "translate-x-[-5px]", z: "z-30" },
    { rotate: "rotate-[-5deg]", rotateVal: -5, bg: "bg-amber-50", text: "text-amber-900", translate: "translate-y-[-2px]", z: "z-0" },
];

export default function WaitingSection() {
    const [replies, setReplies] = useState<Reply[]>([]);
    const [name, setName] = useState("");
    const [phoneLast4, setPhoneLast4] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Real-time listener
    useEffect(() => {
        const q = query(collection(db, "dubai-reply"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Reply[];
            setReplies(msgs);
        }, (error) => {
            console.error("Snapshot error:", error);
            // Common error: Missing permissions
            if (error.code === 'permission-denied') {
                console.error("Firestore 권한 오류: Firebase Console에서 Rules를 확인해주세요.");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Debugging Start
        // Removed validation alerts/logs

        setError(null);
        setSuccessMessage(null);

        // Debug: Check if config is loaded
        if (!db) {
            console.error("Firebase DB not initialized");
            setError("잠시 후 다시 시도해주세요.");
            return;
        }

        // Validation
        if (!name.trim() || !message.trim()) {
            setError("내용을 입력해주세요!");
            return;
        }
        if (!/^\d{4}$/.test(phoneLast4)) {
            setError("휴대폰 뒷번호 4자리를 입력해주세요.");
            return;
        }

        // Spam Protection (1 minute cooldown)
        const lastSubmitted = localStorage.getItem("last_submitted_time");
        if (lastSubmitted) {
            const timeDiff = Date.now() - parseInt(lastSubmitted, 10);
            if (timeDiff < 60000) {
                setError("잠시 후 다시 시도해주세요.");
                return;
            }
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "dubai-reply"), {
                name,
                phoneLast4,
                message,
                createdAt: serverTimestamp()
            });

            setSuccessMessage("소중한 마음이 전달되었어요! �");

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(null), 3000);

            localStorage.setItem("last_submitted_time", Date.now().toString());
            setName("");
            setPhoneLast4("");
            setMessage("");
        } catch (err: any) {
            console.error("Write error:", err);
            setError("잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 bg-[#F5F5F3] overflow-hidden min-h-screen font-sans border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4">

                {/* 1. Header & Banner */}
                {/* 1. Header & Banner */}
                {/* 1. Header & Banner */}
                <div className="text-center mb-12 md:mb-28 relative flex flex-col items-center">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 -z-10 hidden md:block"></div>
                    <span className="bg-[#F5F5F3] px-6 text-4xl md:text-6xl font-black uppercase italic tracking-tighter transform -rotate-2 inline-block text-black z-10 relative">
                        Graffiti Wall
                    </span>

                    {/* Polaroid Image */}
                    <div className="relative md:absolute md:right-[17%] md:-top-16 transform -rotate-[-10deg] transition-transform hover:rotate-0 hover:scale-105 z-[60] mt-8 md:mt-0">
                        <div className="p-3 bg-white shadow-xl rotate-3">
                            <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
                                <Image
                                    src="/tony-cookie.webp"
                                    alt="Tony Cookie"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-center font-[family-name:var(--font-gamja)] text-2xl mt-2 text-gray-800 tracking-wide">For You</p>
                        </div>
                    </div>
                </div>

                {/* 2. Compact Input Bar (The Compact Bar) */}
                <div className="sticky top-6 z-50 mb-16 mx-auto max-w-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white border-2 border-black p-2 rounded-xl transform hover:-translate-y-1 transition-transform">
                    <p className="text-center text-sm text-gray-500 mb-2 font-medium">
                        주문 확인용 <span className="font-bold text-black">휴대폰 뒷번호</span>를 남기면 <span className="font-bold text-black">[토니쿠키]</span> 증정! 🍪
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">

                        {/* Name Input */}
                        <div className="w-full md:w-32 flex-shrink-0">
                            <input
                                type="text"
                                name="nickname"
                                id="input-nickname"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="닉네임"
                                maxLength={8}
                                className="w-full h-12 px-4 bg-gray-100 border-2 border-transparent focus:border-black focus:bg-white rounded-lg outline-none font-bold text-black placeholder-gray-400 transition-colors text-center"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="w-full md:w-24 flex-shrink-0">
                            <input
                                type="tel"
                                inputMode="numeric"
                                name="phone"
                                id="input-phone"
                                value={phoneLast4}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^0-9]/g, "");
                                    if (val.length <= 4) setPhoneLast4(val);
                                }}
                                placeholder="뒷번호"
                                maxLength={4}
                                className="w-full h-12 px-4 bg-gray-100 border-2 border-transparent focus:border-black focus:bg-white rounded-lg outline-none font-mono font-bold text-black placeholder-gray-400 transition-colors text-center"
                            />
                        </div>

                        {/* Message Input (Flex Grow) */}
                        <div className="flex-grow">
                            <input
                                type="text"
                                name="message"
                                id="input-message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="자유롭게 낙서를 남겨보세요! (최대 50자)"
                                maxLength={50}
                                className="w-full h-12 px-4 bg-gray-100 border-2 border-transparent focus:border-black focus:bg-white rounded-lg outline-none font-medium text-black placeholder-gray-400 transition-colors"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-16 h-12 bg-black text-white hover:bg-[#FFC107] hover:text-black font-bold rounded-lg transition-colors flex items-center justify-center text-xl shadow-md active:shadow-none active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "..." : "✏️"}
                        </button>
                    </form>
                    {error && <p className="text-red-500 font-bold text-xs mt-2 text-center">{error}</p>}
                    {successMessage && <p className="text-blue-600 font-bold text-xs mt-2 text-center">{successMessage}</p>}
                </div>

                {/* 3. The Controlled Chaos Wall (Data Display) */}
                {/* 3. The Controlled Chaos Wall (Data Display) */}
                <div className="relative p-4 md:p-10 border-4 border-dashed border-gray-300 rounded-[2rem] bg-white/50 overflow-hidden">

                    {/* Background Text Texture */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                        <span className="text-[20vw] font-black leading-none text-center">
                            STICKY<br />COOKIE
                        </span>
                    </div>

                    {/* Scrollable Container */}
                    <div className="h-[500px] md:h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden relative px-2">
                        {/* List Items Layout: Mobile Stack (Overlapping) / Desktop Wrap */}
                        <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:content-start md:items-start -space-y-6 md:space-y-0 md:gap-8 pt-8 pb-40">
                            <AnimatePresence initial={false}>
                                {replies.map((reply, index) => {
                                    // Deterministic Chaos
                                    const style = STYLES[index % STYLES.length];

                                    return (
                                        <motion.div
                                            key={reply.id}
                                            initial={{ scale: 0, rotate: 10, y: 50, opacity: 0 }}
                                            animate={{ scale: 1, rotate: style.rotateVal, y: 0, opacity: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 15,
                                                delay: index < 5 ? index * 0.1 : 0 // Stagger initial load only
                                            }}
                                            className={`relative group cursor-default max-w-[200px] md:max-w-[240px] w-full`}
                                            style={{
                                                zIndex: index // Stack formatting context for overlap
                                            }}
                                        >
                                            <div className={`p-5 shadow-lg ${style.bg} ${style.rotate} ${style.translate} transition-transform duration-300 hover:scale-110 hover:z-50 hover:shadow-2xl hover:rotate-0 border border-black/5 relative`}>

                                                {/* Tape Effect */}
                                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white/40 rotate-[2deg] backdrop-blur-sm shadow-sm border border-white/20"></div>

                                                <div className={`font-[family-name:var(--font-gamja)] ${style.text} leading-tight`}>
                                                    <p className="text-2xl mb-3 break-words font-medium">
                                                        {reply.message}
                                                    </p>
                                                    <div className="flex justify-between items-end border-t border-black/10 pt-2 mt-2">
                                                        <span className="font-bold text-base opacity-80">@{reply.name}</span>
                                                        <span className="text-[10px] font-sans opacity-40 font-bold uppercase tracking-wider">
                                                            {reply.createdAt?.toDate ? formatDistanceToNow(reply.createdAt.toDate(), { addSuffix: true, locale: ko }) : 'NOW'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {replies.length === 0 && !loading && (
                                <div className="w-full text-center py-20 opacity-30">
                                    <h3 className="text-4xl font-black text-gray-400">BE THE FIRST</h3>
                                    <p className="text-xl">첫 낙서를 남겨주세요!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Gradient Fade-Out Mask */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5F5F3] via-[#F5F5F3]/80 to-transparent pointer-events-none z-50" />
                </div>

            </div>
        </section>
    );
}
