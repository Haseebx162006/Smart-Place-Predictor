import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Map } from 'lucide-react';

const steps = [
    {
        num: "01",
        icon: Camera,
        title: "Biometric Capture",
        desc: "A single sentient frame captures over 3000 identity vectors across your bio-structure.",
        tag: "Stable"
    },
    {
        num: "02",
        icon: Cpu,
        title: "Neural Decoding",
        desc: "Proprietary AI filters through mood metadata to verify your subjective energy resonance.",
        tag: "Active"
    },
    {
        num: "03",
        icon: Map,
        title: "Spatial Linking",
        desc: "Synchronizing verified emotional states with curated physical coordinates in real-time.",
        tag: "Verified"
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-32 bg-black text-white relative overflow-hidden border-b-2 border-black">
            {/* Swiss Grid Background Inverted */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <pattern id="swiss-grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#swiss-grid-dark)" className="text-white" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-32 border-l-4 border-primary-DEFAULT pl-12">
                    <span className="text-xs font-bold text-primary-DEFAULT uppercase tracking-[0.4em] mb-4 block">Active Life-Cycle</span>
                    <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8] mb-0 uppercase">
                        The <span className="text-primary-DEFAULT">Trajectory</span> <br /> of a Request.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-0 border-2 border-white">
                    {steps.map((step, i) => (
                        <div
                            key={step.num}
                            className={`p-12 group hover:bg-white hover:text-black transition-colors duration-300 ${i !== steps.length - 1 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-white' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-24">
                                <span className="text-6xl font-bold text-white/20 group-hover:text-black/10 transition-colors">{step.num}</span>
                                <div className="px-4 py-1 border border-white/30 rounded-none text-[10px] font-bold uppercase tracking-widest group-hover:border-black/30 group-hover:bg-primary-DEFAULT group-hover:text-white transition-all">
                                    {step.tag}
                                </div>
                            </div>

                            <step.icon className="w-20 h-20 text-primary-DEFAULT mb-12" />

                            <h3 className="text-4xl font-bold uppercase mb-6 tracking-tighter leading-none">{step.title}</h3>
                            <p className="text-xl font-medium text-white/60 group-hover:text-black/70 leading-tight">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
