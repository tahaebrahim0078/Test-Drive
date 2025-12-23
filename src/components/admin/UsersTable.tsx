"use client";

import { User } from "@/types/admin";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  users: User[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function UsersTable({ users, onDelete, onToggleStatus }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      <table className="w-full">
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-4">{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => onToggleStatus(user.id)}>
                  {user.status}
                </button>
              </td>
              <td>
                <button onClick={() => onDelete(user.id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
