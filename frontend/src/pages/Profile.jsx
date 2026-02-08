import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Shield, Bell, AppWindow } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    const sections = [
        { name: 'Security Protocol', icon: Shield, desc: 'Manage access keys and biometric privacy.' },
        { name: 'Network Alerts', icon: Bell, desc: 'Configure sentient response notifications.' },
        { name: 'Studio Prefs', icon: AppWindow, desc: 'Customize your discovery interface.' },
    ];

    return (
        <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-32 h-32 rounded-[3.5rem] bg-indigo-600 flex items-center justify-center text-white text-5xl font-black italic shadow-2xl shadow-indigo-600/30">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-center md:text-left">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-4 block">Biological ID</span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none italic uppercase mb-2">{user?.name}</h1>
                    <p className="text-xl text-slate-400 font-bold tracking-tighter uppercase italic">{user?.email}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {sections.map((section, i) => (
                    <motion.div
                        key={section.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-premium hover:shadow-2xl transition-all group"
                    >
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                            <section.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">{section.name}</h3>
                        <p className="text-sm font-bold text-slate-400 leading-tight tracking-tighter italic uppercase">{section.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <UserIcon className="w-40 h-40" />
                </div>
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-6">Terminate Identity</h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest mb-10 text-sm leading-tight">Delete your profile and all associated sentient metadata from the SmartPlace core. This action is immutable.</p>
                    <button className="px-10 py-5 bg-rose-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-rose-700 transition-all active:scale-95">
                        Destroy Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
