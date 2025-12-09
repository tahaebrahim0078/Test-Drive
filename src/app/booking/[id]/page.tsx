"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientMotion from "@/components/ClientMotion";
import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import { FiCheck, FiX } from "react-icons/fi";

export default function BookingPage({ params }: { params: { id: string } }) {
  const hasMounted = useHasMounted();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const carName = "BMW 3 Series";
  const carPrice = 150;

  const availableSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    // TODO: Send to backend API
    console.log({
      carId: params.id,
      ...bookingData,
      date: selectedDate,
      time: selectedSlot,
    });

    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <main>
        <Navbar />

        <section className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 py-20">
          <div className="max-w-2xl mx-auto px-4">
            <ClientMotion
              initial={hasMounted ? { opacity: 0, scale: 0.9 } : false}
              animate={hasMounted ? { opacity: 1, scale: 1 } : undefined}
              className="bg-white rounded-lg shadow-xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-green-600 text-5xl" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Your test drive has been successfully booked. Check your email
                for confirmation details.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                <h2 className="font-bold text-gray-900 mb-4">
                  Booking Details
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Car:</strong> {carName}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedSlot}
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
                <Link
                  href="/cars"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Browse More Cars
                </Link>
                <Link
                  href="/"
                  className="block w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Back to Home
                </Link>
              </div>
            </ClientMotion>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                      stepNum <= step ? "bg-red-600" : "bg-gray-300"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition ${
                        stepNum < step ? "bg-red-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Select Date & Time</span>
              <span>Your Details</span>
              <span>Confirm Booking</span>
            </div>
          </div>

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <ClientMotion
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="space-y-6"
            >
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-lg font-medium transition ${
                          selectedSlot === slot
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => selectedDate && selectedSlot && setStep(2)}
                disabled={!selectedDate || !selectedSlot}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Continue
              </button>
            </ClientMotion>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <ClientMotion
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="space-y-6"
            >
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
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
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Continue
                </button>
              </div>
            </ClientMotion>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <ClientMotion
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="space-y-6"
            >
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
                      <strong>Time:</strong> {selectedSlot}
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  By confirming, you agree to our terms and conditions. A
                  confirmation email will be sent to {bookingData.email}.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Confirm Booking
                </button>
              </div>
            </ClientMotion>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
