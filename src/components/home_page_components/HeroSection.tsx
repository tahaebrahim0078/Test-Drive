"use client";
import ClientMotion from "@/components/ClientMotion";
import Image from "next/image";
import homepageImg from "../../../public/images/homepage.png";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiClock, FiStar, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { isLoggedIn } = useAuth();
  const [currentStat, setCurrentStat] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fix 1: Use a state to track if we're on client
  const [isClient, setIsClient] = useState(false);

  // Fix 2: Remove direct window access - use animated glow instead
  const PARTICLE_POSITIONS = [
    { left: 10, top: 20, duration: 2.5 },
    { left: 25, top: 60, duration: 3 },
    { left: 40, top: 30, duration: 2.8 },
    { left: 60, top: 40, duration: 3.2 },
    { left: 80, top: 70, duration: 2.3 },
    { left: 15, top: 80, duration: 2.9 },
    { left: 35, top: 15, duration: 3.1 },
    { left: 55, top: 55, duration: 2.7 },
    { left: 75, top: 25, duration: 2.4 },
    { left: 90, top: 45, duration: 3.3 },
    { left: 20, top: 90, duration: 2.6 },
    { left: 45, top: 75, duration: 3.4 },
    { left: 65, top: 10, duration: 2.2 },
    { left: 85, top: 85, duration: 2.8 },
    { left: 30, top: 35, duration: 3 },
    { left: 50, top: 65, duration: 2.5 },
    { left: 70, top: 50, duration: 3.1 },
    { left: 95, top: 20, duration: 2.7 },
    { left: 5, top: 55, duration: 2.9 },
    { left: 40, top: 95, duration: 2.4 },
  ];

  const stats = [
    { value: "500+", label: "Cars Available", icon: <FiCheckCircle /> },
    { value: "50+", label: "Partner Dealers", icon: <FiStar /> },
    { value: "10K+", label: "Happy Customers", icon: <FiClock /> },
  ];

  // Fix 3: Use setTimeout to defer setIsClient
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);

    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [stats.length]);

  // Fix 4: Only add event listeners on client side
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  return (
    <section className="relative bg-linear-to-br from-white via-gray-50 to-red-50 pt-10 max-lg:pb-10 overflow-hidden">
      {/* Animated background elements - Simplified version */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Replace mouse-following glow with animated glow */}
        <motion.div
          className="absolute w-96 h-96 bg-linear-to-r from-red-100 to-transparent rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Alternative: Conditional mouse glow (only on client) */}
        {isClient && (
          <div
            className="absolute w-96 h-96 bg-linear-to-r from-red-100 to-transparent rounded-full blur-3xl opacity-30 transition-all duration-100"
            style={{
              left: `${
                (mousePosition.x /
                  (typeof window !== "undefined" ? window.innerWidth : 100)) *
                20
              }%`,
              top: `${
                (mousePosition.y /
                  (typeof window !== "undefined" ? window.innerHeight : 100)) *
                20
              }%`,
            }}
          />
        )}

        <div className="absolute w-80 h-80 bg-linear-to-b from-blue-100 to-transparent rounded-full blur-3xl opacity-20 right-0 top-1/4" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Keep as is */}
          <div className="space-y-8">
            <ClientMotion
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-red-50 to-pink-50 px-4 py-2 rounded-full border border-red-100 mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-red-700">
                  Real-time Availability
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                <span className="relative">
                  Book Your
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-linear-to-r from-red-500 to-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
                <br />
                <span className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Test Drive
                </span>{" "}
                <span className="text-4xl lg:text-5xl opacity-90">
                  in <span className="text-red-600 font-black">Minutes</span>
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Experience the{" "}
                <span className="font-semibold text-gray-800">
                  fastest and most seamless way
                </span>{" "}
                to book test drives online. Browse premium cars, select your
                time, and confirm instantly.
              </p>
            </ClientMotion>

            {/* Interactive Statistics with Counter Animation */}
            <ClientMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-3 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`relative bg-white rounded-2xl px-6 py-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                      currentStat === index ? "ring-2 ring-red-500" : ""
                    }`}
                    whileHover={{ y: -5, scale: 1.05 }}
                    onHoverStart={() => setCurrentStat(index)}
                  >
                    <div className="flex items-start flex-col  gap-3 mb-3">
                      <div className="p-2 bg-red-50 rounded-lg text-red-600">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="sm:text-3xl text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </div>
                    </div>
                    <motion.div
                      className="h-1 bg-linear-to-r from-red-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: currentStat === index ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>
            </ClientMotion>

            {/* Buttons with Hover Effects */}
            <ClientMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/cars"
                  className="group relative bg-linear-to-r from-red-600 via-red-500 to-orange-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Browse Cars</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>

              {!isLoggedIn && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/register"
                    className="group relative border-2 border-red-600 text-red-600 hover:text-white font-bold py-4 px-10 rounded-xl hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 overflow-hidden"
                  >
                    <span className="relative z-10">Register Now</span>
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </Link>
                </motion.div>
              )}
            </ClientMotion>

            {/* Trust Badges */}
            <ClientMotion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            ></ClientMotion>
          </div>

          {/* Right Image with Parallax Effect */}
          <ClientMotion
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute -inset-4 bg-linear-to-r from-red-500 to-orange-500 rounded-3xl blur-xl opacity-20" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={homepageImg}
                  width={800}
                  height={500}
                  alt="Luxury Car"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />

                {/* Floating Card Overlay */}
                <motion.div
                  className="absolute max-sm:bottom-2 bottom-6 right-6 max-sm:right-2 bg-white rounded-xl max-sm:p-2 p-4 shadow-2xl max-w-xs"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="max-sm:w-7 max-sm:h-7 w-12 h-12 bg-linear-to-br from-red-500 to-orange-400 rounded-full flex items-center justify-center">
                      <FiStar className="text-white max-sm:text-sm text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Live Booking</p>
                      <p className="text-sm text-gray-600">Available now</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-32 h-32 bg-linear-to-br from-red-200 to-transparent rounded-full blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-linear-to-tr from-orange-200 to-transparent rounded-full blur-xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </ClientMotion>
        </div>
      </div>
    </section>
  );
}
