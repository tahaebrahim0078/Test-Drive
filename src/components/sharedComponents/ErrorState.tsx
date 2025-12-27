"use client";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function ErrorState({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <FiAlertCircle className="text-red-500" size={48} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Oops! Connection Issue
      </h2>
      <p className="text-gray-500 max-w-xs mb-8">
        {message}. Please check your internet connection or try again.
      </p>
    </motion.div>
  );
}
