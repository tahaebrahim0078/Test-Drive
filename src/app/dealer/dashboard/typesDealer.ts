export interface CarSpecs {
  engine: string;
  transmission: string;
  fuelType: string;
  horsepower: number;
  color: string;
}

export interface Car {
  _id?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  specs: CarSpecs;
}

export interface CarPayload {
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  specs: CarSpecs;
 
  newImages?: File[]; 
  isActive?: boolean;
}

export interface BookingRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  carId: string;
  carName: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "rejected";
  notes?: string;
}

export interface ReviewData {
  carId: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface fetchCarParams {
  brand?: string;
  model?: string;
  year?: number;
}
