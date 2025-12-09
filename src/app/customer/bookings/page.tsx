"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import { FiCalendar, FiClock, FiMapPin, FiStar } from "react-icons/fi";

const mockBookings = [
  {
    id: 1,
    carName: "BMW 3 Series",
    dealer: "BMW Downtown",
    date: "Dec 10, 2024",
    time: "2:00 PM",
    status: "Confirmed",
    rating: 0,
  },
  {
    id: 2,
    carName: "Mercedes C-Class",
    dealer: "Mercedes Central",
    date: "Dec 5, 2024",
    time: "10:00 AM",
    status: "Completed",
    rating: 5,
  },
  {
    id: 3,
    carName: "Audi Q5",
    dealer: "Audi Prestige",
    date: "Dec 15, 2024",
    time: "3:00 PM",
    status: "Confirmed",
    rating: 0,
  },
];

export default function BookingsPage() {
  const hasMounted = useHasMounted();
  const upcomingBookings = mockBookings.filter((b) => b.status === "Confirmed");
  const completedBookings = mockBookings.filter(
    (b) => b.status === "Completed"
  );

  return (
    <main>
      <Navbar />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">
            My Bookings
          </h1>

          {/* Upcoming Bookings */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upcoming Bookings
            </h2>
            {upcomingBookings.length > 0 ? (
              <motion.div
                initial={hasMounted ? { opacity: 0 } : false}
                animate={hasMounted ? { opacity: 1 } : undefined}
                className="space-y-4"
              >
                {upcomingBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    whileHover={{ x: 5 }}
                    className="bg-white border-2 border-red-600 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {booking.carName}
                      </h3>
                      <div className="space-y-1 text-gray-600">
                        <p className="flex items-center gap-2">
                          <FiMapPin size={16} />
                          {booking.dealer}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiCalendar size={16} />
                          {booking.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiClock size={16} />
                          {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition">
                        Reschedule
                      </button>
                      <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium px-4 py-2 rounded-lg transition">
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-600">
                No upcoming bookings. Start booking today!
              </p>
            )}
          </div>

          {/* Completed Bookings */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Completed Bookings
            </h2>
            {completedBookings.length > 0 ? (
              <motion.div
                initial={hasMounted ? { opacity: 0 } : false}
                animate={hasMounted ? { opacity: 1 } : undefined}
                className="space-y-4"
              >
                {completedBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    whileHover={{ x: 5 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {booking.carName}
                      </h3>
                      <div className="space-y-1 text-gray-600">
                        <p className="flex items-center gap-2">
                          <FiMapPin size={16} />
                          {booking.dealer}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiCalendar size={16} />
                          {booking.date}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
                      {booking.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`${
                                i < booking.rating
                                  ? "text-orange-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              size={18}
                            />
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={`/review/${booking.id}`}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition text-center"
                        >
                          Leave Review
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-600">No completed bookings yet.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
