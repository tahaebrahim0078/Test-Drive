import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/customer/bookings"
      className="text-red-600 hover:text-red-700 mb-8 inline-block"
    >
      ← Back to Bookings
    </Link>
  );
}