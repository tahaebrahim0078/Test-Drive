"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/utils/api";
import { Car, fetchCarParams } from "@/types/index";

export default function CarsPage() {
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<fetchCarParams>({
    brand: "",
    model: "",
    year: "",
    limit: 10,
    page: 1,
  });

  const [appliedFilters, setAppliedFilters] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", appliedFilters, page],
    queryFn: async () =>
      await fetchCars({ ...appliedFilters, page, limit: filterOptions.limit }),
    staleTime: 1000 * 60 * 30,
  });
  const allCars = React.useMemo(() => data?.data || [], [data]);

  const handleFilterOptions = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterOptions((prevState: fetchCarParams) => ({
      ...prevState,
      [name]:
        name === "year" || name === "limit"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const applyFilters = () => {
    const parsed = {
      brand: filterOptions.brand?.trim() || undefined,
      model: filterOptions.model?.trim() || undefined,
      year: filterOptions.year ? Number(filterOptions.year) : undefined,
      limit: filterOptions.limit ? Number(filterOptions.limit) : undefined,
    };
    setPage(1);
    setAppliedFilters(parsed);
  };

  const carsToRender = React.useMemo(() => {
    if (!searchQuery) return allCars;
    return allCars.filter(
      (car: Car) =>
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allCars, searchQuery]);
  if (isLoading) {
    return <h2>...Loading</h2>;
  }

  if (error) return <p>Error loading the cars</p>;

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-800"
            />
          </div>
          {/* Filter Panel */}
          <section className="bg-white border border-gray-100 py-8 rounded-3xl mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-6 items-end"
              >
                {/* BRAND */}
                <div className="flex flex-col gap-1.5">
                  <label className="filter-label">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. BMW"
                    name="brand"
                    value={filterOptions.brand}
                    onChange={handleFilterOptions}
                    className="filter-input"
                  />
                </div>

                {/* MODEL */}
                <div className="flex flex-col gap-1.5">
                  <label className="filter-label">Model</label>
                  <input
                    type="text"
                    placeholder="e.g. M4"
                    name="model"
                    value={filterOptions.model}
                    onChange={handleFilterOptions}
                    className="filter-input"
                  />
                </div>

                {/* YEAR - Custom CSS to hide arrows */}
                <div className="flex flex-col gap-1.5">
                  <label className="filter-label">Year</label>
                  <input
                    type="number"
                    placeholder="2024"
                    min={2024}
                    max={2026}
                    name="year"
                    value={filterOptions.year}
                    onChange={handleFilterOptions}
                    className="filter-input"
                  />
                </div>

                {/* LIMIT */}
                <div className="flex flex-col gap-1.5">
                  <label className="filter-label">Results</label>
                  <select
                    name="limit"
                    value={filterOptions.limit}
                    onChange={handleFilterOptions}
                    className="filter-input cursor-pointer appearance-none"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>

                {/* APPLY BUTTON */}
                <button
                  onClick={applyFilters}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-950 text-white font-bold px-8 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200"
                >
                  <FiFilter size={18} />
                  <span>Apply Filters</span>
                </button>
              </motion.div>
            </div>
          </section>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {carsToRender.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {carsToRender.map((car: Car) => (
                  <motion.div key={car._id}>
                    <CarCard {...car} />
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex justify-center items-center gap-6 mt-12 mb-8 ">
                <button
                  disabled={!data?.hasPrevPage}
                  onClick={() =>
                    data?.hasPrevPage && setPage((prev) => prev - 1)
                  }
                  className="pagination-prev"
                >
                  <FiChevronLeft size={20} />
                </button>

                {/* Page Counter */}
                <div className="page-indicator">
                  <span className="text-blue-800">{data?.page}</span>
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-gray-500">{data?.totalPages}</span>
                </div>

                <button
                  disabled={!data?.hasNextPage}
                  onClick={() =>
                    data?.hasNextPage && setPage((prev) => prev + 1)
                  }
                  className="pagination-next"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </>
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
