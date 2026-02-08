import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ label, value, trend, icon: Icon, color = 'indigo' }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 border-2 border-black shadow-brutal flex flex-col justify-between group hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
        >
            <div className="flex justify-between items-start mb-10">
                <div className={`p-3 border-2 border-black text-black group-hover:bg-black group-hover:text-white transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span className="text-[10px] font-black text-black bg-primary-DEFAULT border-2 border-black px-3 py-1 uppercase tracking-widest">
                        {trend}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-5xl font-black text-black leading-none tracking-tighter mb-2 uppercase">{value}</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{label}</p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
