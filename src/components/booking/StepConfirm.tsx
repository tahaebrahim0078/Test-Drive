import ClientMotion from "@/components/ClientMotion";
import { CAR_NAME, CAR_PRICE } from "../constants";
import { BookingData } from "../types";

interface Props {
  hasMounted: boolean;
  bookingData: BookingData;
  selectedDate: string;
  selectedSlot: string;
  onBack: () => void;
  onConfirm: () => void;
}

export default function StepConfirm(props: Props) {
  const { hasMounted, bookingData, selectedDate, selectedSlot, onBack, onConfirm } =
    props;

  return (
    <ClientMotion
      initial={hasMounted ? { opacity: 0 } : false}
      animate={hasMounted ? { opacity: 1 } : undefined}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Confirm Your Booking</h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p><strong>Car:</strong> {CAR_NAME}</p>
        <p><strong>Price:</strong> ${CAR_PRICE}/hour</p>
        <p><strong>Date:</strong> {selectedDate}</p>
        <p><strong>Time:</strong> {selectedSlot}</p>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 border rounded-lg py-3">
          Back
        </button>
        <button onClick={onConfirm} className="flex-1 bg-red-600 text-white rounded-lg py-3">
          Confirm Booking
        </button>
      </div>
    </ClientMotion>
  );
}
