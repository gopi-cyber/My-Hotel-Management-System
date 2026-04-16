'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Hotel, User, Menu, X, ShieldCheck, LogIn, BellRing } from 'lucide-react';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { logout } from '@/lib/features/userSlice';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    // Filtered NAV_ITEMS based on user role
    const getNavItems = () => {
        if (!isAuthenticated) return [];
        
        const items = [
            { name: 'Console', href: '/dashboard', icon: Hotel },
            { name: 'Profile', href: '/profile', icon: User },
        ];

        if (user?.role === 'admin') {
            items.push({ name: 'Nexus', href: '/admin', icon: ShieldCheck });
        }
        
        if (user?.role === 'receptionist' || user?.role === 'admin') {
            items.push({ name: 'Telemetry', href: '/receptionist', icon: BellRing });
        }

        return items;
    };

    const navItems = getNavItems();

    return (
        <nav className="fixed top-0 z-50 w-full bg-slate-950/40 backdrop-blur-3xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
                {/* Logo Section */}
                <Link href={isAuthenticated ? "/dashboard" : "/"} className="group flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                        <Hotel size={26} className="stroke-[2.5px]" />
                    </div>
                    <div className="font-black tracking-tighter uppercase italic leading-none flex flex-col">
                        <span className="text-2xl text-white">Vortex</span>
                        <span className="text-amber-500 text-[10px] tracking-[0.5em] mt-1">Hospitality</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden items-center gap-12 md:flex">
                    <div className="flex gap-10 font-bold">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.href}
                                    className={`relative flex items-center gap-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] italic transition-all hover:text-amber-500 ${
                                        isActive ? 'text-amber-500' : 'text-white/40'
                                    }`}
                                >
                                    <Icon size={18} className={isActive ? 'text-amber-500' : 'text-white/10'} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <span className="absolute -bottom-4 left-0 h-1 w-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)] rounded-full animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-8 pl-8 border-l border-white/5">
                            <div className="flex items-center gap-4 bg-slate-950/60 border border-white/5 px-4 py-2 rounded-2xl shadow-2xl group cursor-pointer hover:border-amber-500/30 transition-all">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-amber-500 font-black uppercase text-sm group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                                    {user?.username?.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{user?.username}</span>
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] italic">{user?.role}</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-red-500 transition-all italic"
                            >
                                [ Terminate ]
                            </button>
                        </div>
                    ) : (
                        <Link 
                            href="/login"
                            className="flex items-center gap-3 rounded-[1.5rem] bg-amber-500 px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] shadow-2xl active:scale-95"
                        >
                            <LogIn size={20} />
                            <span>System Auth</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 border border-white/5 text-white/40 md:hidden hover:text-amber-500 transition-all shadow-2xl active:scale-95"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="absolute left-0 top-full w-full bg-slate-950/95 border-b border-white/5 p-8 md:hidden backdrop-blur-3xl animate-in slide-in-from-top duration-500">
                    <div className="flex flex-col gap-6">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-6 text-xl font-black uppercase tracking-[0.2em] italic text-white/40 hover:text-amber-500 p-5 rounded-[2rem] border-2 border-transparent hover:border-white/5 hover:bg-slate-900 transition-all"
                            >
                                <item.icon size={26} className="text-white/10" />
                                {item.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                             <button 
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="mt-6 flex items-center justify-center gap-4 rounded-[2rem] bg-slate-900 border-2 border-white/5 py-6 text-xs font-black uppercase tracking-[0.5em] text-red-500 shadow-2xl active:scale-95 transition-all"
                            >
                                 [ Terminate Session ]
                             </button>
                        ) : (
                            <Link 
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-6 flex items-center justify-center gap-4 rounded-[2rem] bg-amber-500 py-6 text-xs font-black uppercase tracking-[0.5em] text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-95 transition-all"
                            >
                                <LogIn size={24} /> Initialize Auth
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
