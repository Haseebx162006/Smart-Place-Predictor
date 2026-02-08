import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "ALEX JOHNSON",
        role: "SYSTEM ARCHITECT",
        quote: "MoodSpot is the first protocol that successfully bridges internal sentiment with spatial metadata.",
        avatar: "AJ"
    },
    {
        name: "SARAH CHEN",
        role: "UX STRATEGIST",
        quote: "The interface is purely secondary to the feeling of trust. It's the most intuitive tool I've used.",
        avatar: "SC"
    },
    {
        name: "MARCUS MILLER",
        role: "DATA SCIENTIST",
        quote: "Analyzed the latency cycles myself. Sub-millisecond neural decoding that puts competitors to shame.",
        avatar: "MM"
    }
];



const SocialProof = () => {
    return (
        <section id="testimonials" className="py-16 bg-slate-50 border-b-2 border-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-12 border-b-4 border-black pb-8">
                    <div className="max-w-4xl">
                        <span className="text-xs font-bold text-black bg-white border-2 border-black px-3 py-1 uppercase tracking-[0.2em] mb-6 inline-block shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">Field Verification</span>
                        <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tighter leading-[0.85] uppercase">
                            Voices of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-DEFAULT to-primary-600">The New Reality.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-0 border-2 border-black bg-white">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.name}
                            className={`p-12 relative group hover:bg-black hover:text-white transition-colors duration-300 ${i !== testimonials.length - 1 ? 'border-b-2 md:border-b-0 md:border-r-2 border-black' : ''}`}
                        >
                            <Quote className="absolute top-12 right-12 w-20 h-20 text-black/5 group-hover:text-white/10" />

                            <div className="flex gap-1.5 mb-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-black text-black group-hover:fill-primary-DEFAULT group-hover:text-primary-DEFAULT transition-colors" />
                                ))}
                            </div>

                            <p className="text-2xl font-bold leading-tight mb-14 tracking-tighter uppercase">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center gap-6 border-t-2 border-black/10 pt-12 group-hover:border-white/20">
                                <div className="w-16 h-16 bg-primary-DEFAULT border-2 border-black group-hover:border-white flex items-center justify-center text-white font-bold text-2xl">
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-none mb-1 tracking-tight uppercase">{t.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 group-hover:text-slate-400 uppercase tracking-[0.2em]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Industry Strip */}

            </div>
        </section>
    );
};

export default SocialProof;
