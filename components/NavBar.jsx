import { useState } from 'react';
import BtnBlue from './Btn-Blue';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    // Helper to check if link is active
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Framer Motion variants
    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.35,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.25,
                ease: 'easeInOut',
            },
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: 'easeOut',
            },
        }),
    };

    const actionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.35 + i * 0.08,
                duration: 0.3,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-b from-white/80 via-white/75 to-white/60 backdrop-blur-lg">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="py-5 sm:py-6">
                    {/* Desktop Navbar Container */}
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between h-16 rounded-full bg-white/90 backdrop-blur-xl border border-white/30 px-6 sm:px-8 shadow-sm">
                            {/* Logo */}
                            <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
                                <img
                                    src="https://framerusercontent.com/images/0xjCt9oWtBBHoD9FZPCZLnKfgjo.png"
                                    alt="Travely"
                                    className="h-7 w-auto"
                                />
                            </Link>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
                                <Link to="/" className={`nav-link ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>Home</Link>
                                <Link to="/tour" className={`nav-link ${isActive('/tour') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>Tour</Link>
                                <Link to="/about" className={`nav-link ${isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>About Us</Link>
                                <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>Contact Us</Link>
                                <Link to="/bookings" className={`nav-link ${isActive('/bookings') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>Bookings</Link>
                                <Link to="/wishlist" className={`nav-link ${isActive('/wishlist') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>Wishlist</Link>
                            </div>

                            {/* Desktop CTA */}
                            <div className="hidden md:flex items-center gap-3">
                                {isAuthenticated ? (
                                    <>
                                        <span className="text-sm font-medium text-gray-600">
                                            Hi, {user?.name || user?.email || 'Traveler'}
                                        </span>
                                        <BtnBlue title="Logout" size="sm" variant="light" onClick={handleLogout} />
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:text-blue-500"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                                <BtnBlue title="Get In Touch" size="sm" />
                            </div>

                            {/* Mobile Menu Toggle */}
                            <motion.button
                                className="md:hidden flex flex-col gap-1.5 p-2"
                                onClick={() => setIsOpen(!isOpen)}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    className="w-6 h-0.5 bg-gray-800 block"
                                    animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.span
                                    className="w-6 h-0.5 bg-gray-800 block"
                                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.span
                                    className="w-6 h-0.5 bg-gray-800 block"
                                    animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden pb-4"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-0">
                                <div className="mt-3 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg overflow-hidden">
                                    {/* Menu Links */}
                                    <div className="divide-y divide-gray-100">
                                        {['/', '/tour', '/about', '/contact', '/bookings', '/wishlist'].map((path, i) => {
                                            const labels = ['Home', 'Tour', 'About Us', 'Contact Us', 'Bookings', 'Wishlist'];
                                            return (
                                                <motion.div
                                                    key={path}
                                                    custom={i}
                                                    variants={linkVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                >
                                                    <Link
                                                        to={path}
                                                        className={`block px-4 py-3 text-sm font-medium transition-colors ${
                                                            isActive(path)
                                                                ? 'bg-blue-50 text-blue-600'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {labels[i]}
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Mobile Actions */}
                                    <motion.div
                                        className="border-t border-gray-100 p-4 space-y-3"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.08,
                                                    delayChildren: 0.35,
                                                },
                                            },
                                        }}
                                    >
                                        {isAuthenticated ? (
                                            <>
                                                <motion.span
                                                    className="block text-sm font-medium text-gray-700 px-2"
                                                    variants={actionVariants}
                                                    custom={0}
                                                >
                                                    Hi, {user?.name || user?.email || 'Traveler'}
                                                </motion.span>
                                                <motion.div variants={actionVariants} custom={1}>
                                                    <BtnBlue
                                                        title="Logout"
                                                        size="sm"
                                                        variant="light"
                                                        onClick={handleLogout}
                                                        className="w-full"
                                                    />
                                                </motion.div>
                                            </>
                                        ) : (
                                            <>
                                                <motion.div variants={actionVariants} custom={0}>
                                                    <Link
                                                        to="/login"
                                                        className="block w-full text-center px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Login
                                                    </Link>
                                                </motion.div>
                                                <motion.div variants={actionVariants} custom={1}>
                                                    <Link
                                                        to="/register"
                                                        className="block w-full text-center px-4 py-2 rounded-lg bg-gray-900 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Register
                                                    </Link>
                                                </motion.div>
                                            </>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Add some spacing for fixed navbar */}
            <style>{`
                .nav-link {
                    font-size: 15px;
                    font-weight: 500;
                    position: relative;
                    transition: color 0.3s ease;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #558ffc;
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;