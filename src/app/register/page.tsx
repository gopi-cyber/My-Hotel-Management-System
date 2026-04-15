'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/lib/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'receptionist' | 'guest'>('guest');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { error } = useSelector((state: RootState) => state.user || { error: null });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(registerUser({
            username,
            email,
            password,
            role,
            name: username.charAt(0).toUpperCase() + username.slice(1)
        }));
        if (registerUser.fulfilled.match(result)) {
            router.push('/login');
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 font-sans">
            <div className="glass-panel-3d z-10 w-full max-w-md p-10 py-16 border-white/10">
                <div className="mb-12 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 shadow-2xl shadow-amber-500/20 mb-8 transform hover:scale-110 transition-transform">
                        <UserPlus className="text-slate-950" size={32} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white leading-tight uppercase italic underline decoration-amber-500 decoration-4 underline-offset-8">
                        Create <span className="text-gradient underline-none">Identity</span>
                    </h1>
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Initialize Hospitality Sequence</p>
                </div>

                {/* Role Selection (3D Glass) */}
                <div className="mb-10 space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/60 ml-2 block">Access Level Definition</label>
                    <div className="flex bg-white/5 p-1 rounded-2xl shadow-inner border border-white/5">
                        <button 
                            type="button"
                            onClick={() => setRole('admin')} 
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${role === 'admin' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >Admin</button>
                        <button 
                            type="button"
                            onClick={() => setRole('receptionist')} 
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl border-x border-white/5 ${role === 'receptionist' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >Staff</button>
                        <button 
                            type="button"
                            onClick={() => setRole('guest')} 
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${role === 'guest' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >Guest</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/60 ml-2">Designation</label>
                        <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-400 transition-colors" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-16 rounded-2xl border border-white/5 bg-white/5 pl-14 pr-4 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all shadow-inner"
                                placeholder="USER_NAME"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/60 ml-2">Communication Link</label>
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-400 transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-16 rounded-2xl border border-white/5 bg-white/5 pl-14 pr-4 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all shadow-inner"
                                placeholder="EMAIL_ADDRESS"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/60 ml-2">Authorization Secret</label>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-400 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-16 rounded-2xl border border-white/5 bg-white/5 pl-14 pr-4 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all shadow-inner"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 text-[10px] font-black text-red-400 rounded-2xl border border-red-500/20 text-center uppercase tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full h-16 rounded-2xl bg-amber-500 text-xs font-black uppercase tracking-[0.3em] text-slate-950 shadow-2xl shadow-amber-500/30 hover:bg-amber-400 hover:translate-y-[-4px] active:scale-95 transition-all flex items-center justify-center gap-4"
                    >
                        Execute Creation <ArrowRight size={18} />
                    </button>

                    <div className="pt-8 text-center">
                        <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-amber-400 transition-colors">
                            Already encoded? <span className="text-amber-500 underline underline-offset-4 ml-1 italic">Login Access</span>
                        </Link>
                    </div>
                </form>

                <div className="mt-16 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                    <ShieldCheck size={16} className="text-amber-500/40" />
                    <span>Identity Encryption Active</span>
                </div>
            </div>
        </main>
    );
}
