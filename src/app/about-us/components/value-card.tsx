"use client";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface ValueCardProps {
  icon: IconType;
  title: string;
  description: string;
  color: string;
  index: number;
  hasMounted: boolean;
}

export default function ValueCard({
  icon: Icon,
  title,
  description,
  color,
  index,
  hasMounted,
}: ValueCardProps) {
  return (
    <motion.div
      initial={hasMounted ? { opacity: 0, y: 20 } : false}
      whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
      viewport={hasMounted ? { once: true } : undefined}
      transition={{ delay: index * 0.1 }}
      className={`bg-linear-to-br ${color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}
    >
      <Icon className="text-4xl mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </motion.div>
  );
}