"use client";

import { useAdminData } from "@/hooks/useAdminData";
import { deleteUser } from "@/api/users/deleteUser";
import { toggleUserStatus } from "@/api/users/toggleUserStatus";
import { User } from "@/types/admin";

export default function AdminPage() {
  const { users, setUsers, loading } = useAdminData();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";

    const updatedUser = await toggleUserStatus(user.id, newStatus);

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? updatedUser : u))
    );
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);

    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400">
              Status: {user.status}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleToggleStatus(user)}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              Toggle
            </button>

            <button
              onClick={() => handleDeleteUser(user.id)}
              className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
