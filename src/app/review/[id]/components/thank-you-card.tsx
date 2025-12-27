import { motion } from "framer-motion";
import Link from "next/link";
import useHasMounted from "@/hooks/useHasMounted";

export default function ThankYouCard() {
  const hasMounted = useHasMounted();

  return (
    <section className="min-h-screen bg-linear-to-r from-gray-50 to-gray-100 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={hasMounted ? { opacity: 0, scale: 0.9 } : false}
          animate={hasMounted ? { opacity: 1, scale: 1 } : undefined}
          className="bg-white rounded-lg shadow-xl p-12 text-center"
        >
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your review has been published successfully. Help other
            customers make the right choice!
          </p>
          <Link
            href="/customer/bookings"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Back to Bookings
          </Link>
        </motion.div>
      </div>
    </section>
  );
}