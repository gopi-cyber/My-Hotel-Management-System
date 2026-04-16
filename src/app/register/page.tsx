'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/lib/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, ArrowRight, ShieldCheck, UserPlus, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
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
    hidden: { y: 30, opacity: 0, scale: 0.8, rotateX: -20 },
    show: { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotateX: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    }
};

const letterVariants: Variants = {
    hidden: { y: 50, opacity: 0, rotateY: -90 },
    show: {
        y: 0, opacity: 1, rotateY: 0,
        transition: { type: "spring", damping: 10, stiffness: 200 }
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

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);
    
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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };
    
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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

    const titleText = "Initialize";

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 font-sans bg-slate-50 perspective-[2000px]">
            <ParticleBackground />
            
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full pointer-events-none ${p.isAmber ? 'bg-amber-500' : 'bg-cyan-500'}`}
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

            <div className="vortex-container" />
            <div className="honeycomb-mesh" />
            
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-1/4 h-[700px] w-[700px] bg-amber-500/20 blur-[150px] rounded-[40%] pointer-events-none" 
            />
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-1/4 h-[600px] w-[600px] bg-cyan-600/10 blur-[150px] rounded-[40%] pointer-events-none" 
            />

            <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.5, y: -300, rotateX: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.1 }}
                className="bg-white/80 backdrop-blur-3xl z-10 w-full max-w-lg p-10 py-12 border-2 border-white/40 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative group overflow-hidden"
            >
                <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
                    
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 relative flex justify-center mb-8 h-0">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-6 h-32 w-32 rounded-full border-2 border-dashed border-amber-500/30"
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute -top-2 h-24 w-24 rounded-full border border-amber-500/50"
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.6)]"
                        >
                            <UserPlus className="text-white drop-shadow-md" size={36} />
                        </motion.div>
                    </div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="pt-20">
                        <motion.div className="mb-8 text-center flex flex-col items-center">
                            <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight flex gap-[2px] uppercase">
                                {titleText.split('').map((char, i) => (
                                    <motion.span key={i} variants={letterVariants} className="inline-block">{char}</motion.span>
                                ))}
                            </h1>
                            <motion.p variants={itemVariants} className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-2 rounded-full inline-flex gap-2 items-center">
                                <motion.span animate={{ opacity:[1,0.2,1] }} transition={{repeat:Infinity, duration:1.5}} className="h-2 w-2 border border-amber-500 rounded-sm" /> 
                                Premium Node Creation
                            </motion.p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6 space-y-3">
                            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-inner relative overflow-hidden h-14">
                                {['admin', 'receptionist', 'guest'].map((r) => (
                                    <motion.button 
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r as 'admin' | 'receptionist' | 'guest')} 
                                        whileHover={{ scale: 1.05, zIndex: 10, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex-1 text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-xl mx-0.5 z-10 relative group ${role === r ? 'bg-white text-amber-600 shadow-lg border border-slate-100 scale-105' : 'text-slate-400 hover:text-slate-900'}`}
                                    >
                                        {role === r && (
                                            <motion.div layoutId="activePill" className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-100 -z-10" />
                                        )}
                                        {r === 'receptionist' ? 'Staff' : r}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <motion.div variants={itemVariants} className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-inner bg-slate-50 border border-slate-200">
                                    <motion.div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10" whileHover={{ scale: 1.2 }}>
                                        <User className="text-slate-300 group-focus-within:text-amber-500 group-focus-within:drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300" size={18} />
                                    </motion.div>
                                    <motion.input
                                        whileFocus={{ x: 5, backgroundColor: "#fff" }}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="relative w-full h-14 bg-transparent pl-16 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                                        placeholder="Full Name"
                                        required
                                    />
                                    <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" style={{ width: '100%' }} />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-inner bg-slate-50 border border-slate-200">
                                    <motion.div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10" whileHover={{ scale: 1.2 }}>
                                        <Mail className="text-slate-300 group-focus-within:text-amber-500 group-focus-within:drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300" size={18} />
                                    </motion.div>
                                    <motion.input
                                        whileFocus={{ x: 5, backgroundColor: "#fff" }}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="relative w-full h-14 bg-transparent pl-16 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                                        placeholder="Email Address"
                                        required
                                    />
                                    <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" style={{ width: '100%' }} />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-inner bg-slate-50 border border-slate-200">
                                    <motion.div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10" whileHover={{ scale: 1.2 }}>
                                        <Lock className="text-slate-300 group-focus-within:text-amber-500 group-focus-within:drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300" size={18} />
                                    </motion.div>
                                    <motion.input
                                        whileFocus={{ x: 5, backgroundColor: "#fff" }}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative w-full h-14 bg-transparent pl-16 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                                        placeholder="Secure Password"
                                        required
                                        minLength={6}
                                    />
                                    <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" style={{ width: '100%' }} />
                                </div>
                            </motion.div>

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5, rotateX: 90 }} 
                                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                    transition={{ type: "spring", bounce: 0.6 }}
                                    className="p-3 bg-red-500/10 text-[9px] font-black text-red-500 rounded-2xl border-2 border-red-500/30 text-center uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div variants={itemVariants} className="pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={isAuthenticating}
                                    className={`relative w-full h-[65px] rounded-2xl bg-amber-500 text-[10px] font-black uppercase tracking-[0.3em] text-white overflow-hidden shadow-[0_20px_50px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-4 group ${isAuthenticating ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    <div className="relative z-10 flex items-center gap-4">
                                        {isAuthenticating ? (
                                            <span className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>Create Profile <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={18} className="drop-shadow-lg" /></motion.div></>
                                        )}
                                    </div>
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity z-0"
                                    />
                                </motion.button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-4 text-center">
                                <Link href="/login" className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 group flex items-center justify-center gap-3">
                                    <motion.span whileHover={{ scale: 1.05, color: "#1e293b" }} className="transition-colors">Already have a Node?</motion.span>
                                    <motion.span 
                                        whileHover={{ scale: 1.05 }} 
                                        className="text-amber-500 underline underline-offset-4 decoration-amber-500/30 group-hover:decoration-amber-500 transition-all font-black"
                                    >
                                        Access Hub
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </form>

                        <motion.div 
                            variants={itemVariants}
                            className="mt-8 flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300"
                        >
                            <Fingerprint size={14} className="text-amber-500/50" />
                            <ShieldCheck size={14} className="text-amber-500" />
                            <span className="opacity-70">Identity Encryption Matrix</span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
