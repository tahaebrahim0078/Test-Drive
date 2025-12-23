"use client";

import ClientMotion from "@/components/ClientMotion";
import {
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface Props {
  usersCount: number;
  dealersCount: number;
  acceptedBookings: number;
  pendingBookings: number;
}

export default function StatsCards({
  usersCount,
  dealersCount,
  acceptedBookings,
  pendingBookings,
}: Props) {
  const stats = [
    { label: "Total Users", value: usersCount, icon: FiUsers },
    { label: "Dealers", value: dealersCount, icon: FiTrendingUp },
    {
      label: "Accepted Bookings",
      value: acceptedBookings,
      icon: FiCheckCircle,
    },
    { label: "Pending Bookings", value: pendingBookings, icon: FiAlertCircle },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <ClientMotion key={i} className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </ClientMotion>
      ))}
    </div>
  );
}
