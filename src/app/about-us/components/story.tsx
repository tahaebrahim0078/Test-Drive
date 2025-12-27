"use client";
import { motion } from "framer-motion";

interface StorySectionProps {
  hasMounted: boolean;
}

export default function StorySection({ hasMounted }: StorySectionProps) {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={hasMounted ? { opacity: 0, x: -50 } : false}
          whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
          viewport={hasMounted ? { once: true } : undefined}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            DriveTest started as a small project with a big idea: make
            test-drives simple for customers and provide agencies with efficient
            booking management.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Over time, our platform grew to serve thousands of customers and
            partners while staying true to our core principles: transparency,
            safety, and excellence.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we are proud to be a trusted choice for test-drives in the
            region, powered by a dedicated team improving our services every
            day.
          </p>
        </motion.div>
        <motion.div
          initial={hasMounted ? { opacity: 0, x: 50 } : false}
          whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
          viewport={hasMounted ? { once: true } : undefined}
          className="bg-linear-to-br from-red-100 to-orange-100 rounded-lg p-8 text-center"
        >
          <p className="text-5xl font-bold text-red-600 mb-2">10K+</p>
          <p className="text-gray-600 mb-6">Successful Test-Drives</p>
          <p className="text-5xl font-bold text-orange-600 mb-2">50+</p>
          <p className="text-gray-600 mb-6">Partner Agencies</p>
          <p className="text-5xl font-bold text-red-600 mb-2">100%</p>
          <p className="text-gray-600">Customer Satisfaction</p>
        </motion.div>
      </div>
    </section>
  );
}