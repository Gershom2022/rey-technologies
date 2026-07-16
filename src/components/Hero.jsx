import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import heroBackground from "../assets/rey_technologies_background.png";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full Screen Background Image - Crystal Clear */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-white/90">Innovative Technology Solutions</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Transforming Businesses</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Through Technology
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            We partner with businesses, government institutions, NGOs, and SMEs to deliver secure, scalable technology solutions that drive growth and innovation.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white text-lg shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl font-semibold text-white text-lg border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <span>Our Services</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-white/60">Projects Delivered</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">98%</p>
              <p className="text-sm text-white/60">Client Satisfaction</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div>
              <p className="text-2xl font-bold text-blue-400">24/7</p>
              <p className="text-sm text-white/60">Expert Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;