import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />

      {/* Content after hero */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[#3E2723]">
            쫀득함의 비밀
          </h2>
          <p className="mt-4 text-[#5D4037] max-w-lg mx-auto">
            프리미엄 원재료와 정교한 레시피로 만들어진 완벽한 식감
          </p>
        </div>
      </section>
    </main>
  );
}
