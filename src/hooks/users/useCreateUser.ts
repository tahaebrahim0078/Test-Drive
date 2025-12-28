import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { User } from "@/types/admin";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<User>) =>
      fetcher<User>(ENDPOINTS.USERS, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
