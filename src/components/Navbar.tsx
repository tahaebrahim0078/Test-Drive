"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DriveTest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-600 transition"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="text-gray-700 hover:text-red-600 transition"
            >
              Cars
            </Link>
            <Link
              href="/about-us"
              className="text-gray-700 hover:text-red-600 transition"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-red-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  {user.name} (
                  {user.role === "customer"
                    ? "Customer"
                    : user.role === "dealer"
                    ? "Dealer"
                    : "Admin"}
                  )
                </span>

                {user.role === "dealer" && (
                  <Link
                    href="/dealer/dashboard"
                    className="text-blue-600 hover:text-blue-700 transition font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="text-purple-600 hover:text-purple-700 transition font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "customer" && (
                  <Link
                    href="/customer/bookings"
                    className="text-green-600 hover:text-green-700 transition font-medium"
                  >
                    My Bookings
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  <FiLogOut /> Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-red-600 transition font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 transition"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block text-gray-700 hover:text-red-600 transition py-2"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="block text-gray-700 hover:text-red-600 transition py-2"
            >
              Cars
            </Link>
            <Link
              href="/about-us"
              className="block text-gray-700 hover:text-red-600 transition py-2"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="block text-gray-700 hover:text-red-600 transition py-2"
            >
              Contact
            </Link>
            {isLoggedIn && user ? (
              <>
                <div className="py-2 text-gray-700 border-t border-gray-200 mt-4">
                  <p className="font-semibold">{user.name}</p>
                </div>
                {user.role === "dealer" && (
                  <Link
                    href="/dealer/dashboard"
                    className="block text-blue-600 hover:text-blue-700 transition py-2"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="block text-purple-600 hover:text-purple-700 transition py-2"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "customer" && (
                  <Link
                    href="/customer/bookings"
                    className="block text-green-600 hover:text-green-700 transition py-2"
                  >
                    My Bookings
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium mt-2"
                >
                  <FiLogOut /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block text-gray-700 hover:text-red-600 transition py-2 border-t border-gray-200 mt-4"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
