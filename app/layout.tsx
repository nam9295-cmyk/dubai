import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Song_Myung, Gamja_Flower } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const songMyung = Song_Myung({
  variable: "--font-song-myung",
  weight: ["400"],
  display: "swap",
});

const gamjaFlower = Gamja_Flower({
  variable: "--font-gamja",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dubai Stretchy Cookie | Very Good Cookie",
  description: "두바이에서 온 쫀득한 쿠키의 비밀을 경험하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${songMyung.variable} ${gamjaFlower.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
