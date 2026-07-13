import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative text-center py-32 px-8 overflow-hidden bg-light">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[30%] w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-bold text-4xl md:text-6xl mb-6 text-dark leading-tight">
          Transforming Businesses Through <span className="text-primary">Technology</span> and Innovation
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-700 leading-relaxed">
          We partner with businesses, government institutions, NGOs, and SMEs to deliver secure, scalable technology solutions that drive growth.
        </p>
        
        <Link
          to="/contact"
          className="bg-accent text-white px-8 py-4 rounded-lg hover:brightness-110 inline-block font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Get in Touch
        </Link>

        {/* Decorative line */}
        <div className="mt-16 flex justify-center gap-2 opacity-60">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero