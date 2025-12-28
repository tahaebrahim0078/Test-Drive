import ClientMotion from "@/components/ClientMotion";
import { AVAILABLE_SLOTS } from "../constants";

interface Props {
  hasMounted: boolean;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  selectedSlot: string;
  setSelectedSlot: (v: string) => void;
  onNext: () => void;
}

export default function StepDateTime(props: Props) {
  const {
    hasMounted,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    onNext,
  } = props;

  return (
    <ClientMotion
      initial={hasMounted ? { opacity: 0 } : false}
      animate={hasMounted ? { opacity: 1 } : undefined}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Select Date & Time</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      {selectedDate && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AVAILABLE_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`py-3 rounded-lg ${
                selectedSlot === slot
                  ? "bg-red-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!selectedDate || !selectedSlot}
        className="w-full bg-red-600 text-white py-3 rounded-lg disabled:bg-gray-400"
      >
        Continue
      </button>
    </ClientMotion>
  );
}
