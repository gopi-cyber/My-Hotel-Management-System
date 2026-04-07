'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '@/lib/features/roomSlice';
import { fetchStaff } from '@/lib/features/staffSlice';
import { fetchBookings } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import AdminRoomTable from '@/components/Admin/RoomTable';
import AdminStaffTable from '@/components/Admin/StaffTable';
import AdminReservationTable from '@/components/Admin/ReservationTable';
import { LayoutDashboard, Users, CreditCard, PieChart, Activity, Bell, ChevronRight, Settings, Star, Calendar, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'inventory' | 'staff' | 'reservations' | 'reports'>('inventory');
    const dispatch = useDispatch<AppDispatch>();
    const rooms = useSelector((state: RootState) => state.rooms);
    const staff = useSelector((state: RootState) => state.staff);
    const bookings = useSelector((state: RootState) => state.bookings);

    useEffect(() => {
        dispatch(fetchRooms());
        dispatch(fetchStaff());
        dispatch(fetchBookings());
    }, [dispatch]);

    const stats = [
        { label: 'Hotel Occupancy', value: '82%', icon: PieChart, color: 'text-blue-400', progress: 82 },
        { label: 'Active Inventory', value: rooms.items.length.toString(), icon: LayoutDashboard, color: 'text-indigo-400', progress: 100 },
        { label: 'Total Revenue', value: '$14,290', icon: CreditCard, color: 'text-emerald-400', progress: 91 },
        { label: 'Staff in Shift', value: '12/15', icon: Users, color: 'text-yellow-400', progress: 80 },
    ];

    const tabs = [
        { id: 'inventory', label: 'Inventory', icon: LayoutDashboard },
        { id: 'staff', label: 'Staff Management', icon: Users },
        { id: 'reservations', label: 'Reservations', icon: Calendar },
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    ];

    return (
        <main className="min-h-screen bg-slate-950 p-8 pt-12 text-white selection:bg-blue-500/30">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <span>Main Console</span>
                            <ChevronRight size={10} />
                            <span className="text-blue-500 uppercase">{activeTab}</span>
                        </div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase">Command <span className="text-blue-500">Center</span></h1>
                        <p className="mt-2 text-slate-400 font-medium">Strategic oversight and total control over hotel performance.</p>
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

                {/* HUD Stats */}
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
                            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
                                <div className={`h-full bg-gradient-to-r from-blue-600 to-indigo-400`} style={{ width: `${stat.progress}%` }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabbed Navigation */}
                <div className="mb-10 flex flex-wrap gap-4 border-b border-white/10 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-black uppercase tracking-tighter transition-all ${
                                activeTab === tab.id 
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                                    : 'text-slate-500 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {activeTab === 'inventory' && (
                             <div className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                                <AdminRoomTable rooms={rooms.items} />
                            </div>
                        )}
                        {activeTab === 'staff' && (
                             <div className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                                <AdminStaffTable staff={staff.items} />
                            </div>
                        )}
                        {activeTab === 'reservations' && (
                             <div className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                                <AdminReservationTable bookings={bookings.items} />
                            </div>
                        )}
                        {activeTab === 'reports' && (
                             <div className="space-y-8">
                                <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 backdrop-blur-md">
                                    <h3 className="mb-8 text-2xl font-black italic tracking-tighter uppercase">Revenue <span className="text-blue-500 text-sm font-bold ml-1">Trend Analysis</span></h3>
                                    <div className="flex h-64 items-end gap-2 px-10">
                                        {[40, 60, 45, 90, 65, 80, 55, 95, 70, 85, 30, 75].map((h, i) => (
                                            <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 group relative" style={{ height: `${h}%` }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-white px-1.5 py-0.5 text-[8px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ${h * 120}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-between px-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="rounded-3xl border border-white/10 bg-emerald-600 p-8 shadow-2xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <TrendingUp size={32} className="text-white" />
                                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Top Performer</span>
                                        </div>
                                        <h4 className="text-xl font-bold uppercase italic tracking-tighter">David Miller</h4>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-100 italic">Receptionist • 98.4% Efficiency</p>
                                    </div>
                                    <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <Star size={32} className="text-blue-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Guest Sentiment</span>
                                        </div>
                                        <h4 className="text-xl font-bold uppercase italic tracking-tighter">9.2 Excellent</h4>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic">Based on 1,240 detailed reviews</p>
                                    </div>
                                </div>
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
                    </div>
                </div>
            </div>
        </main>
    );
}
