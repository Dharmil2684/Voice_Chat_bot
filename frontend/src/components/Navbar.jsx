import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, LogOut, Home, Mic, User } from 'lucide-react';
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Don't show Navbar on Login or Signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    // "fixed top-0" pins it. "z-50" ensures it stays on top of other content.
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center justify-between px-6">
      
      {/* Logo / Brand */}
      <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:text-blue-700 transition">
        <Mic size={24} />
        <span>Voice Bot</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        
        {/* Home Link */}
        <Link to="/" className={`p-2 rounded-full transition ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`} title="Home">
          <Home size={20} />
        </Link>

        {/* Dashboard Link */}
        <Link to="/dashboard" className={`p-2 rounded-full transition ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`} title="Analytics">
          <BarChart3 size={20} />
        </Link>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        <Link to="/profile" className={`p-2 rounded-full transition ${location.pathname === '/profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`} title="My Profile">
            <User size={20} />
        </Link>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;