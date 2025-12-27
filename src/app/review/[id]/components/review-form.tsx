import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import StarRating from "./star-rating";

interface ReviewFormProps {
  hasMounted: boolean;
  onSubmit: (rating: number, review: string) => void;
}

export default function ReviewForm({ hasMounted, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") {
      alert("Please provide both rating and review");
      return;
    }
    onSubmit(rating, review);
  };

  return (
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
        <StarRating
          rating={rating}
          hoveredRating={hoveredRating}
          onRatingChange={setRating}
          onHoverChange={setHoveredRating}
        />
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
          maxLength={500}
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
  );
}