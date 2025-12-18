import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/home_page components/Testimonials";
import Partners from "@/components/home_page components/Partners";
import CTA from "@/components/home_page components/CTA";
import HeroSection from "@/components/home_page components/HeroSection";
import CarPreview from "@/components/home_page components/CarPreview";
import Journey from "@/components/home_page components/Journey";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Journey />
      <CarPreview />
      <Partners />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
