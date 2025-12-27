import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/home_page_components/Testimonials";
import Partners from "@/components/home_page_components/Partners";
import CTA from "@/components/home_page_components/CTA";
import HeroSection from "@/components/home_page_components/HeroSection";
import CarPreview from "@/components/home_page_components/CarPreview";
import Journey from "@/components/home_page_components/Journey";

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
