"use client";

import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import Image from "next/image";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  specs: {
    engine: string;
    transmission: string;
    fuelType: string;
    horsepower: number;
    color: string;
  };
}

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
        className="text-center py-12 bg-gray-50 rounded-lg"
      >
        <p className="text-gray-500 text-lg">No cars added yet</p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Car Details
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Specs
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <motion.tr
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              {/* Image */}
              <td className="px-6 py-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
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
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-gray-500">{car.year}</p>
                </div>
              </td>

              {/* Specs */}
              <td className="px-6 py-4">
                <div className="text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Engine:</span>{" "}
                    {car.specs.engine}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Power:</span>{" "}
                    {car.specs.horsepower} hp
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">
                      {car.specs.transmission}
                    </span>
                  </p>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4">
                <p className="font-bold text-green-600">
                  {car.price.toLocaleString()} SAR
                </p>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(car)}
                    disabled={isLoading}
                    className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition"
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
                      ) {
                        onDelete(car.id);
                      }
                    }}
                    disabled={isLoading}
                    className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg transition"
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
  );
}
