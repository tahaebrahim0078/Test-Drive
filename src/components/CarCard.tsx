"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CarCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function CarCard({
  id,
  name,
  category,
  price,
  image,
}: CarCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{category}</p>

        {/* Price */}
        <div className="flex items-baseline mb-4">
          <span className="text-red-600 font-bold text-lg">${price}</span>
          <span className="text-gray-600 text-sm ml-1">/hour</span>
        </div>

        {/* Button */}
        <Link
          href={`/cars/${id}`}
          className="block w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
