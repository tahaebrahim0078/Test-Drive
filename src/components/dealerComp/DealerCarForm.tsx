"use client";

import { useState, useRef, ChangeEvent } from "react";
import { CarPayload, CarSpecs } from "@/app/dealer/dashboard/typesDealer";
import { FiLoader, FiPlus, FiX } from "react-icons/fi";
import Image from "next/image";
import imageCompression from "browser-image-compression";

interface DealerCarFormProps {
  onSubmit: (data: CarPayload) => void;
  initialData?: CarPayload;
  isEdit?: boolean;
}

const MAX_IMAGES = 4;

export default function DealerCarForm({
  onSubmit,
  initialData,
  isEdit = false,
}: DealerCarFormProps) {
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [model, setModel] = useState(initialData?.model || "");
  const [year, setYear] = useState(
    initialData?.year || new Date().getFullYear()
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [specs, setSpecs] = useState<CarSpecs>(
    initialData?.specs || {
      engine: "",
      transmission: "",
      fuelType: "",
      horsepower: 0,
      color: "",
      acceleration: 0,
      torque: 0,
      drivetrain: "",
    }
  );
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
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

    const compressed = await Promise.all(
      filesArray.map((file) =>
        imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920 })
      )
    );

    setNewImages((prev) => [...prev, ...compressed]);
    setNewPreviews((prev) => [
      ...prev,
      ...compressed.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeExistingImage = (idx: number) =>
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  const removeNewImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uploadedUrls = await Promise.all(
        newImages.map((file) => uploadImageToCloudinary(file))
      );

      await onSubmit({
        brand,
        model,
        year,
        price,
        specs,
        images: [...existingImages, ...uploadedUrls],
        isActive: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalImages = existingImages.length + newPreviews.length;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 space-y-8"
    >
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          ["Brand", brand, setBrand],
          ["Model", model, setModel],
        ].map(([label, value, setter]: any) => (
          <div key={label}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            <input
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full rounded-xl border border-gray-300/30 bg-white/30 backdrop-blur-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300/30 bg-white/30 backdrop-blur-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300/30 bg-white/30 backdrop-blur-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          "engine",
          "transmission",
          "fuelType",
          "horsepower",
          "color",
          "acceleration",
          "torque",
          "drivetrain",
          "cartype",
        ].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={
                field === "horsepower" ||
                field === "acceleration" ||
                field === "torque"
                  ? "number"
                  : "text"
              }
              value={(specs as any)[field]}
              onChange={(e) =>
                setSpecs({
                  ...specs,
                  [field]:
                    field === "horsepower" ||
                    field === "acceleration" ||
                    field === "torque"
                      ? Number(e.target.value)
                      : e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300/30 bg-white/30 backdrop-blur-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        ))}
      </div>

      {/* Images */}
      <div>
        <label className="block text-gray-700 font-medium mb-3">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {existingImages.map((url, idx) => (
            <ImageBox
              key={idx}
              src={url}
              onRemove={() => removeExistingImage(idx)}
            />
          ))}
          {newPreviews.map((url, idx) => (
            <ImageBox
              key={idx}
              src={url}
              onRemove={() => removeNewImage(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={totalImages >= MAX_IMAGES}
          className="flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-40 transition"
        >
          <FiPlus /> Upload Image
        </button>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center cursor-pointer justify-center gap-2 w-full rounded-xl py-3 font-semibold transition ${
            isSubmitting
              ? "bg-orange-500/50 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-400"
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin" />
              {isEdit ? "Updating..." : "Adding..."}
            </>
          ) : isEdit ? (
            "Update Car"
          ) : (
            "Add Car"
          )}
        </button>
      </div>
    </form>
  );
}

/* =========================
   Image Box – Glass
========================= */
function ImageBox({ src, onRemove }: { src: string; onRemove: () => void }) {
  return (
    <div className="relative h-36 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl group">
      <Image src={src} alt="car" fill unoptimized className="object-cover" />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500/80 rounded-full p-1 text-white hover:bg-red-500 transition"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}
