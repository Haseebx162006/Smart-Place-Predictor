import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    const sections = [
        {
            title: "Network",
            links: [
                { name: "Global Map", href: "/dashboard" },
                { name: "Features", href: "/#features" },
                { name: "Protocol", href: "/#how-it-works" },
                { name: "Voices", href: "/#testimonials" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Protocol", href: "#" },
                { name: "Sentience Terms", href: "#" },
                { name: "Security Port", href: "#" }
            ]
        }
    ];

    return (
        <footer className="bg-white pt-32 pb-16 px-6 border-t-2 border-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand */}
                    <div className="lg:col-span-2 pr-12">
                        <Link to="/" className="flex items-center gap-3 mb-8 group inline-block">
                            <div className="w-10 h-10 bg-primary-DEFAULT flex items-center justify-center border-2 border-black hover:bg-black hover:text-primary-DEFAULT transition-colors">
                                <span className="text-white font-black text-xl hover:text-primary-DEFAULT">S</span>
                            </div>
                            <span className="text-4xl font-black tracking-tighter text-black uppercase">
                                Smart<span className="text-primary-DEFAULT">Place</span>
                            </span>
                        </Link>
                        <p className="text-xl text-black font-bold leading-tight max-w-md tracking-tighter uppercase">
                            Synchronizing internal sentiment with physical sanctuary coordinates.
                        </p>
                    </div>

                    {/* Nav */}
                    {sections.map(section => (
                        <div key={section.title}>
                            <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-8 border-b-2 border-black pb-2 inline-block">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map(link => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-sm font-bold text-slate-500 hover:text-primary-DEFAULT hover:underline transition-colors flex items-center gap-2 uppercase tracking-widest"
                                        >
                                            <ArrowUpRight className="w-3 h-3" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">
                        © 2026 SmartPlace Core. Immutable Archive.
                    </p>

                    <div className="flex gap-4">
                        {[Twitter, Instagram, Github].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-black">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
