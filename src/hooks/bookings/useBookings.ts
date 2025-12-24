import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { BookingRequest } from "@/types/admin";

export function useBookings() {
  return useQuery<BookingRequest[]>({
    queryKey: ["bookings"],
    queryFn: () => fetcher<BookingRequest[]>(ENDPOINTS.BOOKINGS),
  });
}
