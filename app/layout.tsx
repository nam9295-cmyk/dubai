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
  metadataBase: new URL("https://dubai.verygood-chocolate.com"),
  title: "베리굿초콜릿 - 두바이 말고 '두쫀쿠'!",
  description: "줄 서서 먹는 그 맛, 드디어 온라인 상륙! 지금 댓글 남기면 '토니쿠키'를 드려요. 🍪",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "베리굿초콜릿 - 두바이 말고 '두쫀쿠'!",
    description: "지금 댓글 남기고 주문하면 한정판 '토니쿠키' 증정! 🍪 품절되기 전에 확인하세요.",
    url: "https://dubai.verygood-chocolate.com",
    siteName: "Very Good Chocolate",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "베리굿초콜릿 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
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
