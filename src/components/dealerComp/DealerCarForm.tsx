"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";

interface CarFormData {
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

interface DealerCarFormProps {
  onSubmit: (data: CarFormData) => Promise<void>;
  isLoading?: boolean;
  initialData?: CarFormData;
  isEdit?: boolean;
}

export default function DealerCarForm({
  onSubmit,
  isLoading = false,
  initialData,
  isEdit = false,
}: DealerCarFormProps) {
  const [formData, setFormData] = useState<CarFormData>(
    initialData || {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      images: [],
      specs: {
        engine: "",
        transmission: "Automatic",
        fuelType: "Petrol",
        horsepower: 0,
        color: "",
      },
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)
      newErrors.year = "Please enter a valid year";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.images.filter((img) => img.trim()).length === 0)
      newErrors.images = "At least one image URL is required";
    if (!formData.specs.engine.trim()) newErrors.engine = "Engine is required";
    if (!formData.specs.color.trim()) newErrors.color = "Color is required";
    if (formData.specs.horsepower <= 0)
      newErrors.horsepower = "Horsepower must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit({
        ...formData,
        images: formData.images.filter((img) => img.trim()),
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const updateNestedField = (
    section: "specs",
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // URL-input image handler removed: images are uploaded via file picker / Cloudinary
  const MAX_IMAGES = 4;
  const MAX_FILE_SIZE_MB = Number(process.env.NEXT_PUBLIC_MAX_IMAGE_MB || "5");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>(
    {}
  );

  const uploadToCloudinary = (file: File, index: number) => {
    return new Promise<string>((resolve, reject) => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      if (!cloudName || !uploadPreset) {
        reject(new Error("Cloudinary not configured (env vars missing)"));
        return;
      }

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress((p) => ({ ...p, [index]: percent }));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res.secure_url || res.url);
          } catch {
            reject(new Error("Invalid Cloudinary response"));
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error("Upload network error"));
      xhr.send(form);
    });
  };

  const handleAddImageFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, images: "Only image files allowed" }));
      return;
    }
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_SIZE_MB) {
      setErrors((prev) => ({
        ...prev,
        images: `Each image must be <= ${MAX_FILE_SIZE_MB} MB`,
      }));
      return;
    }

    if (formData.images.length >= MAX_IMAGES) {
      setErrors((prev) => ({
        ...prev,
        images: `Maximum ${MAX_IMAGES} images allowed`,
      }));
      return;
    }

    // Reserve slot
    const slotIndex = formData.images.length;
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));

    try {
      const uploadedUrl = await uploadToCloudinary(file, slotIndex);
      setFormData((prev) => {
        const imgs = [...prev.images];
        imgs[slotIndex] = uploadedUrl;
        return { ...prev, images: imgs };
      });
      setErrors((prev) => {
        const n = { ...prev };
        delete n.images;
        return n;
      });
    } catch (err) {
      const message = (err as Error)?.message || "Upload failed";
      console.error("Upload error:", message);
      setErrors((prev) => ({ ...prev, images: message }));
      // remove reserved slot
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== slotIndex),
      }));
    } finally {
      setUploadProgress((p) => ({ ...p, [slotIndex]: 0 }));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleAddImageFile(file);
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addImageField = () => {
    if (formData.images.length >= MAX_IMAGES) return;
    // trigger file picker
    fileInputRef.current?.click();
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setUploadProgress((p) => {
      const n = { ...p };
      delete n[index];
      return n;
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-8 max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        {isEdit ? "Edit Car" : "Add New Car"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand *
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, brand: e.target.value }))
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.brand
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="e.g., BMW"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
          )}
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, model: e.target.value }))
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.model
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="e.g., X5"
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                year: parseInt(e.target.value),
              }))
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.year
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="2024"
          />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (SAR) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: parseFloat(e.target.value),
              }))
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.price
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="1500000"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color *
          </label>
          <input
            type="text"
            value={formData.specs.color}
            onChange={(e) =>
              updateNestedField("specs", "color", e.target.value)
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.color
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="Black"
          />
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color}</p>
          )}
        </div>

        {/* Engine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine *
          </label>
          <input
            type="text"
            value={formData.specs.engine}
            onChange={(e) =>
              updateNestedField("specs", "engine", e.target.value)
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.engine
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="3.0L Turbo"
          />
          {errors.engine && (
            <p className="text-red-500 text-sm mt-1">{errors.engine}</p>
          )}
        </div>

        {/* Horsepower */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horsepower *
          </label>
          <input
            type="number"
            value={formData.specs.horsepower}
            onChange={(e) =>
              updateNestedField("specs", "horsepower", parseInt(e.target.value))
            }
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
              errors.horsepower
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="340"
          />
          {errors.horsepower && (
            <p className="text-red-500 text-sm mt-1">{errors.horsepower}</p>
          )}
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmission
          </label>
          <select
            value={formData.specs.transmission}
            onChange={(e) =>
              updateNestedField("specs", "transmission", e.target.value)
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type
          </label>
          <select
            value={formData.specs.fuelType}
            onChange={(e) =>
              updateNestedField("specs", "fuelType", e.target.value)
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
      </div>

      {/* Images Section (Cloudinary upload, max 4 images) */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Car Images * (min 1, max 4 images)
        </label>
        {errors.images && (
          <p className="text-red-500 text-sm mb-3">{errors.images}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          {formData.images.length === 0 && (
            <div className="col-span-2 md:col-span-4 text-center text-sm text-gray-500 py-6 border border-dashed rounded">
              No images uploaded yet
            </div>
          )}

          {formData.images.map((url, idx) => (
            <div key={idx} className="relative group">
              <div className="w-full h-36 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt={`car-${idx}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-gray-400">Uploading...</div>
                )}
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  className="p-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  <FiX />
                </button>
              </div>

              {uploadProgress[idx] > 0 && uploadProgress[idx] < 100 && (
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-1 bg-gray-200">
                    <div
                      className="h-1 bg-blue-500"
                      style={{ width: `${uploadProgress[idx]}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={addImageField}
            disabled={formData.images.length >= MAX_IMAGES}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50"
          >
            <FiPlus size={18} />
            {formData.images.length >= MAX_IMAGES
              ? "Max images reached"
              : "Upload Image"}
          </button>

          <button
            type="button"
            onClick={() => {
              // allow marketplace: paste external URL
              const url = prompt("Paste image URL:");
              if (url) {
                if (formData.images.length >= MAX_IMAGES) {
                  setErrors((prev) => ({
                    ...prev,
                    images: `Maximum ${MAX_IMAGES} images allowed`,
                  }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, url],
                  }));
                }
              }
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
          >
            Paste URL
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
        >
          {isLoading ? "Saving..." : isEdit ? "Update Car" : "Add Car"}
        </button>
      </div>
    </motion.form>
  );
}
