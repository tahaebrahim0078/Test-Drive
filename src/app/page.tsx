"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import useHasMounted from "@/hooks/useHasMounted";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientMotion from "@/components/ClientMotion";
import { FiSearch, FiCalendar, FiCheck, FiStar } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const featuredCars = [
  {
    id: "1",
    name: "BMW 3 Series",
    category: "Luxury Sedan",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Mercedes C-Class",
    category: "Luxury Sedan",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1651362351519-f8e5e055f5f5?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Audi Q5",
    category: "Luxury SUV",
    price: 170,
    image:
      "https://images.unsplash.com/photo-1606559405297-5ce89cacb054?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Tesla Model S",
    category: "Electric Luxury",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a46dd52956?w=400&h=300&fit=crop",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    rating: 5,
    text: "Absolutely seamless experience! Booked a drive in minutes and the dealer was perfectly prepared. The platform made everything so simple.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
    text: "Found my dream car through DriveTest. The booking process was smooth and the dealer service exceeded my expectations. Highly recommended!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Business Consultant",
    rating: 5,
    text: "Perfect for busy professionals! I was able to compare multiple cars and book test drives without any hassle. The platform saved me hours of time.",
  },
];

const partners = [
  { id: 1, name: "BMW Downtown", description: "Premium BMW Experience" },
  {
    id: 2,
    name: "Mercedes Central",
    description: "Luxury Mercedes Collection",
  },
  { id: 3, name: "Audi Prestige", description: "Innovation & Performance" },
  { id: 4, name: "Tesla Gallery", description: "Electric Future" },
];

export default function Home() {
  const hasMounted = useHasMounted();
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-gray-50 to-gray-100 pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0, x: -50 } : false}
              animate={hasMounted ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Book Your Test{" "}
                <span className="text-red-600">Drive in Minute</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience the fastest and most seamless way to book test drives
                online. Browse premium cars, select your time, and confirm
                instantly.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-gray-600 text-sm">Cars Available</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-gray-600 text-sm">Partner Dealers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">10K+</p>
                  <p className="text-gray-600 text-sm">Happy Customers</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cars"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition inline-block text-center"
                >
                  Browse Cars
                </Link>
                <Link
                  href="/auth/register"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-lg transition inline-block text-center"
                >
                  Register Now
                </Link>
              </div>
            </ClientMotion>

            {/* Right Image */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0, x: 50 } : false}
              animate={hasMounted ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 bg-linear-to-br from-red-400 to-red-600 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=500&fit=crop"
                  alt="Luxury Car"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute top-4 right-4 bg-orange-400 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Available Now
                </div>
              </div>
            </ClientMotion>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientMotion
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8 }}
            viewport={hasMounted ? { once: true } : undefined}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Simple steps to book your perfect test drive
            </p>
          </ClientMotion>

          <ClientMotion
            variants={containerVariants}
            initial={hasMounted ? "hidden" : false}
            whileInView={hasMounted ? "visible" : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FiSearch,
                title: "Browse Cars",
                description:
                  "Explore our extensive collection of premium vehicles from leading brands. Filter by price, location, and more.",
              },
              {
                icon: FiCalendar,
                title: "Select Time",
                description:
                  "Choose your preferred date and time slot from available options. Easy and flexible scheduling for your lifestyle.",
              },
              {
                icon: FiCheck,
                title: "Confirm Booking",
                description:
                  "Complete your reservation with instant confirmation. Get detailed directions and dealer contact info.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </ClientMotion>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientMotion
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8 }}
            viewport={hasMounted ? { once: true } : undefined}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our most popular vehicles
            </p>
          </ClientMotion>

          <ClientMotion
            variants={containerVariants}
            initial={hasMounted ? "hidden" : false}
            whileInView={hasMounted ? "visible" : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredCars.map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard {...car} />
              </motion.div>
            ))}
          </ClientMotion>
        </div>
      </section>

      {/* Partner Dealerships */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientMotion
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8 }}
            viewport={hasMounted ? { once: true } : undefined}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Dealerships
            </h2>
            <p className="text-gray-600 text-lg">
              Trusted by leading automotive dealers nationwide
            </p>
          </ClientMotion>

          <motion.div
            variants={containerVariants}
            initial={hasMounted ? "hidden" : false}
            whileInView={hasMounted ? "visible" : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                className="bg-gray-100 p-8 rounded-lg text-center hover:bg-gray-200 transition"
              >
                <div className="w-16 h-16 bg-linear-to-br from-gray-400 to-gray-600 rounded-lg mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8 }}
            viewport={hasMounted ? { once: true } : undefined}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences from satisfied customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial={hasMounted ? "hidden" : false}
            whileInView={hasMounted ? "visible" : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-orange-400 fill-current"
                      size={18}
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8 }}
            viewport={hasMounted ? { once: true } : undefined}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Find Your Perfect Car?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Join thousands of satisfied customers who found their dream car
              through our platform.
            </p>

            <div className="max-w-md mx-auto mb-6">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition"
                >
                  Get Started
                </button>
              </form>
            </div>

            <p className="text-sm text-red-100">
              No spam, just exclusive deals and updates
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
