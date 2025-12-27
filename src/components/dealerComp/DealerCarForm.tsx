"use client";

import { useState, useRef, ChangeEvent } from "react";
import { CarPayload, CarSpecs } from "@/app/dealer/dashboard/typesDealer";
import { FiPlus, FiX } from "react-icons/fi";
import Image from "next/image";
import imageCompression from "browser-image-compression";

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
  /* =========================
     Basic info
  ========================= */
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [model, setModel] = useState(initialData?.model || "");
  const [year, setYear] = useState(
    initialData?.year || new Date().getFullYear()
  );
  const [price, setPrice] = useState(initialData?.price || 0);

  /* =========================
     Specs
  ========================= */
  const [specs, setSpecs] = useState<CarSpecs>(
    initialData?.specs || {
      engine: "",
      transmission: "",
      fuelType: "",
      horsepower: 0,
      color: "",
    }
  );

  /* =========================
     Images
  ========================= */
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* =========================
     Upload images to Cloudinary
  ========================= */
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url as string;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).slice(
      0,
      MAX_IMAGES - (existingImages.length + newImages.length)
    );

    const compressedFiles = await Promise.all(
      filesArray.map((file) =>
        imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920 })
      )
    );

    setNewImages((prev) => [...prev, ...compressedFiles]);
    setNewPreviews((prev) => [
      ...prev,
      ...compressedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeExistingImage = (idx: number) =>
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  const removeNewImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  /* =========================
     Handle submit
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload new images to Cloudinary
    const uploadedUrls = await Promise.all(
      newImages.map((file) => uploadImageToCloudinary(file))
    );

    const payload: CarPayload = {
      brand,
      model,
      year,
      price,
      specs,
      images: [...existingImages, ...uploadedUrls],
      isActive: true,
    };

    onSubmit(payload);
  };

  const totalImages = existingImages.length + newPreviews.length;

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Brand</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 border rounded w-full text-black"
            required
          />
        </div>
        {/* Model */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 border rounded w-full text-black"
            required
          />
        </div>
        {/* Year */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="p-2 border rounded w-full text-black"
            required
          />
        </div>
        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="p-2 border rounded w-full text-black"
            required
          />
        </div>
        {/* Specs */}
        {["engine", "transmission", "fuelType", "horsepower", "color"].map(
          (field) => (
            <div key={field}>
              <label className="block mb-1 font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "horsepower" ? "number" : "text"}
                value={(specs as any)[field]}
                onChange={(e) =>
                  setSpecs({
                    ...specs,
                    [field]:
                      field === "horsepower"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
                className="p-2 border rounded w-full text-black"
              />
            </div>
          )
        )}
        {/* Images */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">
            Car Images ({totalImages}/{MAX_IMAGES})
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            {existingImages.map((url, idx) => (
              <ImageBox
                key={`old-${idx}`}
                src={url}
                onRemove={() => removeExistingImage(idx)}
              />
            ))}
            {newPreviews.map((url, idx) => (
              <ImageBox
                key={`new-${idx}`}
                src={url}
                onRemove={() => removeNewImage(idx)}
              />
            ))}
          </div>
          <button
            type="button"
            disabled={totalImages >= MAX_IMAGES}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            <FiPlus /> Upload Image
          </button>
        </div>
      </div>
      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {isEdit ? "Update Car" : "Add Car"}
      </button>
    </form>
  );
}

/* =========================
   Image Box
========================= */
function ImageBox({ src, onRemove }: { src: string; onRemove: () => void }) {
  if (!src) return null;
  return (
    <div className="relative h-36 rounded overflow-hidden group">
      <Image
        src={src}
        alt="car"
        fill
        sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         25vw"
        unoptimized
        className="object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100"
      >
        <FiX />
      </button>
    </div>
  );
}
