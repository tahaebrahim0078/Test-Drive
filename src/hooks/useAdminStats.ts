import { User, BookingRequest } from "@/types/admin";

export function useAdminStats(users: User[], bookings: BookingRequest[]) {
  const customerCount = users.filter((u) => u.role === "customer").length;
  const dealerCount = users.filter((u) => u.role === "dealer").length;

  const accepted = bookings.filter((b) => b.status === "accepted").length;
  const pending = bookings.filter((b) => b.status === "pending").length;

  const acceptanceRate =
    bookings.length > 0 ? Math.round((accepted / bookings.length) * 100) : 0;

  return {
    customerCount,
    dealerCount,
    accepted,
    pending,
    acceptanceRate,
  };
}
