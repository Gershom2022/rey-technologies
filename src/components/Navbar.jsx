// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; // ← ADD THIS IMPORT

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth(); // ← ADD THIS LINE

    const handleLogout = () => {
        logout(); // ← USE THE HOOK'S LOGOUT
        navigate('/');
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Rey Technologies
                </Link>
                
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                    <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
                    <Link to="/industries" className="hover:text-blue-400 transition-colors">Industries</Link>
                    <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
                    <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
                    
                    {isAuthenticated ? ( // ← UPDATED: Use isAuthenticated from hook
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    ) : (
                        <Link 
                            to="/admin/login" 
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            Admin
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;