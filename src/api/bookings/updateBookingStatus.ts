import api from "../axios";
import { BookingRequest } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function updateBookingStatus(
  id: string,
  status: "pending" | "accepted" | "rejected"
): Promise<BookingRequest> {
  const { data } = await api.patch<BookingRequest>(
    `${ENDPOINTS.BOOKINGS}/${id}/status`,
    { status }
  );
  return data;
}
