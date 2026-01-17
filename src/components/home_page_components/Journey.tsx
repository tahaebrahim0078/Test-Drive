"use client";
import ClientMotion from "@/components/ClientMotion";
import { FiSearch, FiCalendar, FiCheck } from "react-icons/fi";

const journeySteps = [
  { icon: <FiSearch />, title: "Explore", desc: "Find your dream ride." },
  { icon: <FiCalendar />, title: "Schedule", desc: "Pick your perfect time." },
  { icon: <FiCheck />, title: "Drive", desc: "Confirm and hit the road." },
];

export default function Journey() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
            Three Steps. <span className="text-red-600">Zero Hassle.</span>
          </h2>
          <div className="h-1.5 w-20 bg-red-600 mx-auto rounded-full" />
        </div>

        {/* The Journey Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 z-0" />

          {journeySteps.map((step, index) => (
            <ClientMotion
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 group"
            >
              <div className="bg-white p-10 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-500 border border-gray-100 text-center">
                {/* Step Number Badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {index + 1}
                </span>

                {/* Icon with "Pulse" Effect */}
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{step.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </ClientMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
