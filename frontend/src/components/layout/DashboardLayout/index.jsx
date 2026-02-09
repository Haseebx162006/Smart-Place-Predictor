import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bell, Search, Command, Menu, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const [notifications] = useState(3);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="lg:ml-72 flex flex-col min-h-screen relative overflow-hidden">
                {/* Visual Grain & Grid */}
                <div className="noise-overlay opacity-[0.03]"></div>
                <div className="swiss-grid absolute inset-0 opacity-10 pointer-events-none"></div>

                {/* Top Header - Reduced height */}
                <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b-4 border-black sticky top-0 z-[40] px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
                    {/* Left side - Menu button + Search */}
                    <div className="flex items-center gap-4 flex-1">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="menu-toggle"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Terminal Label - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-3">
                            <Command className="w-5 h-5 text-primary" />
                            <div className="h-6 w-[2px] bg-black/10"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Terminal / 01</span>
                        </div>

                        {/* Search - Responsive */}
                        <div className="relative flex-1 max-w-md lg:max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                            <input
                                type="text"
                                placeholder="SEARCH..."
                                className="w-full bg-slate-50 border-2 md:border-4 border-black py-2 md:py-3 pl-12 pr-4 text-[10px] font-black tracking-[0.15em] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#000] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all placeholder:text-slate-400 uppercase"
                            />
                        </div>
                    </div>

                    {/* Right side - Status + Notifications + User */}
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Status indicator - Hidden on mobile */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary animate-ping"></div>
                            <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Active</span>
                        </div>

                        {/* Notification Button */}
                        <button className="p-2 md:p-3 bg-white border-2 md:border-4 border-black hover:bg-black hover:text-white transition-all relative group shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                            <Bell className="w-4 h-4 md:w-5 md:h-5" />
                            {notifications > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-2 border-black text-[8px] font-black flex items-center justify-center text-white">
                                    {notifications}
                                </span>
                            )}
                        </button>

                        {/* User Avatar - Simplified on mobile */}
                        <button className="flex items-center gap-3 p-1 md:p-2 bg-black border-2 md:border-4 border-black group">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center font-black text-white text-sm md:text-lg">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden md:flex flex-col items-start pr-4">
                                <span className="text-[10px] font-black text-white uppercase tracking-wide">{user?.name?.split(' ')[0]}</span>
                                <span className="text-[8px] font-black text-primary uppercase">Elite</span>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Dynamic Content - Responsive padding */}
                <main className="flex-1 p-4 md:p-8 lg:p-12 relative z-10">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
