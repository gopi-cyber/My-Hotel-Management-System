'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/lib/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Hotel, User, Lock, Mail, ArrowRight, ShieldPlus, ShieldCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'receptionist' | 'guest'>('guest');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { error } = useSelector((state: RootState) => (state as any).user || { error: null });

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
            router.push('/');
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 overflow-hidden p-6 font-sans">
            {/* Mesh decor */}
            <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-100/40 blur-[120px] pointer-events-none z-0" />

            <div className="glass-card z-10 w-full max-w-md rounded-[2.5rem] p-10 py-12">
                <style jsx>{`
                    .glass-card {
                        background: rgba(255, 255, 255, 0.4);
                        backdrop-filter: blur(16px);
                        border: 1px solid rgba(255, 255, 255, 0.8);
                        box-shadow: 20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff;
                    }
                `}</style>
                <div className="mb-10 text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] mb-6">
                        <UserPlus className="text-indigo-600" size={28} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Create Identity</h1>
                    <p className="mt-2 text-sm font-medium text-slate-500 italic">Initialize your GrandStay Hospitality Profile</p>
                </div>

                {/* Role Selection (3D Neumorphic) */}
                <div className="mb-8 space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1 text-left block">Select Access Level</label>
                    <div className="flex bg-slate-100/50 p-1.5 rounded-2xl shadow-inner">
                        <button 
                            type="button"
                            onClick={() => setRole('admin')} 
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${role === 'admin' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
                        >Admin</button>
                        <button 
                            type="button"
                            onClick={() => setRole('receptionist')} 
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl border-x border-slate-200 ${role === 'receptionist' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
                        >Staff</button>
                        <button 
                            type="button"
                            onClick={() => setRole('guest')} 
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${role === 'guest' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
                        >Guest</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Legal Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/50 pl-12 pr-4 text-sm font-semibold text-slate-800 placeholder:text-slate-300 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:border-indigo-100 transition-all"
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Secure Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/50 pl-12 pr-4 text-sm font-semibold text-slate-800 placeholder:text-slate-300 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:border-indigo-100 transition-all"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Encrypted Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/50 pl-12 pr-4 text-sm font-semibold text-slate-800 placeholder:text-slate-300 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:border-indigo-100 transition-all"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-[10px] font-bold text-red-500 rounded-2xl border border-red-100 text-center uppercase tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full h-14 rounded-2xl bg-indigo-600 text-sm font-bold text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center gap-3"
                    >
                        Initialize Profile <ArrowRight size={18} />
                    </button>

                    <div className="pt-6 text-center">
                        <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
                            Already have an identity? <span className="text-indigo-500 underline underline-offset-4 ml-1">Secure Sign In</span>
                        </Link>
                    </div>
                </form>

                <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Privacy Policy Compliant</span>
                </div>
            </div>
        </main>
    );
}
