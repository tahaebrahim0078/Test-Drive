import api from "../axios";
import { User } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function toggleUserStatus(
  id: string,
  status: "active" | "inactive"
): Promise<User> {
  const { data } = await api.patch<User>(`${ENDPOINTS.USERS}/${id}/status`, {
    status,
  });
  return data;
}
