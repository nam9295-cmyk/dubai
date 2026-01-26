import HeroSection from "./components/HeroSection";
import IngredientsSection from "./components/IngredientsSection";
import GrindSection from "./components/GrindSection";
import StorySection from "./components/StorySection";
import PreorderSection from "./components/PreorderSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <GrindSection />
      <IngredientsSection />
      <StorySection />
      <PreorderSection />
      <Footer />
    </main>
  );
}
