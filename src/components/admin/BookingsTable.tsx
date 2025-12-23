"use client";

import { BookingRequest } from "@/types/admin";

export default function BookingsTable({
  bookings,
}: {
  bookings: BookingRequest[];
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>

      <table className="w-full">
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b">
              <td className="py-4">{b.customerName}</td>
              <td>{b.carName}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
