'use client';
import { useState } from 'react';
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-emerald-50/10 overflow-hidden p-6 font-sans">
            {/* Mesh Gradient Decor */}
            <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-amber-100/40 blur-[120px] pointer-events-none z-0" />
            
            <div className="glass-card z-10 w-full max-w-md rounded-[3rem] p-10 py-12">
                <div className="mb-10 text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[10px_10px_20px_#d1d9d4,-10px_-10px_20px_#ffffff] mb-6">
                        <Hotel className="text-emerald-700" size={28} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-emerald-950 leading-tight">Welcome to <span className="text-amber-600 italic">GrandStay</span></h1>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800/40 italic">Premium Hospitality Terminal</p>
                </div>

                {/* Role Toggle (3D Neumorphic) */}
                <div className="flex bg-emerald-50/50 p-1.5 rounded-2xl shadow-inner mb-8 border border-white">
                    <button onClick={() => quickAccess('admin')} className="flex-1 py-2 text-[10px] font-extrabold text-emerald-800/40 hover:text-emerald-700 transition-all uppercase tracking-widest">Admin</button>
                    <button onClick={() => quickAccess('receptionist')} className="flex-1 py-2 text-[10px] font-extrabold text-emerald-800/40 hover:text-emerald-700 transition-all uppercase tracking-widest border-x border-emerald-100">Reception</button>
                    <button onClick={() => quickAccess('guest')} className="flex-1 py-2 text-[10px] font-extrabold text-emerald-800/40 hover:text-emerald-700 transition-all uppercase tracking-widest">Guest</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30 ml-4">Identity Check</label>
                        <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-16 rounded-[1.8rem] border-2 border-white bg-white/50 pl-14 pr-4 text-sm font-bold text-emerald-900 placeholder:text-emerald-300 shadow-[inset_4px_4px_8px_#d1d9d4,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30 ml-4">Security Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-16 rounded-[1.8rem] border-2 border-white bg-white/50 pl-14 pr-4 text-sm font-bold text-emerald-900 placeholder:text-emerald-300 shadow-[inset_4px_4px_8px_#d1d9d4,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                placeholder="••••••••"
                                required
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
                        className="w-full h-16 rounded-[1.8rem] bg-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-[0_20px_40px_rgba(4,120,87,0.3)] hover:bg-emerald-800 hover:translate-y-[-2px] active:scale-95 transition-all flex items-center justify-center gap-4"
                    >
                        Secure Access <ArrowRight size={18} />
                    </button>

                    <div className="pt-6 text-center">
                        <Link href="/register" className="text-[10px] font-black uppercase tracking-widest text-emerald-800/40 hover:text-emerald-700 transition-colors">
                            First time here? <span className="text-emerald-600 underline underline-offset-4 ml-1">Sign up</span>
                        </Link>
                    </div>
                </form>

                <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>H-A Operational</span>
                </div>
            </div>
        </main>
    );
}











