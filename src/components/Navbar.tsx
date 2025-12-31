"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const { user, isLoggedIn, logout, isLoading } = useAuth();
  const pathname = usePathname();

  /* Scroll effect */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active link classes */
  const navLinkClass = (path: string) =>
    `relative font-medium transition
     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:bg-red-500 after:transition-all after:duration-300
     ${
       pathname === path
         ? "text-gray-900 after:w-full"
         : "text-gray-600 after:w-0 hover:text-gray-900 hover:after:w-full"
     }`;

  const mobileLinkClass = (path: string) =>
    `block py-2 font-medium transition
     ${
       pathname === path ? "text-red-500" : "text-gray-600 hover:text-red-500"
     }`;

  const showCars = user?.role !== "dealer";
  if (isLoading) {
    return (
      <nav className="fixed top-0 w-full h-16 bg-white/70 backdrop-blur-md" />
    );
  }
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50">
        {/* Glass Background */}
        <div
          className={`absolute inset-0 transition-all duration-300
            ${
              scrolled
                ? "bg-white/70 backdrop-blur-md shadow-md"
                : "bg-transparent backdrop-blur-0 shadow-none"
            }
          `}
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                DriveTest
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className={navLinkClass("/")}>
                Home
              </Link>

              {showCars && (
                <Link href="/cars" className={navLinkClass("/cars")}>
                  Cars
                </Link>
              )}

              <Link href="/about-us" className={navLinkClass("/about-us")}>
                About
              </Link>
              <Link href="/contact-us" className={navLinkClass("/contact-us")}>
                Contact
              </Link>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-6">
              {isLoggedIn && user ? (
                <>
                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center capitalize text-gray-600 font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <span className="text-xs text-red-500 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {user.role === "dealer" && (
                    <Link
                      href="/dealer/dashboard"
                      className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                    >
                      Dashboard
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
                    >
                      Admin
                    </Link>
                  )}

                  {user.role === "customer" && (
                    <Link
                      href="/customer/bookings"
                      className="px-4 py-2 rounded-xl bg-red-100 text-red-600 text-sm font-medium hover:bg-red-500 hover:text-white transition"
                    >
                      My Bookings
                    </Link>
                  )}

                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl
                               bg-gray-100 text-gray-600 text-sm font-medium
                               hover:bg-red-500 hover:text-white transition"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden cursor-pointer text-gray-700 hover:text-red-500 transition"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* ================= MOBILE MENU ================= */}
          {isOpen && (
            <div className="md:hidden mt-4 rounded-2xl bg-white shadow-lg p-4 space-y-3">
              <Link href="/" className={mobileLinkClass("/")}>
                Home
              </Link>

              {showCars && (
                <Link href="/cars" className={mobileLinkClass("/cars")}>
                  Cars
                </Link>
              )}

              <Link href="/about-us" className={mobileLinkClass("/about-us")}>
                About
              </Link>
              <Link
                href="/contact-us"
                className={mobileLinkClass("/contact-us")}
              >
                Contact
              </Link>

              <div className="border-t pt-3 space-y-2">
                {isLoggedIn && user ? (
                  <>
                    {user.role === "dealer" && (
                      <Link
                        href="/dealer/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block text-center bg-red-500 text-white py-2 rounded-xl"
                      >
                        Dashboard
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block text-center bg-purple-600 text-white py-2 rounded-xl"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    {user.role === "customer" && (
                      <Link
                        href="/customer/bookings"
                        onClick={() => setIsOpen(false)}
                        className="block text-center bg-red-100 text-red-600 py-2 rounded-xl"
                      >
                        My Bookings
                      </Link>
                    )}

                    <button
                      onClick={() => setShowLogoutDialog(true)}
                      className="w-full flex items-center cursor-pointer justify-center gap-2
                                 bg-gray-100 hover:bg-red-500 hover:text-white
                                 text-gray-600 py-2 rounded-xl transition"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-center text-gray-600"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block bg-red-500 text-white py-2 text-center rounded-xl"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ================= LOGOUT DIALOG ================= */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLogoutDialog(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl w-[90%] max-w-sm p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Log out
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-2 cursor-pointer rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowLogoutDialog(false);
                  setIsOpen(false);
                }}
                className="flex-1 py-2 cursor-pointer rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
