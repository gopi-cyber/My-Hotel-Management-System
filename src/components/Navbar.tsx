'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Hotel, User, Menu, X, LayoutDashboard, ShieldCheck, LogIn, BellRing } from 'lucide-react';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { logout } from '@/lib/features/userSlice';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state: RootState) => (state as any).user || { isAuthenticated: false, user: null });
    const dispatch = useDispatch();

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
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo Section */}
                <Link href={isAuthenticated ? "/dashboard" : "/"} className="group flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                        <Hotel size={24} />
                    </div>
                    <div className="font-bold tracking-tight">
                        <span className="text-xl text-white">GrandStay</span>
                        <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-xl text-transparent ml-1">HMS</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden items-center gap-10 md:flex">
                    <div className="flex gap-8 font-medium">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.href}
                                    className={`relative flex items-center gap-2 py-1 text-sm transition-all hover:text-blue-400 ${
                                        isActive ? 'text-blue-400' : 'text-slate-400'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-blue-400" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-500 font-bold uppercase tracking-tighter italic border border-blue-500/20">
                                {user?.username?.charAt(0)}
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link 
                            href="/"
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] shadow-lg"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white md:hidden hover:bg-white/10"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="absolute left-0 top-18 w-full bg-slate-900 border-b border-white/10 p-6 md:hidden">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-4 text-lg text-slate-300 hover:text-blue-400 p-2"
                            >
                                <item.icon size={22} />
                                {item.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                             <button 
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-600/10 py-4 text-sm font-bold text-red-500"
                            >
                                 Sign Out
                             </button>
                        ) : (
                            <Link 
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white"
                            >
                                <LogIn size={22} /> Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
