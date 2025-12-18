// Type definitions for the application

export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  type: string;
  description?: string;
  specs?: Spec[];
  features?: string[];
  rating?: number;
  reviews?: number;
}

export interface Spec {
  label: string;
  value: string;
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
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  phone?: string;
  email?: string;
  website?: string;
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
