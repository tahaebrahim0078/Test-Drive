export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "dealer" | "admin";
  joinDate: string;
  status: "active" | "inactive";
}

export interface BookingRequest {
  id: string;
  customerName: string;
  dealerName: string;
  carName: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
}
