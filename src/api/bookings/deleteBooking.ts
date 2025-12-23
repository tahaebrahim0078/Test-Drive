import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export async function deleteBooking(id: string): Promise<void> {
  await api.delete(`${ENDPOINTS.BOOKINGS}/${id}`);
}
