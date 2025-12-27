import ClientMotion from "@/components/ClientMotion";
import ContactForm from "./contact-form";
import MapAndHours from "./map-and-hours";

interface ContactFormSectionProps {
  hasMounted: boolean;
  submitted: boolean;
  onSubmit: (formData: any) => void;
}

export default function ContactFormSection({ 
  hasMounted, 
  submitted, 
  onSubmit 
}: ContactFormSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <ClientMotion
            initial={hasMounted ? { opacity: 0, x: -50 } : false}
            whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
            viewport={hasMounted ? { once: true } : undefined}
          >
            <ContactForm submitted={submitted} onSubmit={onSubmit} />
          </ClientMotion>

          {/* Map & Hours */}
          <ClientMotion
            initial={hasMounted ? { opacity: 0, x: 50 } : false}
            whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
            viewport={hasMounted ? { once: true } : undefined}
          >
            <MapAndHours />
          </ClientMotion>
        </div>
      </div>
    </section>
  );
}