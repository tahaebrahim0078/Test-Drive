"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import {
  FiLoader,
  FiAlertCircle,
  FiPlus,
  FiX,
  FiTruck,
  FiClipboard,
  FiLayers,
  FiDollarSign,
} from "react-icons/fi";

import useHasMounted from "@/hooks/useHasMounted";
import { useAuth } from "@/context/AuthContext";
import DealerCarsTable from "@/components/dealerComp/DealerCarsTable";
import DealerBookingsList from "@/components/dealerComp/DealerBookingsList";
import DealerCarForm from "@/components/dealerComp/DealerCarForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  fetchMyCars,
  fetchDealerBookings,
  deleteCar,
  createCar,
  updateCar,
} from "@/utils/api";
import { BookingRequest, CarPayload } from "./typesDealer";
import { Car } from "@/types";

export default function DealerDashboard() {
  const hasMounted = useHasMounted();
  const { user } = useAuth();

  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [carsData, bookingsData] = await Promise.all([
          fetchMyCars(),
          fetchDealerBookings(),
        ]);

        setCars(carsData ?? []);
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleDeleteCar = async (carId: string) => {
    try {
      setIsLoading(true);
      await deleteCar(carId);
      setCars((prev) => prev.filter((c) => c._id !== carId));
    } catch {
      setError("Failed to delete car.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCar = async (payload: CarPayload) => {
    if (!user?._id) return;

    try {
      setIsLoading(true);

      if (editingCar?._id) {
        const updated = await updateCar(editingCar._id, payload);
        setCars((prev) =>
          prev.map((c) => (c._id === updated._id ? updated : c))
        );
      } else {
        const created = await createCar(user._id, payload);
        setCars((prev) => [created, ...prev]);
      }

      setIsModalOpen(false);
      setEditingCar(null);
    } catch {
      setError("Failed to save car.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setIsModalOpen(true);
  };

  if (!hasMounted) return null;

  const stats = [
    {
      label: "Available Cars",
      value: cars.length,
      icon: FiTruck,
    },
    {
      label: "Booked Requests",
      value: bookings.filter((b) => b.isBooked).length,
      icon: FiClipboard,
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: FiLayers,
    },
    {
      label: "Total Revenue",
      value: `${(cars.reduce((s, c) => s + c.price, 0) / 1_000_000).toFixed(
        1
      )}M`,
      icon: FiDollarSign,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["dealer"]}>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <main className="flex-1 pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-3xl font-semibold">Dealer Dashboard</h1>
              <p className="text-sm text-gray-500 mt-2">
                Premium vehicle & booking management
              </p>
            </motion.div>

            {/* Error */}
            {error && (
              <div className="mb-8 rounded-2xl bg-red-50 border border-red-200 p-4 flex gap-3">
                <FiAlertCircle className="text-red-500" size={20} />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Loading */}
            {isLoading ? (
              <div className="flex justify-center py-24">
                <FiLoader className="animate-spin text-orange-500" size={42} />
              </div>
            ) : (
              <>
                {/* ================= STATS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative group overflow-hidden rounded-3xl bg-white/20 backdrop-blur-md border border-gray-200 p-6 shadow-md flex flex-col justify-between transition-all duration-500"
                      >
                        {/* Glow */}
                        <div className="absolute -top-20 -right-20 w-56 h-56 bg-linear-to-r from-orange-200 via-orange-300 to-yellow-200 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm text-gray-600 font-medium">
                            {stat.label}
                          </p>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-tr from-orange-100 to-orange-300 text-orange-600">
                            <Icon size={22} />
                          </div>
                        </div>

                        {/* Value */}
                        <p className="mt-3 text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>

                        {/* Gradient underline */}
                        <div className="mt-3 h-1 w-full rounded-full bg-linear-to-r from-orange-400 via-orange-500 to-yellow-400" />
                      </motion.div>
                    );
                  })}
                </div>

                {/* ================= CARS ================= */}
                <div className="mb-14 rounded-3xl bg-white/20 backdrop-blur-md shadow-md border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      Manage Cars{" "}
                      <span className="ml-2 text-gray-500">
                        ({cars.length})
                      </span>
                    </h2>

                    <button
                      onClick={handleAddCar}
                      className="flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-tr from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition shadow-lg text-white"
                    >
                      <FiPlus />
                      Add Car
                    </button>
                  </div>

                  <DealerCarsTable
                    cars={cars}
                    onEdit={handleEditCar}
                    onDelete={handleDeleteCar}
                    isLoading={isLoading}
                  />
                </div>

                {/* ================= BOOKINGS ================= */}
                <div className="rounded-3xl bg-white/20 backdrop-blur-md border shadow-md border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Booking Requests{" "}
                    <span className="ml-2 text-gray-500">
                      ({bookings.length})
                    </span>
                  </h2>

                  <DealerBookingsList
                    bookings={bookings}
                    isLoading={isLoading}
                  />
                </div>
              </>
            )}
          </div>
        </main>

        {/* ================= MODAL ================= */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50"
        >
          <div className="flex items-end sm:items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 w-full max-w-3xl max-h-dvh sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-white/20 backdrop-blur-md border border-gray-200 shadow-lg flex flex-col"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute z-10 top-4 right-4 p-1 rounded-full text-orange-700 hover:text-orange-400 hover:rotate-90 duration-200 cursor-pointer"
              >
                <FiX size={27} />
              </button>

              <div className="overflow-y-auto px-6 pt-6 pb-32">
                <DealerCarForm
                  initialData={
                    editingCar
                      ? {
                          brand: editingCar.brand,
                          model: editingCar.model,
                          year: editingCar.year ?? new Date().getFullYear(),
                          price: editingCar.price,
                          specs: editingCar.specs,
                          features: editingCar.features,
                          images: editingCar.images ?? [],
                          isActive: editingCar.isActive ?? true,
                        }
                      : undefined
                  }
                  isEdit={!!editingCar}
                  onSubmit={handleSubmitCar}
                />
              </div>
            </motion.div>
          </div>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
