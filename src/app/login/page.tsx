'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/lib/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Hotel, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { error } = useSelector((state: RootState) => state.user || { error: null });
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        // Prefetching dashboard routes for faster transitions
        router.prefetch('/admin');
        router.prefetch('/receptionist');
        router.prefetch('/dashboard');
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthenticating(true);
        const result = await dispatch(loginUser({ username, password }));
        if (loginUser.fulfilled.match(result)) {
            const loggedInUser = result.payload;
            if (loggedInUser.role === 'admin') {
                router.push('/admin');
            } else if (loggedInUser.role === 'receptionist' || loggedInUser.role === 'staff') {
                router.push('/receptionist');
            } else {
                router.push('/dashboard');
            }
        } else {
            setIsAuthenticating(false);
        }
    };

    const quickAccess = (role: string) => {
        if (role === 'admin') {
            setUsername('admin');
            setPassword('123');
        } else if (role === 'receptionist') {
            setUsername('staff');
            setPassword('123');
        } else if (role === 'guest') {
            setUsername('new_guest');
            setPassword('123');
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 font-sans">
            <div className="glass-panel-3d z-10 w-full max-w-md p-10 py-16 border-white/10">
                <div className="mb-12 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 shadow-2xl shadow-amber-500/20 mb-8 transform hover:scale-110 transition-transform">
                        <Hotel className="text-slate-950" size={32} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white leading-tight uppercase italic underline decoration-amber-500 decoration-4 underline-offset-8">
                        Terminal <span className="text-gradient underline-none">Access</span>
                    </h1>
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Premium Hospitality Network 3.0</p>
                </div>

                {/* Role Toggle (3D Glass) */}
                <div className="flex bg-white/5 p-1 rounded-2xl shadow-inner mb-10 border border-white/5">
                    <button onClick={() => quickAccess('admin')} className="flex-1 py-3 text-[10px] font-black text-white/40 hover:text-amber-400 transition-all uppercase tracking-widest hover:bg-white/5 rounded-xl">Admin</button>
                    <button onClick={() => quickAccess('receptionist')} className="flex-1 py-3 text-[10px] font-black text-white/40 hover:text-amber-400 transition-all uppercase tracking-widest hover:bg-white/5 rounded-xl">Staff</button>
                    <button onClick={() => quickAccess('guest')} className="flex-1 py-3 text-[10px] font-black text-white/40 hover:text-amber-400 transition-all uppercase tracking-widest hover:bg-white/5 rounded-xl">Guest</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/60 ml-2">Identity Authentication</label>
                        <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-400 transition-colors" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-16 rounded-2xl border border-white/5 bg-white/5 pl-14 pr-4 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all shadow-inner"
                                placeholder="ACCESS_ID"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/60 ml-2">Security Override</label>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-400 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-16 rounded-2xl border border-white/5 bg-white/5 pl-14 pr-4 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all shadow-inner"
                                placeholder="••••••••"
                                required
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
                        disabled={isAuthenticating}
                        className={`w-full h-16 rounded-2xl bg-amber-500 text-xs font-black uppercase tracking-[0.3em] text-slate-950 shadow-2xl shadow-amber-500/30 hover:bg-amber-400 hover:translate-y-[-4px] active:scale-95 transition-all flex items-center justify-center gap-4 ${isAuthenticating ? 'opacity-70 cursor-not-allowed grayscale' : ''}`}
                    >
                        {isAuthenticating ? (
                            <>
                                <span className="h-5 w-5 border-4 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                Initializing...
                            </>
                        ) : (
                            <>
                                Initialize Link <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <div className="pt-8 text-center">
                        <Link href="/register" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-amber-400 transition-colors">
                            First sequence? <span className="text-amber-500 underline underline-offset-4 ml-1">Create Identity</span>
                        </Link>
                    </div>
                </form>

                <div className="mt-16 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                    <ShieldCheck size={16} className="text-amber-500/40" />
                    <span>Secure Host Layer</span>
                </div>
            </div>
        </main>
    );
}











