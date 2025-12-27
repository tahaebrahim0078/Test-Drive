"use client";
import { motion } from "framer-motion";
import { IoCarSportSharp } from "react-icons/io5";

export default function BrandLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-40 w-full">
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-12 h-12 bg-blue-100 rounded-full"
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 bg-white p-5 rounded-2xl shadow-xl border border-gray-50"
        >
          <IoCarSportSharp className="text-blue-600" size={40} />
        </motion.div>
      </div>

      <div className="mt-8 flex gap-1">
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 bg-blue-600 rounded-full"
        />
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          className="w-2 h-2 bg-blue-600 rounded-full"
        />
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          className="w-2 h-2 bg-blue-600 rounded-full"
        />
      </div>
    </div>
  );
}
