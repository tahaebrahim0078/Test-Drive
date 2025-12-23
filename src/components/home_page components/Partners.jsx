"use client";
import ClientMotion from "@/components/ClientMotion";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/utils/constants";

const partners = [
  { id: 1, name: "BMW Downtown", description: "Premium BMW Experience" },
  {
    id: 2,
    name: "Mercedes Central",
    description: "Luxury Mercedes Collection",
  },
  { id: 3, name: "Audi Prestige", description: "Innovation & Performance" },
  { id: 4, name: "Tesla Gallery", description: "Electric Future" },
];

export default function Partners() {
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
            Partner Dealerships
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted by leading automotive dealers nationwide
          </p>
        </ClientMotion>

        <ClientMotion
          variants={containerVariants}
          initial={"hidden"}
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              className="bg-gray-100 p-8 rounded-lg text-center hover:bg-gray-200 transition"
            >
              <div className="w-16 h-16 bg-linear-to-br from-gray-400 to-gray-600 rounded-lg mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </motion.div>
          ))}
        </ClientMotion>
      </div>
    </section>
  );
}
