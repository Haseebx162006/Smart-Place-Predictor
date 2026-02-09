import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, MapPin, Activity, ShieldCheck, Database, Terminal } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import EmotionDiscover from '../components/dashboard/EmotionDiscover';
import { useAuth } from '../context/AuthContext';
import { historyAPI } from '../services/api';

const Overview = () => {
    const { user } = useAuth();
    const [historyCount, setHistoryCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await historyAPI.getHistory();
                setHistoryCount(response.data.length);
            } catch (err) {
                console.error("Failed to fetch overview stats:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header Section - Responsive */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b-4 border-black">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-4">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="label-text text-black/40">Command Console</span>
                    </div>
                    <h1 className="heading-xl flex flex-col">
                        <span>HELLO,</span>
                        <span className="text-primary italic truncate">{user?.name?.split(' ')[0]}—01</span>
                    </h1>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-black p-4 border-4 border-black group">
                        <Activity className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1">Sync</p>
                            <p className="text-sm md:text-base font-black uppercase text-white tracking-wider leading-none">94.8% Nominal</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bento Grid - 12 column responsive */}
            <div className="grid-dashboard">
                {/* Discovery Tool - Large Tile */}
                <div className="col-span-4 md:col-span-8 lg:col-span-8 row-span-2">
                    <div className="h-full bg-white border-4 border-black p-1 relative group min-h-[500px] md:min-h-[600px]">
                        {/* Decorative Label - Hidden on mobile */}
                        <div className="hidden md:block absolute top-6 -right-3 bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] rotate-90 z-20">
                            Live
                        </div>
                        <div className="h-full bg-white border-2 border-black/10 overflow-hidden">
                            <EmotionDiscover onAnalysisComplete={() => {
                                // Trigger stats refresh
                                historyAPI.getHistory().then(res => setHistoryCount(res.data.length));
                            }} />
                        </div>
                    </div>
                </div>

                {/* Stats Column */}
                <div className="col-span-4 md:col-span-4 lg:col-span-4">
                    <StatsCard
                        label="DISCOVERIES"
                        value={historyCount.toString()}
                        trend={historyCount > 0 ? "LIVE" : "0%"}
                        icon={Eye}
                    />
                </div>

                {/* System Status Tile */}
                <div className="col-span-4 md:col-span-4 lg:col-span-4">
                    <div className="h-full bento-card bento-card-hover bg-primary/5 min-h-[180px]">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="w-8 h-8 text-black" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Guardian v2</span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-black/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    className="h-full bg-black"
                                />
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest">Neural Link: 85%</p>
                        </div>
                    </div>
                </div>

                {/* Secondary Stats Row */}
                <div className="col-span-4 md:col-span-4 lg:col-span-4">
                    <StatsCard
                        label="RESONANCE"
                        value="98.5"
                        icon={Zap}
                    />
                </div>

                <div className="col-span-4 md:col-span-4 lg:col-span-4">
                    <StatsCard
                        label="SANCTUARIES"
                        value={historyCount > 0 ? (historyCount * 2).toString() : "0"}
                        icon={MapPin}
                    />
                </div>

                {/* Database Tile */}
                <div className="col-span-4 md:col-span-4 lg:col-span-4">
                    <div className="h-full bento-card bento-card-hover flex flex-col justify-between min-h-[180px]">
                        <div className="flex justify-between items-start">
                            <Database className="w-8 h-8 text-primary" />
                            <div className="text-right">
                                <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">Latency</p>
                                <p className="text-base font-black uppercase tracking-widest">14ms</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2">Vault Capacity</p>
                            <div className="flex gap-1">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`h-3 flex-1 border-2 border-black ${i < 7 ? 'bg-primary' : 'bg-transparent'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
