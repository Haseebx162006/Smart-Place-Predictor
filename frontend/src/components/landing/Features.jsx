import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MapPin, Shield, Zap, Heart, MessageSquare } from 'lucide-react';

const Features = () => {
    return (
        <section id="features" className="py-0 bg-white border-b-2 border-black">
            <div className="container mx-auto px-6 py-24">
                <div className="mb-20 border-l-4 border-black pl-8">
                    <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tighter uppercase leading-[0.9] mb-6">
                        System <span className="text-primary-DEFAULT">Manifest</span>
                    </h2>
                    <p className="text-xl font-medium text-slate-600 max-w-xl">
                        Core biometric functionality designed for rapid emotional processing and spatial allocation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-black">
                    {/* Feature 1 */}
                    <div className="p-12 border-b-2 md:border-r-2 border-black hover:bg-black hover:text-white group transition-colors duration-300">
                        <Brain className="w-12 h-12 mb-8 text-primary-DEFAULT" />
                        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter">Neural Sync</h3>
                        <p className="text-slate-500 group-hover:text-slate-400 font-medium">Bridges cognitive patterns with digital interfaces instantly.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-12 border-b-2 lg:border-r-2 border-black hover:bg-transparent group transition-colors duration-300">
                        <MapPin className="w-12 h-12 mb-8 text-black group-hover:scale-110 transition-transform" />
                        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter group-hover:font-black group-hover:text-black transition-all">Geo-Locate</h3>
                        <p className="text-slate-500 group-hover:text-black font-medium">Precise sanctuary coordinates based on mood vectoring.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-12 border-b-2 border-black hover:bg-black hover:text-white group transition-colors duration-300">
                        <Shield className="w-12 h-12 mb-8 text-primary-DEFAULT" />
                        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter">Private Core</h3>
                        <p className="text-slate-500 group-hover:text-slate-400 font-medium">Zero-knowledge proofs ensure your emotions stay yours.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="p-12 border-b-2 md:border-b-0 md:border-r-2 border-black hover:bg-transparent group transition-colors duration-300">
                        <Zap className="w-12 h-12 mb-8 text-black group-hover:scale-110 transition-transform" />
                        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter group-hover:font-black group-hover:text-black transition-all">Real-Time</h3>
                        <p className="text-slate-500 group-hover:text-black font-medium">Sub-millisecond latency for immediate feedback loops.</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="p-12 border-b-2 md:border-b-0 lg:border-r-2 border-black hover:bg-black hover:text-white group transition-colors duration-300">
                        <Heart className="w-12 h-12 mb-8 text-primary-DEFAULT" />
                        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter">Bio-Rhythm</h3>
                        <p className="text-slate-500 group-hover:text-slate-400 font-medium">Adapts to your circadian cycles for better suggestions.</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="p-12 hover:bg-transparent group transition-colors duration-300">
                        <MessageSquare className="w-12 h-12 mb-8 text-black group-hover:scale-110 transition-transform" />
                        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter group-hover:font-black group-hover:text-black transition-all">Social Signal</h3>
                        <p className="text-slate-500 group-hover:text-black font-medium">Connect with others on your exact wavelength.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
