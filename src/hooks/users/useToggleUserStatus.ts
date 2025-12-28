import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { User } from "@/types/admin";

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "active" | "inactive";
    }) =>
      fetcher<User>(`${ENDPOINTS.USERS}/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
