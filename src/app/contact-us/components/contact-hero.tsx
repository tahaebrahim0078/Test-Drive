import ClientMotion from "@/components/ClientMotion";

interface ContactHeroProps {
  hasMounted: boolean;
}

export default function ContactHero({ hasMounted }: ContactHeroProps) {
  return (
    <ClientMotion
      initial={hasMounted ? { opacity: 0 } : false}
      animate={hasMounted ? { opacity: 1 } : undefined}
      className="bg-linear-to-br from-red-50 to-orange-50 py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ClientMotion
          initial={hasMounted ? { opacity: 0, y: 20 } : false}
          animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          <h1>Contact Us</h1>
        </ClientMotion>
        <ClientMotion
          initial={hasMounted ? { opacity: 0, y: 20 } : false}
          animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          <p>We are here to answer your questions and support your needs</p>
        </ClientMotion>
      </div>
    </ClientMotion>
  );
}