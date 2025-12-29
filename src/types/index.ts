// Type definitions for the application

export interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  images: string[];
  description?: string;
  specs: Spec;
  features?: string[];
  rating?: number;
  reviews?: number;
  dealer?: Dealer;
}
export interface Spec {
  transmission: string;
  color: string;
  acceleration: number;
  drivetrain: string;
  engine: string;
  fuelType: string;
  torque: number;
  horsepower: number;
  cartype: string;
}
export interface carApiResponse {
  data: Car[];
}
export interface fetchCarParams {
  brand?: string;
  model?: string;
  dealerId?: string;
  limit?: string;
  year?: string;
  page?: number;
}
export interface CarCardProps {
  _id: string;
  brand: string;
  model: string;
  price: number;
  images: string[];
}
export interface paginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
export interface Booking {
  id: string;
  carId: string;
  carName: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "dealer" | "admin";
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Dealer {
  _id: string;
  name?: string;
  dealershipName?: string;
  dealershipLocation?: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
}

export interface ReviewData {
  carId: string;
  rating: number;
  text: string;
}
