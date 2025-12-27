"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CarCardProps } from "@/types";

export default function CarCard({
  _id,
  brand,
  model,
  price,
  images,
}: CarCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      <div className="relative h-56 bg-gray-50 overflow-hidden flex items-center justify-center p-4">
        <Image
          src={images[0]}
          alt={model}
          width={400}
          height={200}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-4 right-4 bg-white/80  px-3 py-1 rounded-full border border-red-100 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Available
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-[28px] font-bold text-red-600 uppercase tracking-widest mb-1">
              {brand}
            </h3>
            <p className="text-lg font-bold text-gray-900 leading-tight">
              {model.toLocaleUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">
              Price per hour
            </span>
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-gray-900">
                ${price}
              </span>
              <span className="text-gray-400 text-sm ml-1 font-medium">
                /hr
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-2 rounded-lg">
            <span className="text-red-600 text-xs font-bold px-1">NEW</span>
          </div>
        </div>

        <Link href={`/cars/${_id}`} className="main-btn">
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
