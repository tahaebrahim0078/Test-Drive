import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ClientMotion from "@/components/ClientMotion";
import { FiCheck } from "react-icons/fi";
import { CAR_NAME } from "../constants";

export default function BookingSuccess({ data }: any) {
  return (
    <main>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClientMotion className="bg-white p-12 rounded-lg text-center">
          <FiCheck className="text-green-600 text-5xl mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>

          <div className="text-left space-y-2">
            <p><strong>Car:</strong> {CAR_NAME}</p>
            <p><strong>Date:</strong> {data.selectedDate}</p>
            <p><strong>Time:</strong> {data.selectedSlot}</p>
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/cars" className="block bg-red-600 text-white py-3 rounded-lg">
              Browse More Cars
            </Link>
          </div>
        </ClientMotion>
      </section>

      <Footer />
    </main>
  );
}
