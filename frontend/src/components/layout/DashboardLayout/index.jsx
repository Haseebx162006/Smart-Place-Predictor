import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bell, Search, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const [notifications] = useState(3);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white flex">
            <Sidebar />

            <div className="flex-1 ml-80 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-24 bg-white border-b-2 border-black sticky top-0 z-[40] px-12 flex items-center justify-between">
                    <div className="flex items-center gap-8 flex-1">
                        <div className="relative max-w-md w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                            <input
                                type="text"
                                placeholder="SEARCH PROTOCOL..."
                                className="w-full bg-white border-2 border-black py-4 pl-16 pr-6 text-xs font-bold font-mono tracking-widest focus:outline-none focus:bg-slate-50 transition-all placeholder:text-slate-400 uppercase"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-primary-DEFAULT animate-pulse shadow-[0_0_10px_#FF4D00]"></div>
                            <span className="text-[10px] font-black text-black uppercase tracking-[0.3em]">System Online</span>
                        </div>

                        <div className="h-8 w-[2px] bg-black"></div>

                        <div className="flex items-center gap-6">
                            <button className="p-3 bg-white border-2 border-transparent hover:border-black transition-all relative group">
                                <Bell className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
                                {notifications > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-DEFAULT border-2 border-white"></span>
                                )}
                            </button>
                            <button className="flex items-center gap-4 p-2 pr-6 border-2 border-transparent hover:border-black transition-all bg-white">
                                <div className="w-10 h-10 bg-black flex items-center justify-center font-black text-white text-xs">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-black uppercase tracking-widest">{user?.name?.split(' ')[0]}</span>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 p-12 bg-slate-50 relative">
                    {/* Grid Background */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
