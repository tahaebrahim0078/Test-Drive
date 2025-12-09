"use client";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import { FiTarget, FiEye, FiHeart, FiAward } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  const hasMounted = useHasMounted();
  const values = [
    {
      icon: FiTarget,
      title: "Mission",
      description:
        "Provide a seamless and safe test-drive experience for customers while supporting agencies and dealers",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FiEye,
      title: "Vision",
      description: "To become the leading test-drive platform in the region",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FiHeart,
      title: "Values",
      description:
        "Integrity, innovation, and service excellence guide our work",
      color: "from-red-500 to-red-600",
    },
    {
      icon: FiAward,
      title: "Quality",
      description: "We commit to the highest standards of safety and quality",
      color: "from-green-500 to-green-600",
    },
  ];

  const team = [
    {
      name: "Michael Ahmed",
      role: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    },
    {
      name: "Fatima Ali",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    },
    {
      name: "Ali Salem",
      role: "Head of Development",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
    },
    {
      name: "Sarah Mahmoud",
      role: "Marketing Lead",
      image:
        "https://images.unsplash.com/photo-1507294233902-c73d0d2b9b49?w=500&h=500&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <motion.section
          initial={hasMounted ? { opacity: 0 } : false}
          animate={hasMounted ? { opacity: 1 } : undefined}
          className="bg-linear-to-br from-red-50 to-orange-50 py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={hasMounted ? { opacity: 0, y: 20 } : false}
              animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              About DriveTest
            </motion.h1>
            <motion.p
              initial={hasMounted ? { opacity: 0, y: 20 } : false}
              animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              We look to the future and are transforming the test-drive
              experience
            </motion.p>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={hasMounted ? { opacity: 0, x: -50 } : false}
              whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
              viewport={hasMounted ? { once: true } : undefined}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                DriveTest started as a small project with a big idea: make
                test-drives simple for customers and provide agencies with
                efficient booking management.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Over time, our platform grew to serve thousands of customers and
                partners while staying true to our core principles:
                transparency, safety, and excellence.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we are proud to be a trusted choice for test-drives in
                the region, powered by a dedicated team improving our services
                every day.
              </p>
            </motion.div>
            <motion.div
              initial={hasMounted ? { opacity: 0, x: 50 } : false}
              whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
              viewport={hasMounted ? { once: true } : undefined}
              className="bg-linear-to-br from-red-100 to-orange-100 rounded-lg p-8 text-center"
            >
              <p className="text-5xl font-bold text-red-600 mb-2">10K+</p>
              <p className="text-gray-600 mb-6">Successful Test-Drives</p>
              <p className="text-5xl font-bold text-orange-600 mb-2">50+</p>
              <p className="text-gray-600 mb-6">Partner Agencies</p>
              <p className="text-5xl font-bold text-red-600 mb-2">100%</p>
              <p className="text-gray-600">Customer Satisfaction</p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={hasMounted ? { opacity: 0, y: 20 } : false}
                    whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
                    viewport={hasMounted ? { once: true } : undefined}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-linear-to-br ${value.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}
                  >
                    <Icon className="text-4xl mb-4" />
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-sm opacity-90">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-red-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={hasMounted ? { opacity: 0 } : false}
          whileInView={hasMounted ? { opacity: 1 } : undefined}
          viewport={hasMounted ? { once: true } : undefined}
          className="bg-red-600 text-white py-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
            <p className="text-lg mb-8 opacity-90">
              Be part of the test-drive revolution. Get started with DriveTest.
            </p>
            <button className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
              Get Started
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
