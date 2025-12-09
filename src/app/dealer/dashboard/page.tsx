"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import ClientMotion from "@/components/ClientMotion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  specs: {
    engine: string;
    power: string;
    transmission: string;
  };
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
  const [cars, setCars] = useState<Car[]>([
    {
      id: "1",
      name: "BMW 3 Series",
      category: "Luxury Sedan",
      price: 149,
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500",
      specs: {
        engine: "2.0L Turbo",
        power: "255 hp",
        transmission: "Automatic",
      },
    },
    {
      id: "2",
      name: "Mercedes C-Class",
      category: "Luxury Sedan",
      price: 169,
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500",
      specs: {
        engine: "2.0L Turbo",
        power: "255 hp",
        transmission: "Automatic",
      },
    },
  ]);

  const [bookings, setBookings] = useState<BookingRequest[]>([
    {
      id: "1",
      customerName: "Ahmed Mohamed",
      customerEmail: "ahmed@example.com",
      carId: "1",
      carName: "BMW 3 Series",
      date: "2025-12-15",
      time: "10:00 AM",
      status: "pending",
      notes: "Wants to test the car in the morning",
    },
    {
      id: "2",
      customerName: "Fatima Ali",
      customerEmail: "fatima@example.com",
      carId: "2",
      carName: "Mercedes C-Class",
      date: "2025-12-16",
      time: "2:00 PM",
      status: "pending",
      notes: "Interested in safety features",
    },
  ]);

  const [showAddCar, setShowAddCar] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const handleAcceptBooking = (id: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "accepted" as const } : b
      )
    );
  };

  const handleRejectBooking = (id: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "rejected" as const } : b
      )
    );
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCar.name && newCar.category && newCar.price) {
      setCars([
        ...cars,
        {
          id: Date.now().toString(),
          name: newCar.name,
          category: newCar.category,
          price: parseInt(newCar.price),
          image:
            newCar.image ||
            "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500",
          specs: {
            engine: "2.0L Turbo",
            power: "255 hp",
            transmission: "Automatic",
          },
        },
      ]);
      setNewCar({ name: "", category: "", price: "", image: "" });
      setShowAddCar(false);
    }
  };

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter((c) => c.id !== id));
  };

  const stats = [
    {
      label: "Available Cars",
      value: cars.length,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Booking Requests",
      value: bookings.filter((b) => b.status === "pending").length,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Accepted Bookings",
      value: bookings.filter((b) => b.status === "accepted").length,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Total",
      value: bookings.length,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["dealer"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Dealer Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage cars and booking requests
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <ClientMotion
                  key={index}
                  initial={hasMounted ? { opacity: 0, y: 20 } : false}
                  animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-linear-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
                >
                  <p className="text-sm opacity-90">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </ClientMotion>
              ))}
            </div>

            {/* Cars Section */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage Cars
                </h2>
                <button
                  onClick={() => setShowAddCar(!showAddCar)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiPlus /> Add Car
                </button>
              </div>

              {/* Add Car Form */}
              {showAddCar && (
                <ClientMotion
                  initial={hasMounted ? { opacity: 0, height: 0 } : false}
                  animate={
                    hasMounted ? { opacity: 1, height: "auto" } : undefined
                  }
                  className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <form onSubmit={handleAddCar} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Car Name"
                        value={newCar.name}
                        onChange={(e) =>
                          setNewCar({ ...newCar, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <select
                        value={newCar.category}
                        onChange={(e) =>
                          setNewCar({ ...newCar, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Luxury Sedan">Luxury Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Sports">Sports</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Price per hour"
                        value={newCar.price}
                        onChange={(e) =>
                          setNewCar({ ...newCar, price: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={newCar.image}
                        onChange={(e) =>
                          setNewCar({ ...newCar, image: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition font-semibold"
                    >
                      Add Car
                    </button>
                  </form>
                </ClientMotion>
              )}

              {/* Cars Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Car Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Category
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Price/hr
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => (
                      <tr
                        key={car.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">{car.name}</td>
                        <td className="py-4 px-4">{car.category}</td>
                        <td className="py-4 px-4">${car.price}</td>
                        <td className="py-4 px-4 flex justify-center gap-2">
                          <button
                            className="p-2 hover:bg-gray-200 rounded-lg transition"
                            title="Edit"
                          >
                            <FiEdit2 className="text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition"
                            title="Delete"
                          >
                            <FiTrash2 className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ClientMotion>

            {/* Booking Requests Section */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Requests
              </h2>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <ClientMotion
                    key={booking.id}
                    initial={hasMounted ? { opacity: 0, x: -20 } : false}
                    animate={hasMounted ? { opacity: 1, x: 0 } : undefined}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {booking.carName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Customer: {booking.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Email: {booking.customerEmail}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {booking.date} - {booking.time}
                        </p>
                        <p
                          className={`text-sm mt-1 font-semibold ${
                            booking.status === "pending"
                              ? "text-yellow-600"
                              : booking.status === "accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {booking.status === "pending"
                            ? "Pending"
                            : booking.status === "accepted"
                            ? "Accepted"
                            : "Rejected"}
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex gap-2 items-start">
                          <FiMessageSquare className="text-blue-500 mt-1" />
                          <p className="text-sm text-blue-900">
                            {booking.notes}
                          </p>
                        </div>
                      </div>
                    )}

                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptBooking(booking.id)}
                          className="flex items-center gap-2 flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition font-semibold"
                        >
                          <FiCheck /> Accept
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="flex items-center gap-2 flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition font-semibold"
                        >
                          <FiX /> Reject
                        </button>
                      </div>
                    )}
                  </ClientMotion>
                ))}
              </div>
            </ClientMotion>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
