"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import { FiCalendar, FiClock, FiMapPin, FiStar, FiX, FiAlertCircle } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface Booking {
  _id: string;
  startTime: string;
  endTime: string;
  status: string;
  car: {
    name: string;
    model: string;
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

const cancelBooking = async (bookingId: string): Promise<{ message: string }> => {
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
  isLoading 
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
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <FiX size={24} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FiAlertCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Cancel Booking?</h3>
                    <p className="text-red-100 text-sm">This action cannot be undone</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border-2 border-gray-100">
                  <h4 className="font-bold text-lg mb-3 text-gray-900">
                    {booking.car ? `${booking.car.name} ${booking.car.model}` : "Car Information Unavailable"}
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
                  Are you sure you want to cancel this booking? You may need to rebook if you change your mind.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
  const completedBookings = bookings.filter((b) => new Date(b.endTime) < now);

  if (!hasMounted || authLoading) return null;

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="py-24 text-center text-red-600">
          You must be logged in to view bookings.
        </div>
        <Footer />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="py-24 text-center text-red-600">
          Failed to load bookings.
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12"
          >
            My Bookings
          </motion.h1>

          {/* Upcoming */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Upcoming Bookings
            </h2>

            {upcomingBookings.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {upcomingBookings.map((b) => {
                  const start = new Date(b.startTime);

                  return (
                    <motion.div
                      key={b._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white border-2 border-red-600 rounded-2xl p-6 flex justify-between items-start shadow-lg shadow-red-100 hover:shadow-xl hover:shadow-red-200 transition-shadow"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {b.car ? `${b.car.name} ${b.car.model}` : "Car Information Unavailable"}
                        </h3>
                        <div className="mt-3 space-y-2">
                          <p className="flex items-center gap-2 text-gray-600">
                            <FiMapPin className="text-red-600" /> {b.dealer?.name || "Dealer Information Unavailable"}
                          </p>
                          <p className="flex items-center gap-2 text-gray-600">
                            <FiCalendar className="text-red-600" /> {start.toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-2 text-gray-600">
                            <FiClock className="text-red-600" />{" "}
                            {start.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCancelClick(b)}
                        className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all font-semibold hover:scale-105 active:scale-95"
                      >
                        Cancel
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 text-lg"
              >
                No upcoming bookings.
              </motion.p>
            )}
          </div>

          {/* Completed */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Completed Bookings
            </h2>

            {completedBookings.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {completedBookings.map((b) => (
                  <motion.div
                    key={b._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex justify-between items-start shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div>
                      <h3 className="font-bold text-2xl text-gray-900">
                        {b.car ? `${b.car.name} ${b.car.model}` : "Car Information Unavailable"}
                      </h3>
                      <p className="flex items-center gap-2 text-gray-600 mt-3">
                        <FiMapPin className="text-gray-400" /> {b.dealer?.name || "Dealer Information Unavailable"}
                      </p>
                    </div>

                    <div>
                      {b.rating !== null ? (
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={20}
                              className={
                                i < b.rating
                                  ? "text-orange-400 fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={`/review/${b._id}`}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 inline-block"
                        >
                          Leave Review
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 text-lg"
              >
                No completed bookings.
              </motion.p>
            )}
          </div>
        </div>
      </section>

      <Footer />

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