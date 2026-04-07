'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '@/lib/features/roomSlice';
import { RootState, AppDispatch } from '@/lib/store';
import AdminRoomTable from '@/components/Admin/RoomTable';
import { LayoutDashboard, Users, CreditCard, PieChart, Activity, Bell, ChevronRight, Settings, Star } from 'lucide-react';

export default function AdminDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status } = useSelector((state: RootState) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const stats = [
        { label: 'Hotel Occupancy', value: '82%', icon: PieChart, color: 'text-blue-400', progress: 82 },
        { label: 'Active Inventory', value: items.length.toString(), icon: LayoutDashboard, color: 'text-indigo-400', progress: 100 },
        { label: 'Total Revenue', value: '$14,290', icon: CreditCard, color: 'text-emerald-400', progress: 91 },
        { label: 'Guest Sentiment', value: '4.9/5', icon: Star, color: 'text-yellow-400', progress: 98 },
    ];

    return (
        <main className="min-h-screen bg-slate-950 p-8 pt-12 text-white selection:bg-blue-500/30">
            <div className="mx-auto max-w-[1400px]">
                {/* Header with Breadcrumbs */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <span>Main Console</span>
                            <ChevronRight size={10} />
                            <span className="text-blue-500">Inventory Overview</span>
                        </div>
                        <h1 className="text-5xl font-black italic tracking-tighter">Command <span className="text-blue-500">Center</span></h1>
                        <p className="mt-2 text-slate-400 font-medium">Real-time room management and profitability analytics.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
                            <Bell size={20} />
                        </button>
                        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Performance HUD (Stats) */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md transition-all hover:border-white/20">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon size={80} />
                            </div>
                            <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-blue-500 shadow-xl">
                                <stat.icon size={28} className={stat.color} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                                <span className="text-4xl font-black italic tracking-tighter">{stat.value}</span>
                            </div>
                            {/* Analytics Progress Bar */}
                            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
                                <div 
                                    className={`h-full bg-gradient-to-r from-blue-600 to-indigo-400 transition-all duration-1000`}
                                    style={{ width: `${stat.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Control Panel */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {status === 'loading' ? (
                            <div className="flex h-96 w-full items-center justify-center rounded-3xl bg-white/5">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600/30 border-t-blue-500" />
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                                <AdminRoomTable rooms={items} />
                            </div>
                        )}
                    </div>

                    {/* Operational Sidebar */}
                    <div className="space-y-8">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-xl font-bold tracking-tight italic">Operations <span className="text-blue-500">Live</span></h3>
                                <Activity size={18} className="animate-pulse text-blue-400" />
                            </div>
                            <div className="space-y-6">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="group flex items-start gap-4 rounded-2xl border border-transparent bg-white/5 p-4 transition-all hover:border-white/10 hover:bg-white/10">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">Guest Registration</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Confirmed Room 10{item}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-5 text-xs font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white">
                                View Activity Log <ChevronRight size={14} />
                            </button>
                        </div>

                         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 p-8 shadow-2xl">
                             <div className="relative z-10">
                                <h3 className="mb-4 text-2xl font-black italic tracking-tighter">Pro Reporting</h3>
                                <p className="mb-8 text-sm font-medium text-blue-100 leading-relaxed opacity-80">
                                    Generate automated financial forecasts based on current room conversion and guest stay length.
                                </p>
                                <button className="w-full rounded-2xl bg-white py-4 font-black uppercase tracking-widest text-blue-950 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
                                    Export v1.4 PDF
                                </button>
                             </div>
                             {/* Abstract Flare */}
                             <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
