import ClientMotion from "@/components/ClientMotion";
import FAQItem from "./faq-item";

interface FAQSectionProps {
  hasMounted: boolean;
}

export default function FAQSection({ hasMounted }: FAQSectionProps) {
  const faqs = [
    {
      question: "How can I book a test-drive?",
      answer:
        "Visit the cars page, choose a vehicle you like, and follow the booking steps to schedule a test-drive.",
    },
    {
      question: "How much does a test-drive cost?",
      answer:
        "Pricing varies by vehicle. Check the price details on each car's page.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes — you can cancel up to 24 hours before the scheduled test-drive without a cancellation fee.",
    },
    {
      question: "How long is a test-drive?",
      answer:
        "Typically between one to two hours depending on the vehicle and arrangement.",
    },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <ClientMotion
            key={index}
            initial={hasMounted ? { opacity: 0 } : false}
            whileInView={hasMounted ? { opacity: 1 } : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            transition={{ delay: index * 0.1 }}
          >
            <FAQItem faq={faq} />
          </ClientMotion>
        ))}
      </div>
    </section>
  );
}