"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useHasMounted from "@/hooks/useHasMounted";
import { useBooking } from "./hooks/useBooking";
import ProgressSteps from "./components/ProgressSteps";
import StepDateTime from "./components/StepDateTime";
import StepPersonalDetails from "./components/StepPersonalDetails";
import StepConfirm from "./components/StepConfirm";
import BookingSuccess from "./components/BookingSuccess";

export default function BookingPage({ params }: { params: { id: string } }) {
  const hasMounted = useHasMounted();
  const booking = useBooking();

  if (booking.bookingConfirmed) {
    return <BookingSuccess data={booking} />;
  }

  return (
    <main>
      <Navbar />

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          <ProgressSteps step={booking.step} />

          {booking.step === 1 && (
            <StepDateTime
              hasMounted={hasMounted}
              selectedDate={booking.selectedDate}
              setSelectedDate={booking.setSelectedDate}
              selectedSlot={booking.selectedSlot}
              setSelectedSlot={booking.setSelectedSlot}
              onNext={() => booking.setStep(2)}
            />
          )}

          {booking.step === 2 && (
            <StepPersonalDetails
              hasMounted={hasMounted}
              bookingData={booking.bookingData}
              onChange={booking.handleInputChange}
              onBack={() => booking.setStep(1)}
              onNext={() => booking.setStep(3)}
            />
          )}

          {booking.step === 3 && (
            <StepConfirm
              hasMounted={hasMounted}
              bookingData={booking.bookingData}
              selectedDate={booking.selectedDate}
              selectedSlot={booking.selectedSlot}
              onBack={() => booking.setStep(2)}
              onConfirm={() => booking.setBookingConfirmed(true)}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
