"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import ClientMotion from "@/components/ClientMotion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { Car } from "@/types";
import LoadingState from "@/components/sharedComponents/LoadingState";
import ErrorState from "@/components/sharedComponents/ErrorState";
export default function CarDetailPage() {
  const carId = useParams().id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const queryClient = useQueryClient();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: async () => await fetchCarById(carId as string),
    enabled: !!carId,
    initialData: () => {
      const cachedCar = queryClient
        .getQueriesData<{ data: Car[] }>({
          queryKey: ["cars"],
        })
        .flatMap(([_, value]) => value?.data);
      return cachedCar.find((c) => c?._id === carId);
    },
    staleTime: 1000 * 60 * 5,
  });
  console.log("Car Details", car);
  if (isLoading) return <LoadingState />;
  if (isError || !car) return <ErrorState message={"Car Not Found"} />;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cars" className="text-red-600 hover:text-red-700">
            ← Back to Cars
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <ClientMotion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={car.images[currentImageIndex]}
                  fill
                  alt={car.brand}
                  priority={true}
                  loading="eager"
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <FiChevronRight size={24} />
                </button>

                {/* Image Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition ${
                        index === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/50 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </ClientMotion>

            {/* Car Info */}
            <ClientMotion
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {car.brand}
              </h1>
              <p className="text-gray-600 text-lg mb-4">{car.model}</p>

              {/* Price */}
              <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                <p className="text-sm text-red-100 mb-1">Price</p>
                <p className="text-4xl font-bold">
                  ${car.price}
                  <span className="text-lg">/hour</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8">{car.description}</p>

              {/* Dealer Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h3 className="font-bold text-gray-900 mb-3">
                  Dealer Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold">
                    {car.dealer?.dealershipName ?? "unknown dealer"}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FiMapPin size={16} />
                    {car.dealer?.dealershipLocation ?? "unknown location"}
                  </p>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/booking/${car._id}`}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition text-center block mb-4"
              >
                Book Test Drive
              </Link>
            </ClientMotion>
          </div>

          {/* Specs and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Specs */}
            <ClientMotion
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="space-y-4">
                {Object.entries(car.specs).map(([key, value], index) => (
                  <div
                    key={index}
                    className="flex justify-between tracking-widest border-b pb-3 text-end"
                  >
                    <span className="text-gray-600 font-medium">
                      {key.toUpperCase()}
                    </span>
                    <span className="text-gray-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </ClientMotion>

            {/* Features */}
            <ClientMotion
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Premium Features
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {car.features?.length ? (
                  car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2">
                    No features available.
                  </p>
                )}
              </div>
            </ClientMotion>
          </div>
        </div>
      </section>
    </main>
  );
}
