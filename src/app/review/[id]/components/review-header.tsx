import { motion } from "framer-motion";

interface ReviewHeaderProps {
  hasMounted: boolean;
}

export default function ReviewHeader({ hasMounted }: ReviewHeaderProps) {
  return (
    <motion.div
      initial={hasMounted ? { opacity: 0, y: 20 } : false}
      animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
      className="bg-gray-50 p-8 rounded-lg mb-12"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Share Your Experience
      </h1>
      <p className="text-gray-600 text-lg">
        Tell us about your test drive
      </p>
    </motion.div>
  );
}