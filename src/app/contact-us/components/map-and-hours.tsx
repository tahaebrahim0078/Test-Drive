import Image from "next/image";

export default function MapAndHours() {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Location</h2>

      <div className="relative bg-gray-300 rounded-lg h-96 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dfok52azn/image/upload/v1767461193/Screenshot_2026-01-03_192553_ogyyyq.png"
          alt="Map location"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-center p-8">
          <div>
            <p className="text-4xl mb-4">🗺️</p>
            <p className="text-2xl font-bold mb-2">
              The actual directions map will appear here
            </p>
            <p className="text-sm">Cairo, Egypt</p>
          </div>
        </div>
      </div>

      {/* Contact Hours */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h3>
        <div className="space-y-2 text-gray-600">
          <p>Sun - Thu: 09:00 AM - 06:00 PM</p>
          <p>Fri - Sat: 04:00 PM - 10:00 PM</p>
        </div>
      </div>
    </>
  );
}
