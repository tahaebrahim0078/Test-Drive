import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import ClientMotion from "@/components/ClientMotion";
import ContactInfoCard from "./contactInfo-card";

interface ContactInfoGridProps {
  hasMounted: boolean;
}

export default function ContactInfoGrid({ hasMounted }: ContactInfoGridProps) {
  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Our Address",
      description: "Cairo, Egypt ",
      color: "from-red-400 to-red-600",
    },
    {
      icon: FiPhone,
      title: "Phone",
      description: "+966 11 XXXX XXXX",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: FiMail,
      title: "Email",
      description: "support@drivetest.com",
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info, index) => (
          <ClientMotion
            key={index}
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            transition={{ delay: index * 0.1 }}
          >
            <ContactInfoCard info={info} />
          </ClientMotion>
        ))}
      </div>
    </section>
  );
}