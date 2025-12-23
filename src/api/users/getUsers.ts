import api from "../axios";
import { User } from "@/types/admin";
import { ENDPOINTS } from "../endpoints";

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>(ENDPOINTS.USERS);
  return data;
}
