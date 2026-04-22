'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/lib/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, Variants } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
        y: 0, 
        opacity: 1, 
        transition: { type: "spring", stiffness: 300, damping: 20 }
    }
};

interface ParticleData {
    id: number;
    size: number;
    isAmber: boolean;
    left: string;
    top: string;
    baseOpacity: number;
    yArray: number[];
    xArray: number[];
    duration: number;
    delay: number;
}

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'receptionist' | 'guest'>('guest');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { error } = useSelector((state: RootState) => state.user || { error: null });
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    
    const [particles, setParticles] = useState<ParticleData[]>([]);

    useEffect(() => {
        const tm = setTimeout(() => {
            setParticles(Array.from({ length: 30 }).map((_, i) => ({
                id: i,
                size: Math.random() * 8 + 2,
                isAmber: Math.random() > 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                baseOpacity: Math.random() * 0.6,
                yArray: [0, -Math.random() * 300 - 100],
                xArray: [0, (Math.random() * 200) - 100],
                duration: Math.random() * 8 + 4,
                delay: Math.random() * 5
            })));
        }, 0);
        return () => clearTimeout(tm);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthenticating(true);
        const result = await dispatch(registerUser({
            username,
            email,
            password,
            role,
            name: username.charAt(0).toUpperCase() + username.slice(1)
        }));
        if (registerUser.fulfilled.match(result)) {
            router.push('/login');
        } else {
            setIsAuthenticating(false);
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 font-sans bg-slate-50">
            <ParticleBackground />
            
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full pointer-events-none ${p.isAmber ? 'bg-amber-500' : 'bg-indigo-500'}`}
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                        opacity: p.baseOpacity
                    }}
                    animate={{
                        y: p.yArray,
                        x: p.xArray,
                        opacity: [p.baseOpacity, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: p.delay
                    }}
                />
            ))}

            <div className="absolute inset-0 z-[-10] pointer-events-none overflow-hidden">
                <div className="vortex-container opacity-50" />
                <div className="honeycomb-mesh opacity-30" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-3xl z-[100] w-full max-w-lg p-10 py-12 border-2 border-white/60 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative"
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 relative flex justify-center mb-8 h-0">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.6)]"
                    >
                        <UserPlus className="text-white drop-shadow-md" size={36} />
                    </motion.div>
                </div>

                <div className="pt-20">
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <div className="mb-8 text-center flex flex-col items-center">
                            <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight uppercase">
                                Register
                            </h1>
                            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-2 rounded-full inline-flex gap-2 items-center">
                                Create Your New Account
                            </p>
                        </div>

                        <div className="mb-6 space-y-3">
                            <div className="flex bg-white p-1.5 rounded-2xl border-2 border-slate-200 shadow-inner relative overflow-hidden h-16 z-[110]">
                                {['admin', 'receptionist', 'guest'].map((r) => (
                                    <button 
                                        key={r}
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setRole(r as 'admin' | 'receptionist' | 'guest');
                                        }} 
                                        className={`flex-1 text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-xl mx-0.5 z-10 relative cursor-pointer ${
                                            role === r 
                                            ? 'bg-amber-500 text-white shadow-lg border border-amber-600' 
                                            : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                    >
                                        {r === 'receptionist' ? 'Staff' : r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-inner bg-slate-50 border border-slate-200">
                                    <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10">
                                        <User className="text-slate-300 group-focus-within:text-amber-500 transition-all duration-300" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="relative w-full h-14 bg-transparent pl-16 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-inner bg-slate-50 border border-slate-200">
                                    <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10">
                                        <Mail className="text-slate-300 group-focus-within:text-amber-500 transition-all duration-300" size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="relative w-full h-14 bg-transparent pl-16 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-inner bg-slate-50 border border-slate-200">
                                    <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10">
                                        <Lock className="text-slate-300 group-focus-within:text-amber-500 transition-all duration-300" size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative w-full h-14 bg-transparent pl-16 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                                        placeholder="Password"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 text-[9px] font-black text-red-500 rounded-2xl border-2 border-red-500/30 text-center uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                    {error}
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isAuthenticating}
                                    className={`relative w-full h-[65px] rounded-2xl bg-amber-500 text-[10px] font-black uppercase tracking-[0.3em] text-white overflow-hidden shadow-[0_20px_50px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-4 group ${isAuthenticating ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    <div className="relative z-10 flex items-center gap-4">
                                        {isAuthenticating ? (
                                            <span className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>Sign Up <ArrowRight size={18} className="drop-shadow-lg" /></>
                                        )}
                                    </div>
                                </button>
                            </div>

                            <div className="pt-4 text-center">
                                <Link href="/login" className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 group flex items-center justify-center gap-3">
                                    <span>Already have an account?</span>
                                    <span className="text-amber-500 underline underline-offset-4 decoration-amber-500/30 group-hover:decoration-amber-500 transition-all font-black">
                                        Log In
                                    </span>
                                </Link>
                            </div>
                        </form>

                        <div className="mt-8 flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                            <ShieldCheck size={14} className="text-amber-500" />
                            <span className="opacity-70">Secure Registration</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
