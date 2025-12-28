export default function ProgressSteps({ step }: { step: number }) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                stepNum <= step ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
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
  );
}
