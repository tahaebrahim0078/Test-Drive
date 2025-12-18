"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ClientMotion from "../ClientMotion";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/utils/api";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
export default function CarPreview() {
  const [selectedCar, setSelectedCar] = React.useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => await fetchCars(),
  });
  React.useEffect(() => {
    if (data?.data?.length) {
      setSelectedCar(data.data[2]);
    }
  }, [data]);
  if (isLoading) {
    return <h2>...Loading</h2>;
  }
  if (error) return <p>Error loading the cars</p>;
  if (!selectedCar) return null;
  const cars = data?.data;

  return (
    <section className="bg-[#efefef] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative">
        <ClientMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Cars
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our most popular vehicles
          </p>
        </ClientMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex justify-center md:justify-start"
          >
            <Image
              src={selectedCar.images[0]}
              alt={selectedCar.model}
              width={700}
              height={400}
              className="w-full max-w-[700px] h-auto object-contain"
            />
          </motion.div>

          {/* CENTER CONTENT */}
          <div className="max-w-xl mx-auto md:mx-0">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-sm sm:text-base bg-orange-400 text-white px-2 w-fit py-1 rounded-md font-bold mb-3"
            >
              {selectedCar.dealer.name}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight xl:text-4xl"
            >
              {selectedCar.brand.toUpperCase()}
              <br />
              {selectedCar.model.toUpperCase()}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 text-gray-600"
            >
              <span>
                <Link href={`/cars/${selectedCar._id}`} className="underline">
                  View Details
                </Link>
              </span>
              <span>
                <Link
                  href={`/booking/${selectedCar._id}`}
                  className="underline"
                >
                  Book Test Drive
                </Link>
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative my-4 w-full max-w-[340px] mx-auto rounded-2xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-5 xl:absolute xl:top-50 xl:right-12 xl:mt-0 xl:w-[300px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg text-gray-400 font-medium">
              Overview
            </span>

            <div className="flex items-center gap-1 bg-black text-white text-xs font-semibold px-2 py-1 rounded-lg">
              ⭐ 4.5 / 5
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            {selectedCar.brand} {selectedCar.model}
          </h3>
          <section className="text-xs">{selectedCar.dealer.name}</section>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <li>Tank: {selectedCar.specs.tankcapacity} L</li>
            <li>Power: {selectedCar.specs.horsepower} hp</li>
            <li>Torque: {selectedCar.specs.torque}</li>
            <li>0-100 km/h: {selectedCar.specs.acceleration} s</li>
            <li>DriveType: {selectedCar.specs.drivetype}</li>
          </ul>
          {/* Description */}
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            {selectedCar.description}
          </p>
        </motion.div>
        <motion.div
          className="flex p-2 max-w-3xl gap-4 mt-12 overflow-auto "
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.15 }}
        >
          {cars.map((car) => (
            <motion.button
              key={car._id}
              variants={fadeUp}
              onClick={() => setSelectedCar(car)}
              type="button"
              className={`flex-shrink-0 w-20 sm:w-28 bg-white rounded-xl shadow-md p-3 text-center ${
                car._id === selectedCar._id ? "ring-1 ring-orange-400" : ""
              }`}
            >
              <Image
                src={car.images[0]}
                alt={car.model}
                width={80}
                height={40}
                className="mx-auto object-contain"
              />
              <p className="text-xs mt-2 text-gray-600">{car.brand}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
