import { BookingRequest } from "@/types/admin";

export function getBookingStats(bookings: BookingRequest[]) {
  const accepted = bookings.filter(b => b.status === "accepted").length;
  const pending = bookings.filter(b => b.status === "pending").length;

  return { accepted, pending };
}
