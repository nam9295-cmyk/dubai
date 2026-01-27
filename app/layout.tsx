import type { Metadata } from "next";
import Script from "next/script";
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
  title: "베리굿초콜릿 - 두바이 말고 '두쫀쿠'! (대구 핫플)",
  description: "줄 서서 먹는 두바이 초콜릿의 재해석! 쫀득한 식감의 '두쫀쿠'를 만나보세요. 지금 주문하면 토니쿠키 증정! 🍪",
  keywords: [
    "두바이초콜릿",
    "두바이쫀득쿠키",
    "대구두바이초콜릿",
    "베리굿초콜릿",
    "두쫀쿠",
    "대구디저트맛집",
    "발렌타인데이선물",
    "답례품추천"
  ],
  authors: [{ name: "Very Good Chocolate", url: "https://dubai.verygood-chocolate.com" }],
  creator: "Very Good Chocolate",
  publisher: "Very Good Chocolate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://dubai.verygood-chocolate.com",
  },
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
  verification: {
    other: {
      "naver-site-verification": "ed9c579e770980b10060221e831a5db530255908",
    },
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BTTZ4TS95S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BTTZ4TS95S');
          `}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DessertShop",
              "name": "베리굿초콜릿 (Very Good Chocolate)",
              "image": "https://dubai.verygood-chocolate.com/og-image.jpg",
              "description": "대구 수성구에 위치한 프리미엄 수제 초콜릿 & 두바이 스타일 쿠키 전문점",
              "url": "https://dubai.verygood-chocolate.com",
              "telephone": "070-7840-0717",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "수성구 상록로11길 13, 1층",
                "addressLocality": "Daegu",
                "postalCode": "42019",
                "addressCountry": "KR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 35.8595,
                "longitude": 128.6247
              },
              "priceRange": "$$",
              "opens": "10:00",
              "closes": "20:00",
              "sameAs": [
                "https://www.instagram.com/verygood_chocolate",
                "https://smartstore.naver.com/verygood"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
