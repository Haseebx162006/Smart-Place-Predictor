import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import SocialProof from '../components/landing/SocialProof';
import HowItWorks from '../components/landing/HowItWorks';
import CTA from '../components/landing/CTA';
import Footer from '../components/layout/Footer';

const Landing = () => {
    return (
        <div className="min-h-screen selection:bg-indigo-600 selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <SocialProof />
                <HowItWorks />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
