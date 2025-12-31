"use client";

import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "./components/contact-hero";
import ContactInfoGrid from "./components/contactInfo-grid";
import ContactFormSection from "./components/contact-form-section";
import FAQSection from "./components/faq-section";
import ContactCTA from "./components/contact-cta";

export default function ContactUs() {
  const hasMounted = useHasMounted();
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 pt-20">
        <ContactHero hasMounted={hasMounted} />

        <ContactInfoGrid hasMounted={hasMounted} />

        <ContactFormSection
          hasMounted={hasMounted}
          submitted={submitted}
          onSubmit={handleFormSubmit}
        />

        <FAQSection hasMounted={hasMounted} />

        <ContactCTA hasMounted={hasMounted} />
      </main>
    </div>
  );
}
