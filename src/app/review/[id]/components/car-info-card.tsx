import { motion } from "framer-motion";

interface CarInfoCardProps {
  hasMounted: boolean;
  carName: string;
  dealerName: string;
}

export default function CarInfoCard({ 
  hasMounted, 
  carName, 
  dealerName 
}: CarInfoCardProps) {
  return (
    <motion.div
      initial={hasMounted ? { opacity: 0 } : false}
      animate={hasMounted ? { opacity: 1 } : undefined}
      transition={{ delay: 0.2 }}
      className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8"
    >
      <h2 className="font-bold text-gray-900 mb-2">{carName}</h2>
      <p className="text-gray-600">{dealerName}</p>
    </motion.div>
  );
}