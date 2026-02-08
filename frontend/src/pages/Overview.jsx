import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Clock, Zap, MapPin } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import EmotionDiscover from '../components/dashboard/EmotionDiscover';
import { useAuth } from '../context/AuthContext';

const Overview = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-16">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="max-w-3xl">
                    <span className="text-[10px] font-black text-primary-DEFAULT uppercase tracking-[0.5em] mb-4 block">Identity Console</span>
                    <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.85] mb-0 uppercase">
                        HELLO, <span className="text-primary-DEFAULT underline decoration-4 underline-offset-8 decoration-black">{user?.name?.split(' ')[0]}</span>.
                    </h1>
                </div>
                <div className="bg-black px-10 py-6 border-2 border-black text-white flex items-center gap-6 shadow-brutal">
                    <div className="w-2 h-2 bg-primary-DEFAULT animate-pulse"></div>
                    <div>
                        <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] leading-none mb-1.5">Last Calibration</p>
                        <p className="text-[12px] font-black uppercase tracking-widest text-primary-DEFAULT">Active session</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatsCard
                    label="Lifetime Discovery"
                    value="124"
                    trend="+12%"
                    icon={Eye}
                />
                <StatsCard
                    label="Resonance Score"
                    value="98.5%"
                    icon={Zap}
                    color="amber"
                />
                <StatsCard
                    label="Sanctuaries Found"
                    value="42"
                    icon={MapPin}
                    color="emerald"
                />
                <StatsCard
                    label="Network Uptime"
                    value="99.9"
                    icon={Clock}
                    color="slate"
                />
            </div>

            {/* Main Action Area */}
            <div className="pt-8 border-t-2 border-black">
                <EmotionDiscover />
            </div>
        </div>
    );
};

export default Overview;
