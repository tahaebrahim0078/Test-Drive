"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import { useAuth } from "@/context/AuthContext";
import ClientMotion from "@/components/ClientMotion";
import DealerCarForm from "@/components/dealerComp/DealerCarForm";
import DealerCarsTable from "@/components/dealerComp/DealerCarsTable";
import DealerBookingsList from "@/components/dealerComp/DealerBookingsList";
import { FiPlus, FiLoader, FiAlertCircle } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  createCar,
  updateCar,
  deleteCar,
  fetchMyCars,
  fetchDealerBookings,
  updateBookingStatus,
} from "@/utils/api";
import { BookingRequest, Car } from "./typesDealer";

/* ===================== COMPONENT ===================== */

export default function DealerDashboard() {
  const hasMounted = useHasMounted();
  const { user } = useAuth();

  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  /* ===================== LOAD DATA ===================== */
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [carsData, bookingsData] = await Promise.all([
          fetchMyCars(), 
          fetchDealerBookings(user.id),
        ]);

        setCars(carsData ?? []);
        setBookings(bookingsData ?? []);
      } catch (err) {
        console.error("Error loading dealer dashboard:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  /* ===================== CAR ACTIONS ===================== */
  const handleCarSubmit = async (carData: Omit<Car, "_id">) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // ✅ إضافة isActive
      const payload: CarPayload = { ...carData, isActive: true };

      if (editingCar) {
        const updated = await updateCar(editingCar._id!, payload);
        setCars((prev) =>
          prev.map((c) => (c._id === editingCar._id ? updated : c))
        );
      } else {
        const newCar = await createCar(user.id, payload);
        setCars((prev) => [...prev, newCar]);
      }

      setShowAddCarForm(false);
      setEditingCar(null);
    } catch (err) {
      console.error("Error saving car:", err);
      setError("Failed to save car. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteCar(carId);
      setCars((prev) => prev.filter((c) => c._id !== carId));
    } catch (err) {
      console.error("Error deleting car:", err);
      setError("Failed to delete car. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ===================== BOOKINGS ===================== */
  const handleBookingAction = async (
    bookingId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateBookingStatus(bookingId, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Failed to update booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ===================== STATS ===================== */
  const stats = [
    {
      label: "Available Cars",
      value: cars.length,
      color: "from-blue-500 to-blue-600",
      icon: "🚗",
    },
    {
      label: "Pending Requests",
      value: bookings.filter((b) => b.status === "pending").length,
      color: "from-yellow-500 to-yellow-600",
      icon: "📋",
    },
    {
      label: "Accepted Bookings",
      value: bookings.filter((b) => b.status === "accepted").length,
      color: "from-green-500 to-green-600",
      icon: "✅",
    },
    {
      label: "Total Revenue",
      value: `${(cars.reduce((sum, c) => sum + c.price, 0) / 1_000_000).toFixed(
        1
      )}M`,
      color: "from-purple-500 to-purple-600",
      icon: "💰",
    },
  ];

  /* ===================== UI ===================== */
  return (
    <ProtectedRoute allowedRoles={["dealer"]}>
      <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
        <Navbar />

        <main className="flex-1 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0, y: -20 } : false}
              animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
              className="mb-8"
            >
              <h1 className="text-4xl text-black font-bold">
                Dealer Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your cars and booking requests
              </p>
            </ClientMotion>

            {/* Error */}
            {error && (
              <motion.div className="mb-6 p-4 bg-red-50 border rounded-lg flex gap-3">
                <FiAlertCircle className="text-red-600" size={22} />
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}

            {/* Loading */}
            {isLoading && cars.length === 0 && (
              <div className="flex justify-center py-12">
                <FiLoader className="animate-spin" size={40} />
              </div>
            )}

            {!isLoading && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, i) => (
                    <ClientMotion
                      key={i}
                      initial={hasMounted ? { opacity: 0, scale: 0.9 } : false}
                      animate={
                        hasMounted ? { opacity: 1, scale: 1 } : undefined
                      }
                      transition={{ delay: i * 0.1 }}
                      className={`bg-linear-to-br ${stat.color} p-6 rounded-xl text-white`}
                    >
                      <p className="text-sm opacity-90">{stat.label}</p>
                      <p className="text-4xl font-bold">{stat.value}</p>
                    </ClientMotion>
                  ))}
                </div>

                {/* Cars */}
                <div className="bg-white rounded-xl shadow p-8 mb-8">
                  <div className="flex justify-between mb-6">
                    <h2 className="text-2xl text-black font-bold">
                      Manage Cars ({cars.length})
                    </h2>
                    <button
                      onClick={() => {
                        setShowAddCarForm(true);
                        setEditingCar(null);
                      }}
                      className="flex cursor-pointer items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg"
                    >
                      <FiPlus /> Add Car
                    </button>
                  </div>

                  {showAddCarForm && (
                    <DealerCarForm
                      onSubmit={handleCarSubmit}
                      isLoading={isLoading}
                      isEdit={!!editingCar}
                      initialData={editingCar || undefined}
                    />
                  )}

                  <DealerCarsTable
                    cars={cars}
                    onEdit={(car) => {
                      setEditingCar(car);
                      setShowAddCarForm(true);
                    }}
                    onDelete={handleDeleteCar}
                    isLoading={isLoading}
                  />
                </div>

                {/* Bookings */}
                <div className="bg-white rounded-xl shadow p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Booking Requests ({bookings.length})
                  </h2>

                  <DealerBookingsList
                    bookings={bookings}
                    onAccept={(id) => handleBookingAction(id, "accepted")}
                    onReject={(id) => handleBookingAction(id, "rejected")}
                    isLoading={isLoading}
                  />
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
