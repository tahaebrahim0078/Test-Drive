import api from "../axios";
import { BookingRequest } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function getBookingById(id: string): Promise<BookingRequest> {
  const { data } = await api.get<BookingRequest>(`${ENDPOINTS.BOOKINGS}/${id}`);
  return data;
}
