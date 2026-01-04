import ClientMotion from "@/components/ClientMotion";

interface ContactCTAProps {
  hasMounted: boolean;
}

export default function ContactCTA({ hasMounted }: ContactCTAProps) {
  return (
    <ClientMotion
      initial={hasMounted ? { opacity: 0, y: 30 } : false}
      whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
      viewport={hasMounted ? { once: true } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-linear-to-br from-red-600 via-red-500 to-red-900 text-white py-20"
    >
      {/* Decorative blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
          Have more questions?
        </h2>

        <p className="text-lg sm:text-xl mb-10 text-white/90">
          Our team is ready to help you anytime
        </p>

        <button className="group inline-flex items-center gap-2 cursor-pointer bg-white text-red-600 font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-red-50 hover:shadow-2xl transition-all duration-300">
          Contact Us
          <span className="transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </ClientMotion>
  );
}
