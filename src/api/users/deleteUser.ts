import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`${ENDPOINTS.USERS}/${id}`);
}
