import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('adminToken');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700';
  };

  const navLinks = (
    <>
      <li className={`${isActive('/')} hover:text-blue-600 cursor-pointer transition-colors`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
      </li>
      <li className={`${isActive('/services')} hover:text-blue-600 cursor-pointer transition-colors`}>
        <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
      </li>
      <li className={`${isActive('/industries')} hover:text-blue-600 cursor-pointer transition-colors`}>
        <Link to="/industries" onClick={() => setIsMenuOpen(false)}>Industries</Link>
      </li>
      <li className={`${isActive('/about')} hover:text-blue-600 cursor-pointer transition-colors`}>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
      </li>
      <li className={`${isActive('/contact')} hover:text-blue-600 cursor-pointer transition-colors`}>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      </li>
      {isAdmin && (
        <>
          <li className="text-sm text-gray-500">👤 Admin</li>
          <li>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 cursor-pointer transition-colors text-sm">
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="px-8 py-4 shadow-md bg-white relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-blue-600" size={24} />
          Rey Technologies
        </div>

        <ul className="hidden md:flex gap-6 items-center">
          {navLinks}
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 pb-2">
          {navLinks}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;