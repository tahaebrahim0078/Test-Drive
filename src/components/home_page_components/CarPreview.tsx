"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/utils/api";
import LoadingState from "../sharedComponents/LoadingState";
import ErrorState from "../sharedComponents/ErrorState";
import { FiArrowRight, FiInfo } from "react-icons/fi";
import { Car, carApiResponse } from "@/types/index";

export default function CarPreview() {
  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);

  const { data, isLoading, error } = useQuery<carApiResponse>({
    queryKey: ["cars"],
    queryFn: async () => await fetchCars(),
  });

  React.useEffect(() => {
    if (data?.data?.length) {
      setSelectedCar(data.data[0]);
    }
  }, [data]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={String(error)} />;
  if (!selectedCar) return null;

  const cars = data?.data || [];

  return (
    <section className="relative bg-linear-to-b from-gray-50 to-[#efefef] overflow-hidden ">
      {/* Background Brand Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="font-black text-gray-200/50 leading-none text-[clamp(6rem,12vw,14rem)] whitespace-wrap">
          {selectedCar.brand.toUpperCase()}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm"
          >
            Premium Selection
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
            Featured Vehicles
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCar._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={selectedCar.images[0]}
                  alt={selectedCar.model}
                  width={800}
                  height={450}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-2xl"
                />
              </motion.div>
            </AnimatePresence>

            <div className="w-full h-10 bg-black/10 blur-3xl rounded-full -mt-10px" />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-orange-200">
                {selectedCar.dealer?.dealershipName}
              </span>

              <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">
                <span className="block truncate max-w-[14ch]">
                  {selectedCar.brand.toUpperCase()}
                </span>
                <span className="text-orange-500">{selectedCar.model}</span>
              </h1>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href={`/booking/${selectedCar._id}`}
                  className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 transition-all shadow-xl active:scale-95"
                >
                  Book Test Drive <FiArrowRight />
                </Link>

                <Link
                  href={`/cars/${selectedCar._id}`}
                  className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  Details <FiInfo />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            key={selectedCar._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-full lg:sticky lg:top-32"
          >
            <div className="border-b border-gray-100 pb-4 mb-4">
              <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">
                Technical Specs
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <li>Type: {selectedCar.specs.cartype}</li>
              <li>Power: {selectedCar.specs.horsepower} hp</li>
              <li>Torque: {selectedCar.specs.torque} nm</li>
              <li>0-100 km/h: {selectedCar.specs.acceleration} s</li>
              <li>Drive: {selectedCar.specs.drivetrain}</li>
            </ul>
          </motion.div>
        </div>

        {/* Preview Section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Select to Preview
          </p>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {cars.slice(0, 4).map((car) => (
              <button
                key={car._id}
                onClick={() => setSelectedCar(car)}
                className={`group relative shrink-0 w-24 h-24 rounded-2xl transition-all p-2 ${
                  car._id === selectedCar._id
                    ? "bg-orange-500 shadow-lg shadow-orange-200"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <Image
                  src={car.images[0]}
                  alt={car.model}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
