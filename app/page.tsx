import HeroSection from "./components/HeroSection";
import IngredientsSection from "./components/IngredientsSection";

import StorySection from "./components/StorySection";
import PreorderSection from "./components/PreorderSection";
import WaitingSection from "./components/WaitingSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />

      <StorySection />
      <IngredientsSection />
      <PreorderSection />
      <WaitingSection />
      <Footer />
    </main>
  );
}
