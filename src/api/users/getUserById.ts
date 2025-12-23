import api from "../axios";
import { User } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function getUserById(id: string): Promise<User> {
  const { data } = await api.get<User>(`${ENDPOINTS.USERS}/${id}`);
  return data;
}
