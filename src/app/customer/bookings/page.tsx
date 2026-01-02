"use client";

import { TfiCar } from "react-icons/tfi";

import { motion, AnimatePresence } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface Booking {
  _id: string;
  startTime: string;
  endTime: string;
  status: string;
  car: {
    model: string;
    brand: string;
  } | null;
  dealer: {
    name: string;
  } | null;
  rating: number;
}

const fetchBookings = async (): Promise<Booking[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}customer/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
};

const cancelBooking = async (
  bookingId: string
): Promise<{ message: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}customer/bookings/${bookingId}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to cancel booking");
  }

  return res.json();
};

// Fancy Modal Component
const CancelModal = ({
  isOpen,
  onClose,
  onConfirm,
  booking,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  booking: Booking | null;
  isLoading: boolean;
}) => {
  if (!booking) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="bg-linear-to-r from-red-500 to-red-600 p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute cursor-pointer top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <FiX size={24} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FiAlertCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Cancel Booking?
                    </h3>
                    <p className="text-red-100 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border-2 border-gray-100">
                  <h4 className="font-bold text-lg mb-3 text-gray-900">
                    {booking.car
                      ? `${booking.car.brand} ${booking.car.model}`
                      : "Car Information Unavailable"}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-600">
                      <FiMapPin className="text-red-500" />
                      {booking.dealer?.name || "Dealer Information Unavailable"}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <FiCalendar className="text-red-500" />
                      {new Date(booking.startTime).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <FiClock className="text-red-500" />
                      {new Date(booking.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  Are you sure you want to cancel this booking? You may need to
                  rebook if you change your mind.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 cursor-pointer px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 cursor-pointer px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Canceling...
                      </span>
                    ) : (
                      "Yes, Cancel"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function BookingsPage() {
  const hasMounted = useHasMounted();
  const { isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: fetchBookings,
    enabled: isLoggedIn,
    retry: false,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      setModalOpen(false);
      setSelectedBooking(null);
    },
    onError: (err: Error) => {
      alert(err.message || "Failed to cancel booking");
    },
  });

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBooking) {
      cancelMutation.mutate(selectedBooking._id);
    }
  };

  // Handle unauthorized errors
  if (isError && error instanceof Error && error.message === "Unauthorized") {
    logout();
  }

  const now = new Date();
  const upcomingBookings = bookings.filter((b) => new Date(b.startTime) > now);
  if (!hasMounted || authLoading) return null;

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="py-24 text-center text-red-600">
          You must be logged in to view bookings.
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="py-24 text-center text-red-600">
          Failed to load bookings.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="py-12 bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold bg-linear-to-r  py-2 from-red-500 to-red-800 bg-clip-text text-transparent mb-12 text-center"
          >
            My Bookings
          </motion.h1>

          {/* Upcoming */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center sm:text-left">
              Upcoming Bookings
            </h2>

            {upcomingBookings.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {upcomingBookings.map((b) => {
                  const start = new Date(b.startTime);
                  const isPast = start < new Date();

                  const carIcon = (
                    <TfiCar className="text-yellow-500 w-7 h-7" />
                  );

                  return (
                    <motion.div
                      key={b._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative rounded-3xl p-6 flex flex-col justify-between shadow-lg border-l-8 border-red-400 transition-all bg-linear-to-r from-red-50 to-white backdrop-blur-md"
                    >
                      {/* Status Badge */}
                      <span
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          isPast
                            ? "bg-gray-300 text-gray-800"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {isPast ? "Past" : "Upcoming"}
                      </span>

                      {/* Car Info */}
                      <div className="mb-6 flex items-center gap-3">
                        {carIcon}
                        <h3 className="text-xl font-bold text-gray-900">
                          {b.car
                            ? `${b.car.brand} ${b.car.model}`
                            : "Car Info Unavailable"}
                        </h3>
                      </div>
                      <div className="space-y-2 text-gray-700 mb-4">
                        <p className="flex items-center gap-2">
                          <FiMapPin className="text-red-500 w-5 h-5" />
                          {b.dealer?.name || "Dealer Info Unavailable"}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiCalendar className="text-red-500 w-5 h-5" />
                          {start.toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiClock className="text-red-500 w-5 h-5" />
                          {start.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      {/* Cancel Button */}
                      {!isPast && (
                        <button
                          onClick={() => handleCancelClick(b)}
                          className="mt-auto cursor-pointer bg-red-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-md"
                        >
                          <FiX className="w-5 h-5" />
                          Cancel
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 text-lg text-center"
              >
                No upcoming bookings.
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Cancel Modal */}
      <CancelModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleConfirmCancel}
        booking={selectedBooking}
        isLoading={cancelMutation.isPending}
      />
    </main>
  );
}
