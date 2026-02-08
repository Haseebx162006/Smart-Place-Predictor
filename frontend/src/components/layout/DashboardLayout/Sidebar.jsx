import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    BarChart3,
    History,
    User,
    LogOut,
    LayoutDashboard,
    Map as MapIcon,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'History', icon: History, path: '/dashboard/history' },
        { name: 'Map Mode', icon: MapIcon, path: '/dashboard/map' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r-2 border-black text-black p-8 flex flex-col z-[50]">
            {/* Brand */}
            <Link to="/dashboard" className="flex items-center gap-4 mb-16 group">
                <div className="w-12 h-12 bg-black flex items-center justify-center group-hover:bg-primary-DEFAULT transition-colors">
                    <span className="text-white font-black text-2xl">S</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter leading-none uppercase">
                        Studio<span className="text-primary-DEFAULT">One</span>
                    </span>
                    <span className="text-[10px] font-black text-black/40 tracking-[0.2em] uppercase mt-1">Sentience Interface</span>
                </div>
            </Link>

            {/* Nav */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center justify-between p-5 border-2 transition-all group ${isActive
                                ? 'bg-black text-white border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
                                : 'bg-transparent text-black border-transparent hover:border-black hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center gap-5">
                                <item.icon className={`w-6 h-6 ${isActive ? 'text-primary-DEFAULT' : 'text-black group-hover:text-black'}`} />
                                <span className="text-sm font-black uppercase tracking-widest">{item.name}</span>
                            </div>
                            {isActive && <div className="w-2 h-2 bg-primary-DEFAULT"></div>}
                        </Link>
                    );
                })}
            </nav>

            {/* User & Logout */}
            <div className="pt-8 border-t-2 border-black space-y-6">
                <div className="flex items-center gap-4 p-2">
                    <div className="w-12 h-12 bg-black/5 border-2 border-black flex items-center justify-center font-black text-black">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-black truncate max-w-[140px] uppercase tracking-tighter">{user?.name}</span>
                        <span className="text-[10px] font-black text-primary-DEFAULT uppercase tracking-widest">Authenticated</span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-5 border-2 border-black text-black hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group"
                >
                    <LogOut className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-black uppercase tracking-widest">Terminate</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
