import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('adminToken');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-accent font-semibold' : 'text-white hover:text-cyan-100';
  };

  const navLinks = (
    <>
      <li className={`${isActive('/')} cursor-pointer transition-colors`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
      </li>
      <li className={`${isActive('/services')} cursor-pointer transition-colors`}>
        <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
      </li>
      <li className={`${isActive('/industries')} cursor-pointer transition-colors`}>
        <Link to="/industries" onClick={() => setIsMenuOpen(false)}>Industries</Link>
      </li>
      <li className={`${isActive('/about')} cursor-pointer transition-colors`}>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
      </li>
      <li className={`${isActive('/contact')} cursor-pointer transition-colors`}>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      </li>
      {isAdmin && (
        <>
          <li className="text-sm text-accent font-medium">👤 Admin</li>
          <li>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-accent text-white rounded-lg hover:brightness-110 cursor-pointer transition-all text-sm font-semibold"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-primary shadow-lg relative">
      <div className="px-8 py-3 flex justify-between items-center">
        {/* Rey Technologies Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* R shape (blue) */}
            <path d="M 15 25 L 35 25 Q 42 25 42 35 Q 42 42 35 42 L 25 42 L 25 60 L 15 60 Z M 25 35 L 25 40 L 35 40 Q 38 40 38 35 Q 38 30 35 30 L 25 30 Z" fill="#0055CC"/>
            
            {/* T shape (dark gray) */}
            <g>
              <rect x="42" y="25" width="18" height="5" fill="#404040"/>
              <rect x="50" y="30" width="2" height="30" fill="#404040"/>
            </g>
            
            {/* Blue swoosh curves */}
            <path d="M 35 45 Q 55 40 70 50" stroke="#0055CC" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M 65 35 Q 72 32 78 40" stroke="#0055CC" strokeWidth="3" fill="none" strokeLinecap="round"/>
            
            {/* Pixel scatter (data/tech) */}
            <g fill="#0055CC">
              <rect x="70" y="20" width="6" height="6"/>
              <rect x="78" y="28" width="5" height="5"/>
              <rect x="72" y="40" width="4" height="4"/>
            </g>
            <g fill="#404040">
              <rect x="75" y="35" width="5" height="5"/>
              <rect x="80" y="20" width="4" height="4"/>
              <rect x="68" y="35" width="3" height="3"/>
            </g>
          </svg>
          
          <div>
            <div className="font-bold text-lg text-white leading-tight">Rey</div>
            <div className="text-xs text-cyan-100 leading-tight">Technologies</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center text-sm md:text-base">
          {navLinks}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl hover:text-cyan-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col gap-3 px-8 pb-4 text-sm">
          {navLinks}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;