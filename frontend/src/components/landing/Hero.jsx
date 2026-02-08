import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Shield, Heart } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-50 border-b-2 border-black">
            {/* Swiss Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <pattern id="swiss-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#swiss-grid)" className="text-slate-300" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-left mb-24 max-w-6xl mx-auto border-l-4 border-primary-DEFAULT pl-12 py-4">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <div className="inline-flex items-center gap-3 bg-black text-white px-4 py-2 mb-8 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors cursor-default">
                            <span className="text-xs font-bold uppercase tracking-widest">The Discovery Protocol</span>
                        </div>

                        <h1 className="text-8xl md:text-[10rem] font-bold text-black tracking-tighter leading-[0.8] mb-12 uppercase">
                            Explore <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-DEFAULT to-primary-600 stroke-black stroke-2" style={{ WebkitTextStroke: '2px black' }}>Reality.</span>
                        </h1>

                        <p className="text-2xl text-slate-600 font-medium max-w-2xl mb-16 leading-relaxed border-t-2 border-black pt-8">
                            Synchronizing internal energy with spatial sanctuary coordinates. Precision emotion scanning for physical world navigation.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start justify-start gap-0">
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    className="bg-black text-white px-12 py-6 font-bold text-2xl border-2 border-black hover:bg-white hover:text-black transition-all flex items-center gap-4 uppercase tracking-tighter shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                >
                                    Join Network
                                    <ArrowRight className="w-8 h-8" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Swiss Bento Visual Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black bg-white">
                    {/* Card 1 */}
                    <div className="p-12 border-b-2 md:border-b-0 md:border-r-2 border-black relative group hover:bg-black hover:text-white transition-colors">
                        <div className="flex justify-between items-start mb-20">
                            <Zap className="w-12 h-12 text-black group-hover:text-white" />
                            <span className="text-4xl font-bold text-black/10 group-hover:text-white/20 transition-colors">01</span>
                        </div>
                        <h3 className="text-4xl font-bold uppercase mb-4 leading-none tracking-tighter">Emotion<br />Decoded</h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-400">98.4% Accuracy</p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-12 border-b-2 md:border-b-0 md:border-r-2 border-black relative group hover:bg-black hover:text-white transition-colors">
                        <div className="flex justify-between items-start mb-20">
                            <Shield className="w-12 h-12 text-black group-hover:text-white" />
                            <span className="text-4xl font-bold text-black/10 group-hover:text-white/20 transition-colors">02</span>
                        </div>
                        <h3 className="text-4xl font-bold uppercase mb-4 leading-none tracking-tighter">Quantum<br />Shield</h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-400">Encrypted Signals</p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-12 relative group hover:bg-black hover:text-white transition-colors">
                        <div className="flex justify-between items-start mb-20">
                            <Heart className="w-12 h-12 text-black group-hover:text-white" />
                            <span className="text-4xl font-bold text-black/10 group-hover:text-white/20 transition-colors">03</span>
                        </div>
                        <h3 className="text-4xl font-bold uppercase mb-4 leading-none tracking-tighter">Empathy<br />First</h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-400">Human Resonant</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
