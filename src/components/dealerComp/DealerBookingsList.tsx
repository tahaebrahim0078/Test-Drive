"use client";

import { motion } from "framer-motion";
import { FiCheck, FiX, FiMessageSquare } from "react-icons/fi";

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

interface DealerBookingsListProps {
  bookings: BookingRequest[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isLoading?: boolean;
}

export default function DealerBookingsList({
  bookings,
  onAccept,
  onReject,
  isLoading = false,
}: DealerBookingsListProps) {
  const pendingBookings = bookings.filter((b) => b.status === "pending");

  if (bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-gray-50 rounded-lg"
      >
        <p className="text-gray-500 text-lg">No booking requests</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Pending Bookings */}
      {pendingBookings.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Pending Requests ({pendingBookings.length})
          </h3>
          <div className="space-y-3">
            {pendingBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-l-4 border-yellow-500 rounded-lg p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {booking.carName}
                    </h4>
                    <p className="text-gray-600">
                      Customer:{" "}
                      <span className="font-medium">
                        {booking.customerName}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Email:{" "}
                      <a
                        href={`mailto:${booking.customerEmail}`}
                        className="text-blue-500 hover:underline"
                      >
                        {booking.customerEmail}
                      </a>
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Pending
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {booking.time}
                    </p>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mb-4 bg-blue-50 p-3 rounded flex gap-2">
                    <FiMessageSquare className="text-blue-600 shrink-0 mt-1" />
                    <p className="text-sm text-gray-700">{booking.notes}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => onAccept(booking.id)}
                    disabled={isLoading}
                    className="flex items-center gap-2 flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    <FiCheck size={18} />
                    Accept
                  </button>
                  <button
                    onClick={() => onReject(booking.id)}
                    disabled={isLoading}
                    className="flex items-center gap-2 flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    <FiX size={18} />
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Completed/Rejected Bookings */}
      {bookings.filter((b) => b.status !== "pending").length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8">
            Completed Requests
          </h3>
          <div className="space-y-2">
            {bookings
              .filter((b) => b.status !== "pending")
              .map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg flex justify-between items-center ${
                    booking.status === "accepted"
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "bg-red-50 border-l-4 border-red-500"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.carName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.customerName}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {booking.status === "accepted" ? "Accepted" : "Rejected"}
                  </span>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
