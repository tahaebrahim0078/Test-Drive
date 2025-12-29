import ClientMotion from "@/components/ClientMotion";

export default function CTA() {
  return (
    <section className="bg-red-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ClientMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of satisfied customers who found their dream car
            through our platform.
          </p>

          <div className="max-w-md mx-auto mb-6">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Get Started
              </button>
            </form>
          </div>

          <p className="text-sm text-red-100">
            No spam, just exclusive deals and updates
          </p>
        </ClientMotion>
      </div>
    </section>
  );
}
