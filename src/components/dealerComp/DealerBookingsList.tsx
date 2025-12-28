import { BookingRequest } from "@/app/dealer/dashboard/typesDealer";
import { motion } from "framer-motion";
import { FiPhone, FiFileText, FiClock } from "react-icons/fi";

interface Props {
  bookings: BookingRequest[];
  isLoading?: boolean;
}

export default function DealerBookingsList({ bookings, isLoading }: Props) {
  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-400">
        Loading booking requests…
      </p>
    );
  }

  if (!bookings.length) {
    return (
      <p className="text-center py-10 text-gray-400">
        No booking requests yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map((b, i) => (
        <motion.div
          key={b._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, ease: "easeOut" }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="group border border-gray-300 rounded-3xl p-5 shadow-xl "
        >
          {/* Header */}
          <div className="mb-4 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{b.bookedBy.name}</h3>

              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <FiPhone /> {b.bookedBy.phone || "N/A"}
              </p>

              {b.notes && (
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <FiFileText /> {b.notes}
                </p>
              )}
            </div>

            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur border transition ${
                b.isBooked
                  ? "bg-green-500/30 text-green-800 border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
              }`}
            >
              {b.isBooked ? "Booked" : "Pending"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4" />

          {/* Car Info */}
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium text-gray-900">
              {b.car.brand} {b.car.model}
              <span className="text-gray-400"> ({b.car.year})</span>
            </p>

            <p className="flex items-center text-orange-500 gap-2">
              <FiClock />
              <span className="text-orange-700">From</span>{" "}
              {new Date(b.startTime).toLocaleString()}
              <span className="text-orange-700">To</span>{" "}
              {new Date(b.endTime).toLocaleString()}
            </p>
          </div>

          {/* Hover Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}
    </div>
  );
}
