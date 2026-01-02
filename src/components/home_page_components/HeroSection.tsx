"use client";
import ClientMotion from "@/components/ClientMotion";
import Image from "next/image";
import homepageImg from "../../../public/images/homepage.png";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function HeroSection() {
  const { isLoggedIn } = useAuth();
  return (
    <section className="bg-[#fefefe] pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <ClientMotion
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book Your Test{" "}
              <span className="text-red-600">Drive in Minute</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience the fastest and most seamless way to book test drives
              online. Browse premium cars, select your time, and confirm
              instantly.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-gray-600 text-sm">Cars Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-gray-600 text-sm">Partner Dealers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">10K+</p>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cars"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition inline-block text-center"
              >
                Browse Cars
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/auth/register"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-lg transition inline-block text-center"
                >
                  Register Now
                </Link>
              )}
            </div>
          </ClientMotion>

          {/* Right Image */}
          <ClientMotion
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div>
              <Image
                src={homepageImg}
                width={800}
                height={500}
                alt="Luxury Car"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </ClientMotion>
        </div>
      </div>
    </section>
  );
}
