import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative text-center py-20 px-8 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-50">
        <div className="absolute top-[-10%] left-[10%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[30%] w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Actual content, explicitly above the blobs */}
      <div className="relative z-10">
        <h1 className="font-bold text-3xl md:text-5xl mb-6">
          Transforming Businesses Through Technology and Innovation
        </h1>
        <p className="max-w-2xl mx-auto mb-6">
          We partner with businesses, government institutions, NGOs, and SMEs to deliver secure, scalable technology solutions that drive growth.
        </p>
        <Link
          to="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}

export default Hero