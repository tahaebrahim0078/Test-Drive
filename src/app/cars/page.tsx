"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useState } from "react";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import { FiFilter, FiSearch } from "react-icons/fi";

const allCars = [
  {
    id: "1",
    name: "BMW 3 Series",
    category: "Luxury Sedan",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Mercedes C-Class",
    category: "Luxury Sedan",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1651362351519-f8e5e055f5f5?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Audi Q5",
    category: "Luxury SUV",
    price: 170,
    image:
      "https://images.unsplash.com/photo-1606559405297-5ce89cacb054?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Tesla Model S",
    category: "Electric Luxury",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a46dd52956?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Porsche 911",
    category: "Sports Car",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Range Rover",
    category: "Luxury SUV",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1609168773984-c4222ffd9626?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Ferrari F8",
    category: "Supercar",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1553882900-d5160ca84f61?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Lamborghini Huracán",
    category: "Supercar",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
];

export default function CarsPage() {
  const hasMounted = useHasMounted();
  const [filteredCars, setFilteredCars] = useState(allCars);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = allCars.filter(
      (car) =>
        car.name.toLowerCase().includes(query.toLowerCase()) ||
        car.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const handleFilter = (category: string) => {
    if (category === "all") {
      setFilteredCars(allCars);
    } else {
      const filtered = allCars.filter((car) =>
        car.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Browse Our Cars
          </h1>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2 mb-6">
            <FiSearch className="text-gray-400 mx-3" size={20} />
            <input
              type="text"
              placeholder="Search by car name or category..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-800"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilter("all")}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FiFilter size={18} />
              All Cars
            </button>
            <button
              onClick={() => handleFilter("Sedan")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              Sedans
            </button>
            <button
              onClick={() => handleFilter("SUV")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              SUVs
            </button>
            <button
              onClick={() => handleFilter("Sports")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              Sports
            </button>
            <button
              onClick={() => handleFilter("Supercar")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              Supercars
            </button>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCars.length > 0 ? (
            <motion.div
              initial={hasMounted ? { opacity: 0 } : false}
              animate={hasMounted ? { opacity: 1 } : undefined}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredCars.map((car) => (
                <motion.div key={car.id} whileHover={{ y: -5 }}>
                  <CarCard {...car} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No cars found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
