"use client";
import React from "react";

import CarCard from "@/components/CarCard";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiSearch } from "react-icons/fi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/utils/api";
import { Car, fetchCarParams } from "@/types/index";
import PaginationButtons from "@/components/home_page_components/PaginationButtons";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingState from "@/components/sharedComponents/LoadingState";
import ErrorState from "@/components/sharedComponents/ErrorState";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export default function CarsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  const [filterOptions, setFilterOptions] = useState<fetchCarParams>({
    brand: "",
    model: "",
    year: "",
    limit: "10",
    page: 1,
  });

  const [appliedFilters, setAppliedFilters] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", appliedFilters, page],
    queryFn: async () => await fetchCars({ ...appliedFilters, page }),
    placeholderData: keepPreviousData, // keeps old data until fresh one is fetched and ready for use
    staleTime: 1000 * 60 * 30,
  });

  const allCars = React.useMemo(() => data?.data || [], [data]);

  const handleFilterOptions = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterOptions((prevState: fetchCarParams) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const applyFilters = () => {
    const parsed = Object.fromEntries(
      Object.entries(filterOptions)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => {
          if (key === "limit" || key === "year") {
            return [key, Number(value)];
          }
          return [key, value];
        })
    );
    setPage(1);
    setAppliedFilters(parsed);
    const query = new URLSearchParams(parsed).toString();
    router.push(`/cars?${query}`);
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
    return <LoadingState />;
  }
  if (error) return <ErrorState message={String(error)} />;
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <main>
        {/* Header */}
        <section className="bg-linear-to-r from-gray-50 to-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Browse Our Cars
            </h1>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-lg shadow-lg p-2 mb-6">
              <FiSearch className="text-red-600 " size={20} />
              <input
                type="text"
                placeholder="Search by car name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 outline-none text-gray-800"
              />
            </div>

            <section className="bg-white border border-gray-100 py-8 rounded-3xl mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-6 items-end"
                >
                  {/* BRAND */}
                  <div className="flex flex-col gap-1.5">
                    <label className="filter-car-label">Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. BMW"
                      name="brand"
                      value={filterOptions.brand}
                      onChange={handleFilterOptions}
                      className="filter-car-input"
                    />
                  </div>

                  {/* MODEL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="filter-car-label">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. M4"
                      name="model"
                      value={filterOptions.model}
                      onChange={handleFilterOptions}
                      className="filter-car-input"
                    />
                  </div>

                  {/* YEAR - Custom CSS to hide arrows */}
                  <div className="flex flex-col gap-1.5">
                    <label className="filter-car-label">Year</label>
                    <input
                      type="number"
                      placeholder="2024"
                      min={2024}
                      max={2026}
                      name="year"
                      value={filterOptions.year}
                      onChange={handleFilterOptions}
                      className="filter-car-input"
                    />
                  </div>

                  {/* LIMIT */}
                  <div className="flex flex-col gap-1.5">
                    <label className="filter-car-label">Results</label>
                    <select
                      name="limit"
                      value={filterOptions.limit}
                      onChange={handleFilterOptions}
                      className="filter-car-input cursor-pointer appearance-none"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterOptions({
                        brand: "",
                        model: "",
                        year: "",
                        limit: "10",
                        page: 1,
                      });
                      setAppliedFilters({});
                      router.push("/cars");
                    }}
                    className="text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors px-4 py-2"
                  >
                    Clear All
                  </button>
                  {/* APPLY BUTTON */}
                  <button onClick={applyFilters} className="main-car-btn">
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
                {/* pagination */}
                <PaginationButtons
                  page={page}
                  totalPages={data?.totalPages || 1}
                  onPageChange={handlePageChange}
                  hasPrevPage={data?.hasPrevPage}
                  hasNextPage={data?.hasNextPage}
                />
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
      </main>
    </ProtectedRoute>
  );
}
