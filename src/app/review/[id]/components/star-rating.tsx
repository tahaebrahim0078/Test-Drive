import { FiStar } from "react-icons/fi";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  hoveredRating: number;
  onRatingChange: (rating: number) => void;
  onHoverChange: (rating: number) => void;
}

export default function StarRating({
  rating,
  hoveredRating,
  onRatingChange,
  onHoverChange
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-4">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => onHoverChange(star)}
          onMouseLeave={() => onHoverChange(0)}
          className="focus:outline-none transition"
          aria-label={`Rate ${star} ${star === 1 ? 'star' : 'stars'}`}
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
  );
}