import ClientMotion from "@/components/ClientMotion";

interface ContactCTAProps {
  hasMounted: boolean;
}

export default function ContactCTA({ hasMounted }: ContactCTAProps) {
  return (
    <ClientMotion
      initial={hasMounted ? { opacity: 0 } : false}
      whileInView={hasMounted ? { opacity: 1 } : undefined}
      viewport={hasMounted ? { once: true } : undefined}
      className="bg-red-600 text-white py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Have more questions?</h2>
        <p className="text-lg mb-8 opacity-90">
          Our team is ready to help you anytime
        </p>
        <button className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
          Contact Us
        </button>
      </div>
    </ClientMotion>
  );
}