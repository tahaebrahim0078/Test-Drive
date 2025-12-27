"use client";

import { useState, useRef, ChangeEvent } from "react";
import { CarPayload, CarSpecs } from "@/app/dealer/dashboard/typesDealer";
import { FiPlus, FiX } from "react-icons/fi";
import Image from "next/image";
interface DealerCarFormProps {
  onSubmit: (data: CarPayload) => void;
  initialData?: CarPayload;
  isEdit?: boolean;
  isLoading?: boolean;
}

const MAX_IMAGES = 4;

export default function DealerCarForm({
  onSubmit,
  initialData,
  isEdit = false,
  isLoading = false,
}: DealerCarFormProps) {
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [model, setModel] = useState(initialData?.model || "");
  const [year, setYear] = useState(
    initialData?.year || new Date().getFullYear()
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [specs, setSpecs] = useState<CarSpecs>(
    initialData?.specs || {
      engine: "",
      transmission: "",
      fuelType: "",
      horsepower: 0,
      color: "",
    }
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // رفع الصور من الجهاز
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).slice(
      0,
      MAX_IMAGES - images.length
    );

    const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CarPayload = {
      brand,
      model,
      year,
      price,
      images,
      specs,
      isActive: true,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 border text-black rounded w-full"
            required
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 text-black border rounded w-full"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="p-2 text-black border rounded w-full"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="p-2 text-black border rounded w-full"
            required
          />
        </div>

        {/* Specs */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Engine</label>
          <input
            type="text"
            value={specs.engine}
            onChange={(e) => setSpecs({ ...specs, engine: e.target.value })}
            className="p-2 text-black border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Transmission
          </label>
          <input
            type="text"
            value={specs.transmission}
            onChange={(e) =>
              setSpecs({ ...specs, transmission: e.target.value })
            }
            className="p-2 text-black border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Fuel Type
          </label>
          <input
            type="text"
            value={specs.fuelType}
            onChange={(e) => setSpecs({ ...specs, fuelType: e.target.value })}
            className="p-2 text-black border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Horsepower
          </label>
          <input
            type="number"
            value={specs.horsepower}
            onChange={(e) =>
              setSpecs({ ...specs, horsepower: Number(e.target.value) })
            }
            className="p-2 text-black border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Color</label>
          <input
            type="text"
            value={specs.color}
            onChange={(e) => setSpecs({ ...specs, color: e.target.value })}
            className="p-2 text-black border rounded w-full"
          />
        </div>

        {/* Images Section */}
        <div className="md:col-span-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Car Images (min 1, max {MAX_IMAGES})
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            {images.length === 0 && (
              <div className="col-span-2 md:col-span-4 text-center text-sm text-gray-500 py-6 border border-dashed rounded">
                No images uploaded yet
              </div>
            )}

            {images.map((url, idx) => (
              <div key={idx} className="relative group">
                <div className="w-full h-36 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  <Image
                    src={url}
                    alt={`car-${idx}`}
                    fill
                    unoptimized
                    className="object-cover rounded"
                  />
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={images.length >= MAX_IMAGES}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50"
          >
            <FiPlus size={18} />
            {images.length >= MAX_IMAGES
              ? "Max images reached"
              : "Upload Image"}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 cursor-pointer px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {isEdit ? "Update Car" : "Add Car"}
      </button>
    </form>
  );
}
