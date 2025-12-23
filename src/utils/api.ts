import { BookingData, Car, fetchCarParams, ReviewData } from "@/types";
import { apiCall } from "./apiCall";

// Mock API functions - Replace with actual API calls when backend is ready
export async function fetchCars(params: fetchCarParams = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([_, value]) => value != null) // nullish check
  ).toString();
  const res = await fetch(
    `http://localhost:5000/customer/cars${query ? `?${query}` : ""}`
  );
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
}

export async function fetchCarById(id: string) {
  try {
    return await apiCall<Car>(`/cars/${id}`);
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
}

export async function fetchDealerCars(dealerId: string) {
  try {
    return await apiCall<Car[]>(`http://localhost:5000/dealer/cars`);
  } catch (error) {
    console.error("Error fetching dealer cars:", error);
    return [];
  }
}

// Dealer Car CRUD Operations
export async function createCar(
  dealerId: string,
  carData: Omit<Car, "id" | "dealerId">
) {
  try {
    return await apiCall<Car>("/cars", {
      method: "POST",
      body: JSON.stringify({
        ...carData,
        dealerId,
      }),
    });
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
}

export async function updateCar(carId: string, carData: Partial<Car>) {
  try {
    return await apiCall<Car>(`/cars/${carId}`, {
      method: "PUT",
      body: JSON.stringify(carData),
    });
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
}

export async function deleteCar(carId: string) {
  try {
    return await apiCall<{ success: boolean }>(`/cars/${carId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
}

// Booking APIs
export async function createBooking(bookingData: BookingData) {
  try {
    return await apiCall(`/bookings`, {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function fetchUserBookings(userId: string) {
  try {
    return await apiCall(`/users/${userId}/bookings`);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
}

export async function fetchDealerBookings(dealerId: string) {
  try {
    return await apiCall(`/dealers/${dealerId}/bookings`);
  } catch (error) {
    console.error("Error fetching dealer bookings:", error);
    return [];
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: "accepted" | "rejected" | "cancelled"
) {
  try {
    return await apiCall(`/bookings/${bookingId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

// Review APIs
export async function submitReview(reviewData: ReviewData) {
  try {
    return await apiCall(`/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
}

export async function fetchCarReviews(carId: string) {
  try {
    return await apiCall(`/cars/${carId}/reviews`);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}
