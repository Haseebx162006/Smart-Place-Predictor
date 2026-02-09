import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    History,
    User,
    LogOut,
    LayoutDashboard,
    Map as MapIcon,
    Cpu,
    Shield,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'History', icon: History, path: '/dashboard/history' },
        { name: 'Map Mode', icon: MapIcon, path: '/dashboard/map' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
    ];

    const handleNavClick = () => {
        // Close sidebar on mobile after navigation
        if (onClose) onClose();
    };

    return (
        <aside className={`
            fixed left-0 top-0 bottom-0 w-72 bg-white border-r-4 border-black text-black flex flex-col z-[50]
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
        `}>
            {/* Visual Grain */}
            <div className="noise-overlay opacity-[0.02]"></div>

            {/* Mobile Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 border-2 border-black hover:bg-black hover:text-white transition-all lg:hidden"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Brand */}
            <div className="p-6 lg:p-8">
                <Link to="/dashboard" className="flex flex-col group relative" onClick={handleNavClick}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black flex items-center justify-center border-4 border-black group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                            <Cpu className="text-white w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl lg:text-3xl font-black tracking-tighter leading-none uppercase">
                                Sentio<span className="text-primary">X</span>
                            </span>
                            <span className="text-[8px] font-black text-black/30 tracking-[0.3em] uppercase mt-1">v2.0 / STABLE</span>
                        </div>
                    </div>
                    {/* Decorative Line */}
                    <div className="h-1 bg-black w-full"></div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 lg:px-6 space-y-2">
                <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.4em] mb-4 px-2">Main Interface</p>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={handleNavClick}
                            className={`flex items-center justify-between p-3 lg:p-4 border-4 transition-all group ${isActive
                                ? 'bg-black text-white border-black shadow-[4px_4px_0px_#FF4D00] -translate-x-0.5 -translate-y-0.5'
                                : 'bg-transparent text-black border-transparent hover:border-black hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-black group-hover:text-black'}`} />
                                <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.15em]">{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User & Logout */}
            <div className="p-4 lg:p-6 border-t-4 border-black space-y-4">
                <div className="p-4 bg-slate-50 border-4 border-black relative overflow-hidden group">
                    <Shield className="absolute -right-2 -bottom-2 w-12 h-12 text-black/5 group-hover:scale-110 transition-transform" />
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-black border-4 border-black flex items-center justify-center font-black text-white text-sm">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                            <span className="text-[10px] font-black text-black truncate uppercase tracking-tight leading-none mb-1">{user?.name}</span>
                            <span className="text-[8px] font-black text-primary uppercase tracking-widest">Authorized</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-3 p-3 lg:p-4 bg-white border-4 border-black text-black font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white hover:border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all active:translate-x-0 active:translate-y-0 active:shadow-none"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
