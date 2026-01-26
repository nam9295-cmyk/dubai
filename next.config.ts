import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 이 부분이 핵심이야! (정적 파일로 내보내기 & 이미지 최적화 끄기)
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;