"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import ClientMotion from "@/components/ClientMotion";
import {
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
} from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "dealer" | "admin";
  joinDate: string;
  status: "active" | "inactive";
}

interface BookingRequest {
  id: string;
  customerName: string;
  dealerName: string;
  carName: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
}

export default function AdminDashboard() {
  const hasMounted = useHasMounted();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      role: "customer",
      joinDate: "2025-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Fatima Ali",
      email: "fatima@example.com",
      role: "customer",
      joinDate: "2025-02-20",
      status: "active",
    },
    {
      id: "3",
      name: "Mohamed Salem - Dealer",
      email: "dealer@example.com",
      role: "dealer",
      joinDate: "2024-12-01",
      status: "active",
    },
    {
      id: "4",
      name: "Ali Ahmed",
      email: "ali@example.com",
      role: "customer",
      joinDate: "2025-03-10",
      status: "inactive",
    },
  ]);

  const [bookings] = useState<BookingRequest[]>([
    {
      id: "1",
      customerName: "Ahmed Mohamed",
      dealerName: "Mohamed Salem",
      carName: "BMW 3 Series",
      date: "2025-12-15",
      status: "pending",
    },
    {
      id: "2",
      customerName: "Fatima Ali",
      dealerName: "Mohamed Salem",
      carName: "Mercedes C-Class",
      date: "2025-12-16",
      status: "accepted",
    },
    {
      id: "3",
      customerName: "Ali Ahmed",
      dealerName: "Mohamed Salem",
      carName: "Audi A4",
      date: "2025-12-17",
      status: "rejected",
    },
  ]);

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: FiUsers,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Dealers",
      value: users.filter((u) => u.role === "dealer").length,
      icon: FiTrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Accepted Bookings",
      value: bookings.filter((b) => b.status === "accepted").length,
      icon: FiCheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Pending Bookings",
      value: bookings.filter((b) => b.status === "pending").length,
      icon: FiAlertCircle,
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const customerCount = users.filter((u) => u.role === "customer").length;
  const dealerCount = users.filter((u) => u.role === "dealer").length;
  const acceptanceRate =
    bookings.length > 0
      ? Math.round(
          (bookings.filter((b) => b.status === "accepted").length /
            bookings.length) *
            100
        )
      : 0;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage users, bookings and system settings
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <ClientMotion
                    key={index}
                    initial={hasMounted ? { opacity: 0, y: 20 } : false}
                    animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-linear-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-90">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      </div>
                      <Icon className="text-2xl opacity-50" />
                    </div>
                  </ClientMotion>
                );
              })}
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <ClientMotion
                initial={hasMounted ? { opacity: 0 } : false}
                animate={hasMounted ? { opacity: 1 } : undefined}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-gray-600 text-sm font-semibold mb-2">
                  Acceptance Rate
                </h3>
                <div className="flex items-end gap-4">
                  <p className="text-4xl font-bold text-green-600">
                    {acceptanceRate}%
                  </p>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${acceptanceRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </ClientMotion>

              <ClientMotion
                initial={hasMounted ? { opacity: 0 } : false}
                animate={hasMounted ? { opacity: 1 } : undefined}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-gray-600 text-sm font-semibold mb-2">
                  User Distribution
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>عملاء</span>
                    <span className="font-bold">{customerCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>وكالات</span>
                    <span className="font-bold">{dealerCount}</span>
                  </div>
                </div>
              </ClientMotion>

              <motion.div
                initial={hasMounted ? { opacity: 0 } : false}
                animate={hasMounted ? { opacity: 1 } : undefined}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-gray-600 text-sm font-semibold mb-2">
                  Total Bookings
                </h3>
                <p className="text-4xl font-bold text-blue-600">
                  {bookings.length}
                </p>
              </motion.div>
            </div>

            {/* Users Section */}
            <ClientMotion
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Users</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Role
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Joined
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 font-medium">{user.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : user.role === "dealer"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role === "admin"
                              ? "Admin"
                              : user.role === "dealer"
                              ? "Dealer"
                              : "Customer"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {user.joinDate}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {user.status === "active" ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition"
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

            {/* Bookings Section */}
            <motion.div
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Bookings
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Customer
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Dealer
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Car
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 font-medium">
                          {booking.customerName}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {booking.dealerName}
                        </td>
                        <td className="py-4 px-4 text-sm">{booking.carName}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {booking.date}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status === "accepted"
                              ? "Accepted"
                              : booking.status === "pending"
                              ? "Pending"
                              : "Rejected"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
