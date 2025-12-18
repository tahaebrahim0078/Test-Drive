"use client";
import ClientMotion from "@/components/ClientMotion";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { itemVariants, containerVariants } from "@/utils/constants";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    rating: 5,
    text: "Absolutely seamless experience! Booked a drive in minutes and the dealer was perfectly prepared. The platform made everything so simple.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
    text: "Found my dream car through DriveTest. The booking process was smooth and the dealer service exceeded my expectations. Highly recommended!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Business Consultant",
    rating: 5,
    text: "Perfect for busy professionals! I was able to compare multiple cars and book test drives without any hassle. The platform saved me hours of time.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Real experiences from satisfied customers
          </p>
        </ClientMotion>

        <ClientMotion
          variants={containerVariants}
          initial={"hidden"}
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-orange-400 fill-current"
                    size={18}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">{`"${testimonial.text}"`}</p>

              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </ClientMotion>
      </div>
    </section>
  );
}
