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
            { name: 'Rooms', href: '/dashboard', icon: Hotel },
            { name: 'Profile', href: '/profile', icon: User },
        ];

        if (user?.role === 'admin') {
            items.push({ name: 'Admin', href: '/admin', icon: ShieldCheck });
        }
        
        if (user?.role === 'receptionist' || user?.role === 'admin') {
            items.push({ name: 'Receptionist', href: '/receptionist', icon: BellRing });
        }

        return items;
    };

    const navItems = getNavItems();

    return (
        <nav className="fixed top-0 z-50 w-full glass-nav border-b border-white/5">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo Section */}
                <Link href={isAuthenticated ? "/dashboard" : "/"} className="group flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform duration-500">
                        <Hotel size={22} className="stroke-[2.5px]" />
                    </div>
                    <div className="font-black tracking-tighter uppercase italic">
                        <span className="text-xl text-white">GrandStay</span>
                        <span className="text-amber-400 ml-1">HMS</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden items-center gap-10 md:flex">
                    <div className="flex gap-8 font-bold">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.href}
                                    className={`relative flex items-center gap-2 py-1 text-sm tracking-wide transition-all hover:text-amber-400 ${
                                        isActive ? 'text-amber-400' : 'text-white/60'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 glass-panel-3d px-3 py-1.5 border-white/5 bg-white/5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-black uppercase text-xs">
                                    {user?.username?.charAt(0)}
                                </div>
                                <span className="text-xs font-bold text-white/80">{user?.username}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-red-400 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link 
                            href="/login"
                            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-black uppercase tracking-tighter text-slate-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] shadow-lg"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white md:hidden hover:bg-white/10 border border-white/5"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="absolute left-0 top-full w-full bg-slate-950 border-b border-white/5 p-6 md:hidden backdrop-blur-3xl bg-opacity-95">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-4 text-lg font-bold text-white/60 hover:text-amber-400 p-3 rounded-2xl hover:bg-white/5 transition-all"
                            >
                                <item.icon size={22} />
                                {item.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                             <button 
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 py-4 text-sm font-black uppercase tracking-widest text-red-400 border border-red-500/20"
                            >
                                 Sign Out
                             </button>
                        ) : (
                            <Link 
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-4 text-sm font-black uppercase tracking-widest text-slate-950"
                            >
                                <LogIn size={20} /> Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
