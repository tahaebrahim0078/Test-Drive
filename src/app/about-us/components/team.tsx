"use client";
import { motion } from "framer-motion";
import { team } from "@/app/about-us/data/constants";

interface TeamSectionProps {
  hasMounted: boolean;
}

export default function TeamSection({ hasMounted }: TeamSectionProps) {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
            viewport={hasMounted ? { once: true } : undefined}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                     </motion.div>
        ))}
      </div>
    </section>
  );
}