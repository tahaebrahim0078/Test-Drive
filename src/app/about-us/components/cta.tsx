"use client";
import { motion } from "framer-motion";

interface CTASectionProps {
  hasMounted: boolean;
}

export default function CTASection({ hasMounted }: CTASectionProps) {
  return (
    <motion.section
      initial={hasMounted ? { opacity: 0 } : false}
      whileInView={hasMounted ? { opacity: 1 } : undefined}
      viewport={hasMounted ? { once: true } : undefined}
      className="bg-red-600 text-white py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
        <p className="text-lg mb-8 opacity-90">
          Be part of the test-drive revolution. Get started with DriveTest.
        </p>
        <button className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
          Get Started
        </button>
      </div>
    </motion.section>
  );
}