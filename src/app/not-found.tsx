"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import ClientMotion from "@/components/ClientMotion";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  const hasMounted = useHasMounted();
  return (
    <div className="min-h-screen bg-linear-to-r from-red-50 to-gray-100 flex items-center justify-center px-4">
      <ClientMotion
        initial={hasMounted ? { opacity: 0, y: 20 } : false}
        animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* 404 Number */}
        <ClientMotion
          initial={hasMounted ? { scale: 0 } : false}
          animate={hasMounted ? { scale: 1 } : undefined}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="text-9xl md:text-[150px] font-bold bg-linear-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
            404
          </div>
        </ClientMotion>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s
          get you back on track.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          <FiArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Illustration */}
        <ClientMotion
          animate={hasMounted ? { y: [0, -20, 0] } : undefined}
          transition={
            hasMounted ? { duration: 3, repeat: Infinity } : undefined
          }
          className="mt-12 text-6xl"
        >
          🚗
        </ClientMotion>
      </ClientMotion>
    </div>
  );
}
