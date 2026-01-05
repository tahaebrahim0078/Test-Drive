"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import ReviewForm from "./components/review-form";
import ThankYouCard from "./components/thank-you-card";
import CarInfoCard from "./components/car-info-card";
import ReviewHeader from "./components/review-header";
import BackButton from "./components/back-button";

export default function ReviewPage({ params }: { params: { id: string } }) {
  const hasMounted = useHasMounted();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
  });

  const carInfo = {
    name: "Mercedes C-Class",
    dealer: "Mercedes Central",
  };

  const handleSubmit = (rating: number, review: string) => {
    setFormData({ rating, review });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <Navbar />
        <ThankYouCard />
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <BackButton />

          <ReviewHeader hasMounted={hasMounted} />

          <CarInfoCard
            hasMounted={hasMounted}
            carName={carInfo.name}
            dealerName={carInfo.dealer}
          />

          <ReviewForm hasMounted={hasMounted} onSubmit={handleSubmit} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
