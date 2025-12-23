import api from "../axios";
import { BookingRequest } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function createBooking(
  payload: Partial<BookingRequest>
): Promise<BookingRequest> {
  const { data } = await api.post<BookingRequest>(ENDPOINTS.BOOKINGS, payload);
  return data;
}
