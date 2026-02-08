import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.login(credentials);
            const { uid, email, idToken, name } = response.data;
            // Construct user object since backend returns flat structure
            const userObj = { uid, email, name: name || email?.split('@')[0] };
            login(userObj, idToken);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication sequence failed. Verify credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white font-sans text-black">
            {/* Left: Visual Context */}
            <div className="hidden lg:flex bg-slate-50 relative items-center justify-center p-20 overflow-hidden border-r-2 border-black">
                {/* Swiss Grid Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="swiss-grid-login" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#swiss-grid-login)" className="text-black" />
                    </svg>
                </div>

                <div className="relative z-10 text-left w-full max-w-lg border-l-4 border-black pl-12 py-8">
                    <h2 className="text-8xl font-bold text-black tracking-tighter leading-[0.85] mb-8 uppercase">
                        Return to Reality<br />
                    </h2>
                    <p className="text-xl text-black/60 font-bold uppercase tracking-widest leading-none border-t-2 border-black pt-6 inline-block">Accessing Central Interface</p>
                </div>
            </div>

            {/* Right: Auth Form */}
            <div className="flex items-center justify-center p-8 md:p-20 relative">
                <Link to="/" className="absolute top-12 left-12 p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="w-full max-w-[440px]">
                    <div className="mb-16 border-b-2 border-black pb-8">
                        <div className="w-16 h-16 bg-black border-2 border-black flex items-center justify-center mb-8 hover:bg-white hover:text-black transition-colors group">
                            <span className="text-white font-black text-3xl group-hover:text-black">SP</span>
                        </div>
                        <h1 className="text-6xl font-black text-black tracking-tighter uppercase mb-2 leading-none">Welcome Back</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Authenticate to continue discovery</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2 group">
                            <label className="text-xs font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary-DEFAULT"></span>
                                Secure Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-focus-within:text-primary-DEFAULT transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="your@sentience.id"
                                    className="w-full bg-white border-2 border-black py-4 pl-16 pr-8 text-lg font-bold text-black placeholder:text-slate-400 focus:outline-none focus:ring-0 focus:border-black focus:shadow-brutal transition-all"
                                    value={credentials.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-xs font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary-DEFAULT"></span>
                                Access Key
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-focus-within:text-primary-DEFAULT transition-colors" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••••••"
                                    className="w-full bg-white border-2 border-black py-4 pl-16 pr-8 text-lg font-bold text-black placeholder:text-slate-400 focus:outline-none focus:ring-0 focus:border-black focus:shadow-brutal transition-all"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border-2 border-red-500 flex items-start gap-4"
                            >
                                <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                                <p className="text-sm font-bold text-red-600 uppercase tracking-wide">{error}</p>
                            </motion.div>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-black text-white border-2 border-black py-5 font-black text-xl hover:bg-white hover:text-black transition-all shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 flex items-center justify-center gap-4 uppercase tracking-widest"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Access Interface
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t-2 border-black flex justify-between items-center">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Seeker?</p>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 text-black font-black text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4 decoration-primary-DEFAULT"
                        >
                            Initialize Account
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
