"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import { FiStar } from "react-icons/fi";

export default function ReviewPage({ params }: { params: { id: string } }) {
  const hasMounted = useHasMounted();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const carName = "Mercedes C-Class";
  const dealerName = "Mercedes Central";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") {
      alert("Please provide both rating and review");
      return;
    }
    // TODO: Send to backend
    console.log({ rating, review });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <Navbar />

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

        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <Link
            href="/customer/bookings"
            className="text-red-600 hover:text-red-700 mb-8 inline-block"
          >
            ← Back to Bookings
          </Link>

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

          {/* Car Info */}
          <motion.div
            initial={hasMounted ? { opacity: 0 } : false}
            animate={hasMounted ? { opacity: 1 } : undefined}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8"
          >
            <h2 className="font-bold text-gray-900 mb-2">{carName}</h2>
            <p className="text-gray-600">{dealerName}</p>
          </motion.div>

          {/* Review Form */}
          <motion.form
            initial={hasMounted ? { opacity: 0 } : false}
            animate={hasMounted ? { opacity: 1 } : undefined}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Rating */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-4">
                How would you rate this car?
              </label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition"
                  >
                    <FiStar
                      size={48}
                      className={`transition ${
                        star <= (hoveredRating || rating)
                          ? "text-orange-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-gray-600 mt-4">
                  You rated this car {rating} {rating === 1 ? "star" : "stars"}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Your Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts about your test drive experience..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 resize-none"
              />
              <p className="text-gray-600 text-sm mt-2">
                {review.length}/500 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link
                href="/customer/bookings"
                className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={rating === 0 || review.trim() === ""}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Submit Review
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
