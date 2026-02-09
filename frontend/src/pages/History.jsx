import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Search, Calendar, Loader2, Inbox } from 'lucide-react';
import { historyAPI } from '../services/api';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await historyAPI.getHistory();
                setHistory(response.data);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const filteredHistory = history.filter(item =>
        item.emotion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <span className="label-text text-primary mb-3 block">Archive</span>
                <h1 className="heading-xl">
                    Sentient <span className="text-primary italic">History.</span>
                </h1>
            </div>

            {/* History List - Brutalist Style */}
            <div className="bento-card p-0 overflow-hidden">
                {/* Header Bar */}
                <div className="p-4 md:p-6 border-b-4 border-black bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <HistoryIcon className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black text-black uppercase tracking-widest">Temporal Log</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="FILTER..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-auto bg-white border-4 border-black py-2 pl-9 pr-4 text-[9px] font-black tracking-widest focus:shadow-[4px_4px_0px_#000] focus:-translate-x-0.5 focus:-translate-y-0.5 outline-none transition-all uppercase"
                        />
                    </div>
                </div>

                {/* List Items */}
                <div className="divide-y-4 divide-black">
                    {loading ? (
                        <div className="p-12 flex flex-col items-center justify-center gap-4 text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Recalling fragments...</span>
                        </div>
                    ) : filteredHistory.length === 0 ? (
                        <div className="p-12 flex flex-col items-center justify-center gap-4 text-slate-400">
                            <Inbox className="w-8 h-8" />
                            <span className="text-[10px] font-black uppercase tracking-widest">No spectral traces found</span>
                        </div>
                    ) : (
                        filteredHistory.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 md:gap-6">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-black flex items-center justify-center text-white font-black text-lg md:text-xl group-hover:bg-primary transition-colors border-4 border-black">
                                        {item.emotion[0]}
                                    </div>
                                    {/* Info */}
                                    <div>
                                        <h4 className="text-lg md:text-xl font-black text-black leading-none mb-2 tracking-tighter uppercase">{item.emotion}</h4>
                                        <div className="flex flex-wrap items-center gap-3 text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{item.date}</span>
                                            </div>
                                            <div className="w-1 h-1 bg-slate-300"></div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-primary">{item.placesCount} Sanctuaries</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Action Button */}
                                <button className="px-4 py-2 border-4 border-black text-[9px] font-black uppercase tracking-[0.15em] text-black group-hover:bg-black group-hover:text-white transition-all shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                                    Recall
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
