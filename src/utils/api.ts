import { BookingData, Car, fetchCarParams, ReviewData } from "@/types";
import { apiCall } from "./apiCall";
import {
  BookingRequest,
  CarPayload,
  DealerBookingsResponse,
} from "@/app/dealer/dashboard/typesDealer";

// ===========================
// Cars APIs
// ===========================

export async function fetchCars(params: fetchCarParams = {}): Promise<any> {
  const query = new URLSearchParams(
    Object.entries(params).filter(([_, value]) => value != null)
  ).toString();
  return apiCall<Car[]>(`/customer/cars${query ? `?${query}` : ""}`);
}
export async function fetchCarById(id: string) {
  try {
    return await apiCall<Car>(`/customer/cars/${id}`);
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
}




// Fetch cars for a specific dealer
export async function fetchMyCars() {
  return await apiCall<Car[]>("/dealer/me/cars");
}

// Dealer Car CRUD Operations
export async function createCar(dealerId: string, payload: CarPayload) {
  try {
    const uploadedImages = await Promise.all(
      (payload.newImages || []).map((file) => uploadImageToCloudinary(file))
    );

    const images = [...(payload.images || []), ...uploadedImages];

    return await apiCall<Car>("/dealer/cars", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        images,
        newImages: undefined, // remove newImages from payload to avoid confusion
      }),
    });
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
}

export async function updateCar(carId: string, payload: CarPayload) {
  try {
    const uploadedImages = await Promise.all(
      (payload.newImages || []).map((file) => uploadImageToCloudinary(file))
    );

    const images = [...(payload.images || []), ...uploadedImages];

    return await apiCall<Car>(`/dealer/cars/${carId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        images,
        newImages: undefined, // remove newImages from payload to avoid confusion
      }),
    });
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
}

export async function deleteCar(carId: string) {
  try {
    return await apiCall<{ success: boolean }>(`/dealer/cars/${carId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
}

// ===========================
// Booking APIs
// ===========================

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
// Fetch bookings for dealer
export async function fetchDealerBookings() {
  try {
    const data = await apiCall<{ count: number; bookings: BookingRequest[] }>(
      "/dealer/bookings"
    );
    return data.bookings || [];
  } catch (error) {
    console.error("Error fetching dealer bookings:", error);
    return [];
  }
}

// export async function updateBookingStatus(
//   bookingId: string,
//   status: "accepted" | "rejected" | "cancelled"
// ) {
//   try {
//     return await apiCall(`/bookings/${bookingId}`, {
//       method: "PATCH",
//       body: JSON.stringify({ status }),
//     });
//   } catch (error) {
//     console.error("Error updating booking:", error);
//     throw error;
//   }
// }

// ===========================
// Review APIs
// ===========================

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
function uploadImageToCloudinary(file: File): any {
  throw new Error("Function not implemented.");
}
