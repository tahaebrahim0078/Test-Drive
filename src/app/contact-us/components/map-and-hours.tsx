export default function MapAndHours() {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Our Location
      </h2>
      <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-center p-8">
          <div>
            <p className="text-2xl font-bold mb-4">🗺️</p>
            <p>The actual directions map will appear here</p>
            <p className="text-sm mt-2">Cairo, Egypt</p>
          </div>
        </div>
      </div>

      {/* Contact Hours */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Opening Hours
        </h3>
        <div className="space-y-2 text-gray-600">
          <p>Sun - Thu: 09:00 AM - 06:00 PM</p>
          <p>Fri - Sat: 04:00 PM - 10:00 PM</p>
        </div>
      </div>
    </>
  );
}