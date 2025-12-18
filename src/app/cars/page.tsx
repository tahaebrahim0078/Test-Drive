"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiSearch } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/utils/api";
import { Car } from "@/types/index";
const allCars = [
  {
    id: "1",
    name: "BMW 3 Series",
    category: "Luxury",
    type: "Sedan",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1734554381974-56e06a32453c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJtdyUyMDMlMjBzZXJpZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "2",
    name: "Mercedes C-Class",
    category: "Luxury",
    type: "Sedan",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1660107930689-fc8a8fb9d007?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lcmNlZGVzJTIwYyUyMGNsYXNzfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    name: "Audi Q5",
    category: "Luxury",
    type: "SUV",
    price: 170,
    image:
      "https://images.unsplash.com/photo-1632081831947-24ffdea2cd04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXVkaSUyMHE1fGVufDB8fDB8fHww",
  },
  {
    id: "4",
    name: "Tesla Model S",
    category: "Electric Luxury",
    type: "Sedan",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1676945009341-4bb62b036653?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "5",
    name: "Porsche 911",
    category: "Supercar",
    type: "Sports",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1624880056139-d1212d7ff347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcmNoZSUyMDkxMXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "6",
    name: "Range Rover",
    category: "Luxury",
    type: "SUV",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1604054094723-3a949e4a8993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmdlJTIwcm92ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "7",
    name: "Ferrari F8",
    category: "Supercar",
    type: "Sports",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVycmFyaSUyMGY4fGVufDB8fDB8fHww",
  },
  {
    id: "8",
    name: "Lamborghini Huracán",
    category: "Supercar",
    type: "Sports",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1633507104446-8e94340c8ea3?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function CarsPage() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["cars"],
  //   queryFn: async () => await fetchCars(),
  //   staleTime: 1000 * 60 * 30,
  // });
  // const allCars = data?.data;

  const [filteredCars, setFilteredCars] = useState(allCars);
  const [searchQuery, setSearchQuery] = useState("");
  const [carTypes, setCarTypes] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = allCars.filter(
      (car: Car) =>
        car.name.toLowerCase().includes(query.toLowerCase()) ||
        car.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const handleFilter = (category: string) => {
    if (category === "all") {
      setFilteredCars(allCars);
    } else {
      const filtered = allCars.filter((car: Car) =>
        car.type.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  };

  React.useEffect(() => {
    const uniqueTypes = [...new Set(allCars.map((car: Car) => car.type))];
    setCarTypes(uniqueTypes);
  }, [allCars]);

  // if (isLoading) {
  //   return <h2>...Loading</h2>;
  // }

  // if (error) return <p>Error loading the cars</p>;

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
            {carTypes.length === 0 ? (
              <h2>No cars available at the moment</h2>
            ) : carTypes.length > 1 ? (
              <button
                onClick={() => handleFilter("all")}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FiFilter size={18} />
                All Cars
              </button>
            ) : null}
            {carTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFilter(type)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCars.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredCars.map((car: Car) => (
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
