export interface CarSpecs {
  engine: string;
  transmission: string;
  fuelType: string;
  horsepower: number;
  color: string;
  acceleration?: number;
  torque?: number;
  drivetrain?: string;
  cartype?: string;
}

export interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  images: string[];
  description?: string;
  year?: number;
  features?: string[];
  rating?: number;
  reviews?: number;
  isActive: boolean;
}

export interface CarPayload {
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  features?: string[];
  specs: CarSpecs;
  newImages?: File[];
  isActive?: boolean;
}

/**
 * READ-ONLY Booking (Dealer just views requests)
 */
export interface BookingRequest {
  _id: string;
  car: {
    _id: string;
    brand: string;
    model: string;
    year?: number;
  };
  dealer: string;
  bookedBy: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface fetchCarParams {
  brand?: string;
  model?: string;
  year?: number;
}
export interface DealerBookingsResponse {
  count: number;
  bookings: BookingRequest[];
}
