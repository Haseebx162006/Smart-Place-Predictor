import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section className="py-8 bg-white border-b-2 border-black relative overflow-hidden">
            {/* Decorative giant type */}
            <div className="absolute top-0 left-0 text-[15vw] font-bold text-black/5 select-none leading-none -translate-y-1/3 translate-x-10 pointer-events-none">
                START
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tighter uppercase mb-6">
                    Initialize <br /> Protocol
                </h2>

                <p className="text-xl font-bold text-black/60 mb-8 max-w-2xl mx-auto">
                    Stop guessing your trajectory. Let the algorithm define your path.
                </p>

                <div className="flex justify-center">
                    <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                        <button className="bg-black text-white text-2xl font-bold px-16 py-8 uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black hover:border-black transition-all shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-4">
                            {isAuthenticated ? "Enter Dashboard" : "Start Now"}
                            <ArrowRight className="w-8 h-8" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
