interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
}

export default function FAQItem({ faq }: FAQItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {faq.question}
      </h3>
      <p className="text-gray-600">{faq.answer}</p>
    </div>
  );
}