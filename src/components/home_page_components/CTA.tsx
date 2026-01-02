export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-black via-zinc-900 to-black text-white py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            The Moment You Drive It
            <br />
            <span className="text-red-500">You Understand</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-zinc-300 mb-10">
            Don’t just look at cars — drive them. Experience performance,
            comfort, and control before you decide.
          </p>
          <div className="max-w-md mx-auto mb-6">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-amber-50 text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
