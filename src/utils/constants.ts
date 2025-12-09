// Color constants
export const COLORS = {
  primary: "#EF4444", // Red
  secondary: "#F97316", // Orange
  dark: "#1F2937", // Dark Gray
  light: "#F9FAFB", // Light Gray
  white: "#FFFFFF",
};

// Car categories
export const CAR_CATEGORIES = [
  "Luxury Sedan",
  "Luxury SUV",
  "Sports Car",
  "Supercar",
  "Electric Luxury",
];

// Booking status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// User roles
export const USER_ROLES = {
  CUSTOMER: "customer",
  DEALER: "dealer",
  ADMIN: "admin",
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Time slots for bookings
export const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// Routes
export const ROUTES = {
  HOME: "/",
  CARS: "/cars",
  CAR_DETAIL: (id: string) => `/cars/${id}`,
  BOOKING: (id: string) => `/booking/${id}`,
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  CUSTOMER_BOOKINGS: "/customer/bookings",
  REVIEW: (id: string) => `/review/${id}`,
};
