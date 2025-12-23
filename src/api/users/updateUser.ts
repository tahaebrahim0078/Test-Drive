import api from "../axios";
import { User } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function updateUser(
  id: string,
  payload: Partial<User>
): Promise<User> {
  const { data } = await api.put<User>(`${ENDPOINTS.USERS}/${id}`, payload);
  return data;
}
