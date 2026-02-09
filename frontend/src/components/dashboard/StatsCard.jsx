import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ label, value, trend, icon: Icon }) => {
    return (
        <motion.div
            whileHover={{ y: -2, x: -2 }}
            className="bento-card bento-card-hover h-full flex flex-col justify-between min-h-[160px] md:min-h-[180px]"
        >
            <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="p-2.5 md:p-3 bg-black text-white border-2 border-black">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                {trend && (
                    <div className="px-2 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-tight border-2 border-black">
                        {trend}
                    </div>
                )}
            </div>

            <div className="relative">
                <h3 className="text-4xl md:text-5xl font-black text-black leading-none tracking-tighter mb-1 uppercase">
                    {value}
                </h3>
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none">
                    {label}
                </p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
