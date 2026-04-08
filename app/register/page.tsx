'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/lib/features/userSlice';
import { AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Hotel, User, Lock, Mail, ArrowRight, ShieldPlus, ShieldCheck } from 'lucide-react';
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
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#050505] dotted-circle-bg overflow-hidden p-6">
            <div className="circular-glow top-[-10%] left-[-10%]" />
            <div className="circular-glow bottom-[-10%] right-[-10%]" />

            <div className="z-10 w-full max-w-sm">
                <div className="mb-10 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 mb-4">
                        <ShieldPlus className="text-blue-500" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Join GrandStay</h1>
                    <p className="mt-2 text-sm text-zinc-500">Create your digital identity for secure access.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Full Identity</label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-900/50 pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Neural Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-900/50 pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                placeholder="Email Address"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Passkey</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-900/50 pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 h-12 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all active:scale-[0.98]"
                    >
                        Register Identity <ArrowRight size={16} />
                    </button>

                    <div className="pt-4 text-center">
                        <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
                            Already have an account? <span className="text-blue-500 ml-1">Access Gateway</span>
                        </Link>
                    </div>
                </form>

                <div className="mt-20 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
                    <ShieldCheck size={12} />
                    <span>Neural Authentication Active</span>
                </div>
            </div>
        </main>
    );
}
