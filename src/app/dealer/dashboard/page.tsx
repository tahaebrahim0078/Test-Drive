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
  fetchDealerCars,
  fetchDealerBookings,
  updateBookingStatus,
} from "@/utils/api";

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
  dealerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BookingRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  carId: string;
  carName: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "rejected";
  notes: string;
}

export default function DealerDashboard() {
  const hasMounted = useHasMounted();
  const { user, role } = useAuth();

  // State Management
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if user is logged in and is a dealer
        if (!user || role !== "dealer") {
          throw new Error("Unauthorized: Only dealers can access this page");
        }

        // Fetch dealer's cars and bookings
        const [carsData, bookingsData] = await Promise.all([
          fetchDealerCars(user.id),
          fetchDealerBookings(user.id),
        ]);

        setCars(carsData || []);
        setBookings((bookingsData as BookingRequest[]) || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load dashboard data";
        setError(errorMessage);
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, role]);

  // Handle Car Creation/Update
  const handleCarSubmit = async (carData: Omit<Car, "id" | "dealerId">) => {
    try {
      setIsLoading(true);
      setError(null);

      if (editingCar) {
        // Update existing car
        const updated = await updateCar(editingCar.id, carData);
        setCars(cars.map((c) => (c.id === editingCar.id ? updated : c)));
      } else {
        // Create new car
        if (!user) throw new Error("User not authenticated");
        const newCar = await createCar(user.id, carData);
        setCars([...cars, newCar]);
      }

      setShowAddCarForm(false);
      setEditingCar(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save car";
      setError(errorMessage);
      console.error("Car submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Car Deletion
  const handleDeleteCar = async (carId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await deleteCar(carId);
      setCars(cars.filter((c) => c.id !== carId));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete car";
      setError(errorMessage);
      console.error("Delete error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Booking Status Update
  const handleBookingAction = async (
    bookingId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await updateBookingStatus(bookingId, status);
      setBookings(
        bookings.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update booking";
      setError(errorMessage);
      console.error("Booking update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate Stats
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
      value: `${(cars.reduce((sum, c) => sum + c.price, 0) / 1000000).toFixed(
        1
      )}M`,
      color: "from-purple-500 to-purple-600",
      icon: "💰",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["dealer"]}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0, y: -20 } : false}
              animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900">
                Dealer Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Manage your cars and booking requests
              </p>
            </ClientMotion>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
              >
                <FiAlertCircle className="text-red-600" size={24} />
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && cars.length === 0 && (
              <div className="flex justify-center items-center py-12">
                <FiLoader className="animate-spin text-blue-600" size={40} />
              </div>
            )}

            {!isLoading && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <ClientMotion
                      key={index}
                      initial={hasMounted ? { opacity: 0, scale: 0.9 } : false}
                      animate={
                        hasMounted ? { opacity: 1, scale: 1 } : undefined
                      }
                      transition={{ delay: index * 0.1 }}
                      className={`bg-linear-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium opacity-90">
                            {stat.label}
                          </p>
                          <p className="text-4xl font-bold mt-2">
                            {stat.value}
                          </p>
                        </div>
                        <span className="text-4xl">{stat.icon}</span>
                      </div>
                    </ClientMotion>
                  ))}
                </div>

                {/* Add Car Form Section */}
                {showAddCarForm && (
                  <ClientMotion
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mb-8"
                  >
                    <DealerCarForm
                      onSubmit={handleCarSubmit}
                      isLoading={isLoading}
                      isEdit={!!editingCar}
                      initialData={editingCar || undefined}
                    />
                    <button
                      onClick={() => {
                        setShowAddCarForm(false);
                        setEditingCar(null);
                      }}
                      className="mt-4 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </ClientMotion>
                )}

                {/* Cars Section */}
                {!showAddCarForm && (
                  <ClientMotion
                    initial={hasMounted ? { opacity: 0, y: 20 } : false}
                    animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-8 mb-8"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Manage Cars ({cars.length})
                      </h2>
                      <button
                        onClick={() => {
                          setShowAddCarForm(true);
                          setEditingCar(null);
                        }}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        <FiPlus size={20} />
                        Add New Car
                      </button>
                    </div>

                    <DealerCarsTable
                      cars={cars}
                      onEdit={(car) => {
                        setEditingCar(car);
                        setShowAddCarForm(true);
                      }}
                      onDelete={handleDeleteCar}
                      isLoading={isLoading}
                    />
                  </ClientMotion>
                )}

                {/* Bookings Section */}
                <ClientMotion
                  initial={hasMounted ? { opacity: 0, y: 20 } : false}
                  animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Booking Requests ({bookings.length})
                  </h2>

                  <DealerBookingsList
                    bookings={bookings}
                    onAccept={(id) => handleBookingAction(id, "accepted")}
                    onReject={(id) => handleBookingAction(id, "rejected")}
                    isLoading={isLoading}
                  />
                </ClientMotion>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
