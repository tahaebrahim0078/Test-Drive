import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { User } from "@/types/admin";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetcher<User[]>(ENDPOINTS.USERS),
  });
}
