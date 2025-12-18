// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Type Definitions
interface CarSpecs {
  engine: string;
  transmission: string;
  fuelType: string;
  horsepower: number;
  color: string;
}

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  specs: CarSpecs;
  dealerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BookingData {
  carId: string;
  customerId: string;
  date: string;
  time: string;
  notes?: string;
}

interface ReviewData {
  carId: string;
  customerId: string;
  rating: number;
  comment: string;
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Car Management APIs
export async function fetchCars() {
  try {
    return await apiCall<Car[]>("/cars");
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
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
