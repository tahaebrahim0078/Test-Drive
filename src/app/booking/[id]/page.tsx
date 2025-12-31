"use client";

import { use, useState, useEffect } from "react";
import { FiCheck, FiX, FiClock } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const API_BASE_URL = "http://localhost:5000";

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useAuth();
  const resolvedParams = use(params);
  const carId = resolvedParams.id;
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availabilityData, setAvailabilityData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const carName = "BMW 3 Series";
  const carPrice = 150;

  // // Redirect if not logged in
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     window.location.href = "/auth/login";
  //   }
  // }, [isLoggedIn]);

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // Fetch availability when date is selected
  useEffect(() => {
    if (selectedDate && carId) {
      fetchAvailability(selectedDate);
    } else {
      setAvailabilityData([]);
      setSelectedSlot("");
    }
  }, [selectedDate, carId]);

  const fetchAvailability = async (date: string) => {
    setLoading(true);
    setError("");
    setSelectedSlot("");

    try {
      if (!carId || carId === "undefined") {
        throw new Error(
          "Invalid car ID. Please navigate to this page from a car listing."
        );
      }

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login to view availability");
      }

      const url = `${API_BASE_URL}/customer/cars/${carId}/availability?date=${date}`;
      console.log("🔍 Fetching:", url);

      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📡 Response:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(errorData.message || `API returned ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Data:", data);

      // The API returns an array of time slots directly
      setAvailabilityData(data);
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Failed to fetch availability");
      setAvailabilityData([]);
    } finally {
      setLoading(false);
    }
  };

  // Convert hour to display format
  const formatTime = (hour: string) => {
    const h = parseInt(hour);
    if (h === 12) return "12:00 PM";
    if (h > 12) return `${h - 12}:00 PM`;
    return `${h}:00 AM`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if user data is complete
  const isUserDataComplete = () => {
    return bookingData.name && bookingData.email && bookingData.phone;
  };

  // Modified continue button handler to skip step 2 if data is complete
  const handleContinueFromStep1 = () => {
    if (selectedDate && selectedSlot) {
      // If user data is already complete, skip to step 3
      if (isUserDataComplete()) {
        setStep(3);
      } else {
        setStep(2);
      }
    }
  };

  const handleBooking = async () => {
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !selectedDate ||
      !selectedSlot
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login to make a booking");
      }

      const url = `${API_BASE_URL}/customer/cars/${carId}/book`;
      console.log("📤 Booking:", url);
      console.log("📦 Payload:", {
        date: selectedDate,
        time: selectedSlot,
      });

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedSlot,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Booking error response:", errorData);
        throw new Error(errorData.message || "Booking failed");
      }

      const result = await response.json();
      console.log("✅ Booking created:", result);

      setBookingConfirmed(true);
    } catch (err: any) {
      console.error("❌ Booking error:", err);
      setError(err.message || "Failed to create booking");
      alert(`Booking failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-linear-to-r from-gray-50 to-gray-100 py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600 text-5xl" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your test drive has been successfully booked. Check your email for
              confirmation details.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
              <h2 className="font-bold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Car:</strong> {carName}
                </p>
                <p>
                  <strong>Date:</strong> {selectedDate}
                </p>
                <p>
                  <strong>Time:</strong> {formatTime(selectedSlot)}
                </p>
                <p>
                  <strong>Name:</strong> {bookingData.name}
                </p>
                <p>
                  <strong>Email:</strong> {bookingData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {bookingData.phone}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => (window.location.href = "/cars")}
                className="block w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Browse More Cars
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="block w-full border-2 cursor-pointer border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className=" flex border justify-center items-center  bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex items-start justify-center gap-5 sm:gap-8">
                {[1, 2, 3].map((stepNum, index) => (
                  <div
                    key={stepNum}
                    className="flex justify-center items-center"
                  >
                    {/* Step */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`sm:w-12 w-10 sm:h-12 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                          stepNum <= step ? "bg-red-600" : "bg-gray-300"
                        }`}
                      >
                        {stepNum}
                      </div>
                      <span className="mt-2 text-sm text-gray-600 w-full sm:w-32 text-center">
                        {stepNum === 1 && "Select Date & Time"}
                        {stepNum === 2 && "Your Details"}
                        {stepNum === 3 && "Confirm Booking"}
                      </span>
                    </div>

                    {/* Line */}
                    {index < 2 && (
                      <div
                        className={`h-1 sm:w-24 w-10 mx-1 transition ${
                          stepNum < step ? "bg-red-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Info Banner (shows when data is auto-filled) */}
          {isUserDataComplete() && step === 1 && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FiCheck className="text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    Your details are ready!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Booking as: {bookingData.name} ({bookingData.email})
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Select Date & Time
              </h2>

              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 text-gray-600 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Loading State */}
              {loading && selectedDate && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  <p className="mt-2 text-gray-600">Checking availability...</p>
                </div>
              )}

              {/* Time Slots */}
              {selectedDate && !loading && availabilityData.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availabilityData.map((slot) => {
                      const available = slot.available;
                      const displayTime = formatTime(slot.time);

                      return (
                        <button
                          key={slot.time}
                          onClick={() =>
                            available && setSelectedSlot(slot.time)
                          }
                          disabled={!available}
                          className={`py-3 px-4 cursor-pointer rounded-lg font-medium transition relative ${
                            selectedSlot === slot.time
                              ? "bg-red-600 text-white ring-2 ring-red-600 ring-offset-2"
                              : available
                              ? "bg-green-50 hover:bg-green-100 text-green-800 border-2 border-green-300"
                              : "bg-red-50 text-red-800 border-2 border-red-300 cursor-not-allowed opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <FiClock size={14} />
                            <span className="text-sm">{displayTime}</span>
                          </div>
                          {!available && (
                            <FiX
                              className="absolute top-1 right-1 text-red-600"
                              size={16}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-50 border-2 border-green-300 rounded"></div>
                      <span className="text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-50 border-2 border-red-300 rounded"></div>
                      <span className="text-gray-600">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-600 rounded"></div>
                      <span className="text-gray-600">Selected</span>
                    </div>
                  </div>
                </div>
              )}

              {/* No slots available message */}
              {selectedDate &&
                !loading &&
                availabilityData.length === 0 &&
                !error && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      No time slots available for this date. Please select
                      another date.
                    </p>
                  </div>
                )}

              <button
                onClick={handleContinueFromStep1}
                disabled={!selectedDate || !selectedSlot || loading}
                className="w-full bg-red-600 hover:bg-red-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {isUserDataComplete() ? "Continue to Confirmation" : "Continue"}
              </button>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Details</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests or questions?"
                  rows={4}
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 cursor-pointer border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={
                    !bookingData.name ||
                    !bookingData.email ||
                    !bookingData.phone
                  }
                  className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Confirm Your Booking
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Booking Summary
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Car:</strong> {carName}
                    </p>
                    <p>
                      <strong>Price:</strong> ${carPrice}/hour
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedDate}
                    </p>
                    <p>
                      <strong>Time:</strong> {formatTime(selectedSlot)}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    Personal Details
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Name:</strong> {bookingData.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {bookingData.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {bookingData.phone}
                    </p>
                    {bookingData.notes && (
                      <p>
                        <strong>Notes:</strong> {bookingData.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Details Button */}
              <button
                onClick={() => setStep(2)}
                className="w-full text-red-600 cursor-pointer hover:text-red-700 font-medium text-sm underline"
              >
                Need to edit your details?
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  By confirming, you agree to our terms and conditions. A
                  confirmation email will be sent to {bookingData.email}.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 border-2 cursor-pointer border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="flex-1 bg-red-600 cursor-pointer hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
