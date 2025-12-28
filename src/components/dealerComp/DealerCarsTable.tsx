"use client";

import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import Image from "next/image";
import { Car } from "@/app/dealer/dashboard/typesDealer";

interface DealerCarsTableProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function DealerCarsTable({
  cars,
  onEdit,
  onDelete,
  isLoading = false,
}: DealerCarsTableProps) {
  if (cars.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-white/10 rounded-2xl backdrop-blur-xl"
      >
        <p className="text-gray-400 text-lg">No cars added yet</p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl bg-white/20 backdrop-blur-xl border border-white/10 p-4 shadow-lg"
          >
            {/* Image */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-gray-200/20">
              {car.images?.length ? (
                <Image
                  src={car.images[0]}
                  alt={car.model}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FiImage className="text-gray-400" size={28} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">
                {car.brand} {car.model}
              </p>
              <p className="text-gray-400">{car.year}</p>

              <div className="text-sm text-gray-500 space-y-1">
                <p>Engine: {car.specs.engine}</p>
                <p>Power: {car.specs.horsepower} hp</p>
                <p>Transmission: {car.specs.transmission}</p>
              </div>

              <p className="text-orange-400 font-bold text-lg mt-2">
                {car.price.toLocaleString()} SAR
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onEdit(car)}
                className="flex-1 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 cursor-pointer hover:scale-103 text-white transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(car._id!)}
                className="flex-1 py-2 rounded-xl bg-orange-700 hover:bg-red-600 cursor-pointer hover:scale-103 text-white transition duration-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop */}
      <div className="overflow-x-auto hidden md:block">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          <thead>
            <tr className="bg-gray-200 backdrop-blur-xl rounded border-b border-gray-400">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                Car Details
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                Specs
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                Price
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <motion.tr
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-400 hover:bg-gray-200 transition"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200/20">
                    {car.images && car.images.length > 0 ? (
                      <Image
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <FiImage size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </td>

                {/* Car Details */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <p className="font-semibold text-lg">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-gray-500">{car.year}</p>
                  </div>
                </td>

                {/* Specs */}
                <td className="px-6 py-4 text-gray-500 text-sm">
                  <p>
                    <span className="font-medium">Engine:</span>{" "}
                    {car.specs.engine}
                  </p>
                  <p>
                    <span className="font-medium">Power:</span>{" "}
                    {car.specs.horsepower} hp
                  </p>
                  <p>
                    <span className="font-medium">Transmission:</span>{" "}
                    {car.specs.transmission}
                  </p>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <p className="font-bold text-orange-400">
                    {car.price.toLocaleString()} SAR
                  </p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(car)}
                      disabled={isLoading}
                      className="p-2 bg-purple-500 cursor-pointer hover:bg-purple-600 hover:scale-110 disabled:bg-gray-400 text-white rounded-lg transition"
                      title="Edit car"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete ${car.brand} ${car.model}?`
                          )
                        )
                          onDelete(car._id!);
                      }}
                      disabled={isLoading}
                      className="p-2 bg-orange-700 cursor-pointer hover:bg-red-600 hover:scale-110 disabled:bg-gray-400 text-white rounded-lg transition"
                      title="Delete car"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
