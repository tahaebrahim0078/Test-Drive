"use client";
import ClientMotion from "@/components/ClientMotion";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiCheck } from "react-icons/fi";
import { itemVariants, containerVariants } from "@/utils/constants";
export default function Journey() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Simple steps to book your perfect test drive
          </p>
        </ClientMotion>

        <ClientMotion
          variants={containerVariants}
          initial={"hidden"}
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: FiSearch,
              title: "Browse Cars",
              description:
                "Explore our extensive collection of premium vehicles from leading brands. Filter by price, location, and more.",
            },
            {
              icon: FiCalendar,
              title: "Select Time",
              description:
                "Choose your preferred date and time slot from available options. Easy and flexible scheduling for your lifestyle.",
            },
            {
              icon: FiCheck,
              title: "Confirm Booking",
              description:
                "Complete your reservation with instant confirmation. Get detailed directions and dealer contact info.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </ClientMotion>
      </div>
    </section>
  );
}
