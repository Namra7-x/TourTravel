import { useState } from 'react';
import '../css/NavBar.css';
import BtnBlue from './Btn-Blue';
import { Link, useLocation } from "react-router-dom";
import useAuthStore from '../store/authStore';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    // Helper to check if link is active
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-pill">
                <Link to="/" className="navbar-logo">
                    <img src="https://framerusercontent.com/images/0xjCt9oWtBBHoD9FZPCZLnKfgjo.png" alt="Travely" />
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
                    <Link to="/tour" className={`nav-link ${isActive('/tour') ? 'active' : ''}`}>Tour</Link>
                    <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
                    <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact Us</Link>
                    <Link to="/bookings" className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}>Bookings</Link>
                </div>

                <div className="navbar-cta flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="hidden items-center gap-3 md:flex">
                            <span className="text-sm font-medium text-[#56575c]">
                                Hi, {user?.name || user?.email || 'Traveler'}
                            </span>
                            <BtnBlue title="Logout" size="sm" variant="light" onClick={handleLogout} />
                        </div>
                    ) : (
                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                to="/login"
                                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-[#161618] transition-colors hover:border-[#558ffc] hover:text-[#558ffc]"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-full bg-[#161618] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#558ffc]"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <BtnBlue title="Get In Touch" size="sm" /> 
                </div>

                <button className={`mobile-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            
            {/* You can implement a mobile drawer here later using the isOpen state */}
        </nav>
    );
};

export default Navbar;