import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { ENDPOINTS } from "@/api/endpoints";
import { BookingRequest } from "@/types/admin";
import { BookingData } from "../types";

export function useBooking() {

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const {
    data: bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
    refetch: refetchBookings,
  } = useQuery<BookingRequest[]>({
    queryKey: ["bookings"],
    queryFn: () => fetcher<BookingRequest[]>(ENDPOINTS.BOOKINGS),
  });


  const canGoToStep2 = Boolean(selectedDate && selectedSlot);
  const canGoToStep3 = Boolean(
    bookingData.name && bookingData.email && bookingData.phone
  );

  return {
    step,
    setStep,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    bookingConfirmed,
    setBookingConfirmed,

    bookingData,
    handleInputChange,

    canGoToStep2,
    canGoToStep3,

    bookings,
    bookingsLoading,
    bookingsError,
    refetchBookings,
  };
}
