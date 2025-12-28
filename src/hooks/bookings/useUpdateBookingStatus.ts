import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { BookingRequest } from "@/types/admin";

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "pending" | "accepted" | "rejected";
    }) =>
      fetcher<BookingRequest>(`${ENDPOINTS.BOOKINGS}/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
