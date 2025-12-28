import ClientMotion from "@/components/ClientMotion";
import { BookingData } from "../types";

interface Props {
  hasMounted: boolean;
  bookingData: BookingData;
  onChange: any;
  onBack: () => void;
  onNext: () => void;
}

export default function StepPersonalDetails({
  hasMounted,
  bookingData,
  onChange,
  onBack,
  onNext,
}: Props) {
  return (
    <ClientMotion
      initial={hasMounted ? { opacity: 0 } : false}
      animate={hasMounted ? { opacity: 1 } : undefined}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Your Details</h2>

      {["name", "email", "phone"].map((field) => (
        <input
          key={field}
          name={field}
          value={(bookingData as any)[field]}
          onChange={onChange}
          placeholder={field}
          className="w-full px-4 py-2 border rounded-lg"
        />
      ))}

      <textarea
        name="notes"
        value={bookingData.notes}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 border rounded-lg py-3">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
          className="flex-1 bg-red-600 text-white rounded-lg py-3"
        >
          Continue
        </button>
      </div>
    </ClientMotion>
  );
}
