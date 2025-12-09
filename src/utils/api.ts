// Mock API functions - Replace with actual API calls when backend is ready

export async function fetchCars() {
  // TODO: Replace with actual API call
  return [
    {
      id: "1",
      name: "BMW 3 Series",
      category: "Luxury Sedan",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
    },
    // ... more cars
  ];
}

export async function fetchCarById(id: string) {
  // TODO: Replace with actual API call
  return {
    id,
    name: "BMW 3 Series",
    category: "Luxury Sedan",
    price: 150,
    rating: 4.8,
    reviews: 245,
  };
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
