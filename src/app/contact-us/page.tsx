"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
import ClientMotion from "@/components/ClientMotion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactUs() {
  const hasMounted = useHasMounted();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Our Address",
      description: "Riyadh, Saudi Arabia",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FiPhone,
      title: "Phone",
      description: "+966 11 XXXX XXXX",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FiMail,
      title: "Email",
      description: "support@drivetest.com",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const faqs = [
    {
      question: "How can I book a test-drive?",
      answer:
        "Visit the cars page, choose a vehicle you like, and follow the booking steps to schedule a test-drive.",
    },
    {
      question: "How much does a test-drive cost?",
      answer:
        "Pricing varies by vehicle. Check the price details on each car's page.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes — you can cancel up to 24 hours before the scheduled test-drive without a cancellation fee.",
    },
    {
      question: "How long is a test-drive?",
      answer:
        "Typically between one to two hours depending on the vehicle and arrangement.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <ClientMotion
          initial={hasMounted ? { opacity: 0 } : false}
          animate={hasMounted ? { opacity: 1 } : undefined}
          className="bg-linear-to-br from-red-50 to-orange-50 py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ClientMotion
              initial={hasMounted ? { opacity: 0, y: 20 } : false}
              animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              <h1>Contact Us</h1>
            </ClientMotion>
            <ClientMotion
              initial={hasMounted ? { opacity: 0, y: 20 } : false}
              animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              <p>We are here to answer your questions and support your needs</p>
            </ClientMotion>
          </div>
        </ClientMotion>

        {/* Contact Info */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <ClientMotion
                  key={index}
                  initial={hasMounted ? { opacity: 0, y: 20 } : false}
                  whileInView={hasMounted ? { opacity: 1, y: 0 } : undefined}
                  viewport={hasMounted ? { once: true } : undefined}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-linear-to-br ${info.color} rounded-lg p-8 text-white shadow-lg hover:shadow-xl transition text-center`}
                >
                  <Icon className="text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  <p className="opacity-90">{info.description}</p>
                </ClientMotion>
              );
            })}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <ClientMotion
                initial={hasMounted ? { opacity: 0, x: -50 } : false}
                whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
                viewport={hasMounted ? { once: true } : undefined}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      placeholder="Message subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
                      placeholder="Write your message"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FiSend /> Send Message
                  </button>

                  {submitted && (
                    <motion.div
                      initial={hasMounted ? { opacity: 0, y: -10 } : false}
                      animate={hasMounted ? { opacity: 1, y: 0 } : undefined}
                      className="bg-green-100 text-green-800 p-4 rounded-lg text-center"
                    >
                      Your message has been sent! We will get back to you soon.
                    </motion.div>
                  )}
                </form>
              </ClientMotion>

              {/* Map Placeholder */}
              <ClientMotion
                initial={hasMounted ? { opacity: 0, x: 50 } : false}
                whileInView={hasMounted ? { opacity: 1, x: 0 } : undefined}
                viewport={hasMounted ? { once: true } : undefined}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Our Location
                </h2>
                <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-center p-8">
                    <div>
                      <p className="text-2xl font-bold mb-4">🗺️</p>
                      <p>The actual directions map will appear here</p>
                      <p className="text-sm mt-2">Riyadh, Saudi Arabia</p>
                    </div>
                  </div>
                </div>

                {/* Contact Hours */}
                <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Opening Hours
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Sun - Thu: 09:00 AM - 06:00 PM</p>
                    <p>Fri - Sat: 04:00 PM - 10:00 PM</p>
                  </div>
                </div>
              </ClientMotion>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ClientMotion
                key={index}
                initial={hasMounted ? { opacity: 0 } : false}
                whileInView={hasMounted ? { opacity: 1 } : undefined}
                viewport={hasMounted ? { once: true } : undefined}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </ClientMotion>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <ClientMotion
          initial={hasMounted ? { opacity: 0 } : false}
          whileInView={hasMounted ? { opacity: 1 } : undefined}
          viewport={hasMounted ? { once: true } : undefined}
          className="bg-red-600 text-white py-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Have more questions?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our team is ready to help you anytime
            </p>
            <button className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block">
              Contact Us
            </button>
          </div>
        </ClientMotion>
      </main>

      <Footer />
    </div>
  );
}
