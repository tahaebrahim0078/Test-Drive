"use client";
import { values } from "@/app/about-us/data/constants";
import ValueCard from "./value-card";

interface ValuesSectionProps {
  hasMounted: boolean;
}

export default function ValuesSection({ hasMounted }: ValuesSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              color={value.color}
              index={index}
              hasMounted={hasMounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}