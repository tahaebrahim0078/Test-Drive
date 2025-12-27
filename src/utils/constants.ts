// Color constants
import audiLogo from "@/../public/images/audiLogo.png";
import bmwLogo from "@/../public/images/bmwLogo.png";
import mercedesLogo from "@/../public/images/mercedesLogo.png";
import teslaLogo from "@/../public/images/teslaLogo.png";
export const COLORS = {
  primary: "#EF4444",
  secondary: "#F97316",
  dark: "#1F2937",
  light: "#F9FAFB",
  white: "#FFFFFF",
};
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
export const partners = [
  {
    id: 1,
    name: "BMW Downtown",
    description: "Premium BMW Experience",
    image: bmwLogo,
  },
  {
    id: 2,
    name: "Mercedes Central",
    description: "Luxury Mercedes Collection",
    image: mercedesLogo,
  },
  {
    id: 3,
    name: "Audi Prestige",
    description: "Innovation & Performance",
    image: audiLogo,
  },
  {
    id: 4,
    name: "Tesla",
    description: "Electric Future",
    image: teslaLogo,
  },
];
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    rating: 5,
    text: "Absolutely seamless experience! Booked a drive in minutes and the dealer was perfectly prepared. The platform made everything so simple.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
    text: "Found my dream car through DriveTest. The booking process was smooth and the dealer service exceeded my expectations. Highly recommended!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Business Consultant",
    rating: 5,
    text: "Perfect for busy professionals! I was able to compare multiple cars and book test drives without any hassle. The platform saved me hours of time.",
  },
];
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
