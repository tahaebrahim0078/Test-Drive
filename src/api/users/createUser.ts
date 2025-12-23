import api from "../axios";
import { User } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function createUser(payload: Partial<User>): Promise<User> {
  const { data } = await api.post<User>(ENDPOINTS.USERS, payload);
  return data;
}
