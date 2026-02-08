import React from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Search, Calendar } from 'lucide-react';

const History = () => {
    const mockHistory = [
        { id: 1, emotion: 'Happy', date: '2026-02-08', places: 5 },
        { id: 2, emotion: 'Neutral', date: '2026-02-07', places: 3 },
        { id: 3, emotion: 'Angry', date: '2026-02-05', places: 4 },
    ];

    return (
        <div className="space-y-12">
            <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-4 block">Archive</span>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Sentient <span className="text-indigo-600">History.</span></h1>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <HistoryIcon className="w-5 h-5 text-indigo-600" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Temporal Log</span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="FILTER ENTRIES..."
                            className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-[9px] font-black tracking-widest focus:border-indigo-600 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {mockHistory.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-10">
                                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl italic group-hover:bg-indigo-600 transition-colors">
                                    {item.emotion[0]}
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-slate-900 leading-none mb-2 tracking-tighter uppercase">{item.emotion}</h4>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">{item.date}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">{item.places} Sanctuaries</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-6 py-3 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                                View Analysis
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
