"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const hasMounted = useHasMounted();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock car data - replace with API call
  const car = {
    id: params.id,
    name: "BMW 3 Series",
    category: "Luxury Sedan",
    price: 150,
    rating: 4.8,
    reviews: 245,
    description:
      "Experience luxury and performance with the BMW 3 Series. Features cutting-edge technology, premium interior, and smooth handling.",
    specs: [
      { label: "Engine", value: "2.0L Twin-Turbo" },
      { label: "Power", value: "255 HP" },
      { label: "Transmission", value: "Automatic 8-Speed" },
      { label: "0-60 mph", value: "5.5 seconds" },
      { label: "Top Speed", value: "130 mph" },
      { label: "Fuel Type", value: "Gasoline" },
    ],
    features: [
      "Premium Leather Interior",
      "Navigation System",
      "Panoramic Sunroof",
      "Heads-Up Display",
      "Ambient Lighting",
      "Adaptive Cruise Control",
      "360 Camera",
      "Premium Sound System",
    ],
    images: [
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
    ],
    dealer: {
      name: "BMW Downtown",
      location: "Downtown District",
      rating: 4.9,
      reviews: 512,
    },
    availability: [
      { date: "Dec 10", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { date: "Dec 11", slots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
      { date: "Dec 12", slots: ["11:00 AM", "2:30 PM"] },
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <main>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cars" className="text-red-600 hover:text-red-700">
            ← Back to Cars
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <motion.div
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="relative"
            >
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={car.images[currentImageIndex]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <FiChevronRight size={24} />
                </button>

                {/* Image Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition ${
                        index === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/50 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Car Info */}
            <motion.div
              initial={hasMounted ? { opacity: 0, x: 20 } : false}
              animate={hasMounted ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {car.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">{car.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${
                        i < Math.floor(car.rating)
                          ? "text-orange-400 fill-current"
                          : "text-gray-300"
                      }`}
                      size={18}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {car.rating} ({car.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                <p className="text-sm text-red-100 mb-1">Price</p>
                <p className="text-4xl font-bold">
                  ${car.price}
                  <span className="text-lg">/hour</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8">{car.description}</p>

              {/* Dealer Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h3 className="font-bold text-gray-900 mb-3">
                  Dealer Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold">
                    {car.dealer.name}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FiMapPin size={16} />
                    {car.dealer.location}
                  </p>
                  <p className="text-gray-600">
                    Rating: {car.dealer.rating} ⭐ ({car.dealer.reviews}{" "}
                    reviews)
                  </p>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/booking/${car.id}`}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition text-center block mb-4"
              >
                Book Test Drive
              </Link>
            </motion.div>
          </div>

          {/* Specs and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Specs */}
            <motion.div
              initial={hasMounted ? { opacity: 0, y: 20 } : false}
              whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
              viewport={hasMounted ? { once: true } : undefined}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="space-y-4">
                {car.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-3"
                  >
                    <span className="text-gray-600 font-medium">
                      {spec.label}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={hasMounted ? { opacity: 0, y: 20 } : false}
              whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
              viewport={hasMounted ? { once: true } : undefined}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Premium Features
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Availability */}
          <motion.div
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            viewport={hasMounted ? { once: true } : undefined}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available Slots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {car.availability.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FiCalendar size={18} />
                    {day.date}
                  </h3>
                  <div className="space-y-2">
                    {day.slots.map((slot, slotIndex) => (
                      <button
                        key={slotIndex}
                        className="w-full bg-white hover:bg-red-600 hover:text-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
