"use client";
import useHasMounted from "@/hooks/useHasMounted";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/hero";
import StorySection from "./components/story";
import ValuesSection from "./components/values";
import TeamSection from "./components/team";
import CTASection from "./components/cta";

export default function AboutUs() {
  const hasMounted = useHasMounted();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <HeroSection hasMounted={hasMounted} />
        <StorySection hasMounted={hasMounted} />
        <ValuesSection hasMounted={hasMounted} />
        <TeamSection hasMounted={hasMounted} />
        <CTASection hasMounted={hasMounted} />
      </main>

      <Footer />
    </div>
  );
}