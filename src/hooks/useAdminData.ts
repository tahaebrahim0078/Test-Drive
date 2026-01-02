// "use client";

// import { useEffect, useState } from "react";
// import { User, BookingRequest } from "@/types/admin";
// import { getUsers } from "@/api/users/getUsers";
// import { getBookings } from "@/api/bookings/getBookings";

// export function useAdminData() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [bookings, setBookings] = useState<BookingRequest[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [usersData, bookingsData] = await Promise.all([
//           getUsers(),
//           getBookings(),
//         ]);

//         setUsers(usersData);
//         setBookings(bookingsData);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadData();
//   }, []);

//   return {
//     users,
//     setUsers,
//     bookings,
//     loading,
//   };
// }
