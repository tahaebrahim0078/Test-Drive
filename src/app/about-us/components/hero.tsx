"use client";
import { motion } from "framer-motion";

interface HeroSectionProps {
  hasMounted: boolean;
}

export default function HeroSection({ hasMounted }: HeroSectionProps) {
  return (
    <motion.section
      initial={hasMounted ? { opacity: 0 } : false}
      animate={hasMounted ? { opacity: 1 } : undefined}
      className="bg-linear-to-br from-red-50 to-orange-50 py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={hasMounted ? { opacity: 0, y: 20 } : false}
          animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          About DriveTest
        </motion.h1>
        <motion.p
          initial={hasMounted ? { opacity: 0, y: 20 } : false}
          animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          We look to the future and are transforming the test-drive experience
        </motion.p>
      </div>
    </motion.section>
  );
}