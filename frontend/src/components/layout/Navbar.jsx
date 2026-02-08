import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Protocol', href: '#how-it-works' },
        { name: 'Reviews', href: '#testimonials' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className={`flex justify-between items-center px-6 py-4 border-b-2 border-slate-900 transition-all duration-300 ${scrolled
                    ? 'bg-white/95'
                    : 'bg-white'
                    }`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black hover:bg-white hover:text-black transition-colors">
                            <span className="text-white font-black text-xl hover:text-black">SP</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-black italic uppercase">
                            Smart<span className="text-black underline decoration-4 underline-offset-4 decoration-primary-DEFAULT">Place</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="h-4 w-px bg-slate-200"></div>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    Terminate
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/login" className="text-sm font-black text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                                    Login
                                </Link>
                                <Link to="/signup">
                                    <button className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black hover:border-black transition-all flex items-center gap-2">
                                        Initialize
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-28 left-6 right-6 bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-8 z-50 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-black text-slate-900 border-b border-slate-100 pb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-4 pt-4">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-bold text-indigo-600">
                                            Dashboard
                                        </Link>
                                        <button onClick={() => { logout(); setIsOpen(false); }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-500 text-center uppercase tracking-widest">
                                            Login
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                                            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                                                Join Free
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
