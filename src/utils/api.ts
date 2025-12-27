import { Car, fetchCarParams } from "@/types";

// Mock API functions - Replace with actual API calls when backend is ready
export async function fetchCars(params: fetchCarParams = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([_, value]) => value != null) // nullish check
  ).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/cars${
      query ? `?${query}` : ""
    }`
  );
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
}
export async function fetchCarById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/cars/${id}`
  );
  if (!res.ok)
    throw new Error(
      "OOPs, Cannot get the car right now, please check your netwrok and try again!"
    );
  return res.json();
}

export async function createBooking(bookingData: any) {
  // TODO: Replace with actual API call
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...bookingData,
    status: "confirmed",
  };
}

export async function fetchUserBookings(userId: string) {
  // TODO: Replace with actual API call
  return [];
}

export async function submitReview(reviewData: any) {
  // TODO: Replace with actual API call
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...reviewData,
  };
}
