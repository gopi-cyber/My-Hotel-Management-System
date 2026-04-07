'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/lib/features/userSlice';
import { AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Hotel, User, Lock, Mail, ArrowRight, ShieldPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(registerUser({ 
            username, 
            email, 
            password, 
            role: 'Guest', 
            name: username.charAt(0).toUpperCase() + username.slice(1) 
        }));
        if (registerUser.fulfilled.match(result)) {
            router.push('/dashboard');
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white selection:bg-blue-500/30">
            <div className="w-full max-w-md rounded-[2.5rem] border border-white/10 bg-slate-900/50 p-12 shadow-2xl backdrop-blur-3xl transition-all hover:border-white/20">
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl shadow-blue-500/20">
                        <ShieldPlus size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">GateKeeper</h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Security Enrollment • GrandStay HMS</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Full Identity</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-6 text-sm font-medium outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 placeholder:text-slate-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Neural Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email@domain.com"
                                className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-6 text-sm font-medium outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 placeholder:text-slate-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Passkey Verification</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-6 text-sm font-medium outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 placeholder:text-slate-700"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4.5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-95"
                    >
                        Create Identity <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="text-center">
                        <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                            Already enrolled? <span className="text-blue-500 italic">Access GateKeeper</span>
                        </Link>
                    </div>
                </form>

                <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-800">
                    <Hotel size={12} />
                    <span>Neural Network v1.0.4 - Secure Path</span>
                </div>
            </div>
        </main>
    );
}
