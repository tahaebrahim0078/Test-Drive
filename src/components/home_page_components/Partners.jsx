"use client";
import ClientMotion from "@/components/ClientMotion";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/utils/constants";
import Image from "next/image";
import audiLogo from "@/../public/images/audiLogo.png";
import bmwLogo from "@/../public/images/bmwLogo.png";
import mercedesLogo from "@/../public/images/mercedesLogo.png";
import teslaLogo from "@/../public/images/teslaLogo.png";

const partners = [
  {
    id: 1,
    name: "BMW Downtown",
    description: "Premium BMW Experience",
    image: bmwLogo,
  },
  {
    id: 2,
    name: "Mercedes Central",
    description: "Luxury Mercedes Collection",
    image: mercedesLogo,
  },
  {
    id: 3,
    name: "Audi Prestige",
    description: "Innovation & Performance",
    image: audiLogo,
  },
  {
    id: 4,
    name: "Tesla",
    description: "Electric Future",
    image: teslaLogo,
  },
];

export default function Partners() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <ClientMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Partner Dealerships
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-gray-500 text-lg">
            We collaborate with the world most leading automotive brands to
            ensure quality and excellence in every vehicle.
          </p>
        </ClientMotion>

        {/* Grid Section */}
        <ClientMotion
          variants={containerVariants}
          initial={"hidden"}
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Logo Container */}
              <div className="relative h-16 w-full flex items-center justify-center mb-6 transition-all duration-500">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  className="object-contain"
                  width={100}
                  height={50}
                />
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {partner.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </ClientMotion>
      </div>
    </section>
  );
}
