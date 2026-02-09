import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Shield, Bell, AppWindow } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    const sections = [
        { name: 'Security', icon: Shield, desc: 'Manage access keys and privacy.' },
        { name: 'Alerts', icon: Bell, desc: 'Configure notifications.' },
        { name: 'Preferences', icon: AppWindow, desc: 'Customize your interface.' },
    ];

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Avatar - Square brutalist style */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary flex items-center justify-center text-white text-3xl md:text-4xl font-black border-4 border-black shadow-[6px_6px_0px_#000]">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                {/* User Info */}
                <div className="text-center md:text-left">
                    <span className="label-text text-primary mb-2 block">Biological ID</span>
                    <h1 className="heading-lg mb-1">{user?.name}</h1>
                    <p className="text-sm md:text-base text-slate-400 font-bold tracking-tight uppercase">{user?.email}</p>
                </div>
            </div>

            {/* Settings Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {sections.map((section, i) => (
                    <motion.div
                        key={section.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bento-card bento-card-hover p-6 md:p-8 cursor-pointer"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 border-4 border-black flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <section.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter mb-2 leading-none">{section.name}</h3>
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 leading-tight tracking-tight uppercase">{section.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="bento-card bg-black text-white p-6 md:p-10 relative overflow-hidden">
                {/* Background Icon */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <UserIcon className="w-24 h-24 md:w-32 md:h-32" />
                </div>
                {/* Content */}
                <div className="relative z-10 max-w-md">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-4">Terminate Identity</h2>
                    <p className="text-white/40 font-bold uppercase tracking-wide mb-6 text-[10px] md:text-xs leading-relaxed">
                        Delete your profile and all associated data. This action is irreversible.
                    </p>
                    <button className="px-6 py-3 md:px-8 md:py-4 bg-red-500 text-white border-4 border-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-red-600 transition-all shadow-[4px_4px_0px_#fff] active:shadow-none active:translate-x-1 active:translate-y-1">
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
