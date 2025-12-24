import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { BookingRequest } from "@/types/admin";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<BookingRequest>) =>
      fetcher<BookingRequest>(ENDPOINTS.BOOKINGS, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}



// way of using it >> 
// const { mutate: createBooking, isPending } = useCreateBooking();

// createBooking({
//   userId: "123",
//   date: "2025-01-10",
// });
