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
import { LayoutDashboard, Users, CreditCard, PieChart, Activity, BellRing, ChevronRight, Settings, Star, Calendar, BarChart3, TrendingUp, Home } from 'lucide-react';
import Link from 'next/link';

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
        { label: 'Occupancy', value: '82%', icon: PieChart, color: 'text-indigo-600', progress: 82 },
        { label: 'Inventory', value: rooms.items.length.toString(), icon: LayoutDashboard, color: 'text-cyan-600', progress: 100 },
        { label: 'Revenue', value: '$14,290', icon: CreditCard, color: 'text-emerald-600', progress: 91 },
        { label: 'Staff Active', value: '12/15', icon: Users, color: 'text-amber-600', progress: 80 },
    ];

    const tabs = [
        { id: 'inventory', label: 'Inventory', icon: LayoutDashboard },
        { id: 'staff', label: 'Staff Management', icon: Users },
        { id: 'reservations', label: 'Reservations', icon: Calendar },
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    ];

    return (
        <main className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
            {/* Inline 3D Styles */}
            <style jsx>{`
                .glass-surface {
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff;
                }
                .glass-sidebar {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(12px);
                    border-right: 1px solid rgba(255, 255, 255, 0.5);
                }
            `}</style>

            {/* Mesh Background */}
            <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-cyan-100/30 blur-[120px] pointer-events-none" />

            {/* Sidebar */}
            <aside className="z-20 w-72 glass-sidebar flex flex-col p-8 space-y-10">
                <div className="flex items-center gap-4 px-2">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
                        <Activity className="text-white" size={20} />
                    </div>
                    <div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none underline decoration-indigo-200 underline-offset-4">GrandStay</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Operational Hub</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                                activeTab === tab.id 
                                    ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-indigo-600 border border-white' 
                                    : 'text-slate-400 hover:text-indigo-500 hover:bg-white/50'
                            }`}
                        >
                            <tab.icon size={20} className={activeTab === tab.id ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-400'} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-slate-200/50">
                    <Link href="/" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Home size={20} />
                        Exit Console
                    </Link>
                </div>
            </aside>

            {/* Content Area */}
            <section className="flex-1 flex flex-col h-screen overflow-y-auto z-10 p-10 pt-8">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 capitalize italic leading-none">{activeTab} Interface</h1>
                        <p className="text-sm font-bold text-slate-300 mt-2 uppercase tracking-[0.2em]">High Impact Management Console</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-[10px_10px_20px_#d1d9e6] border border-white">
                            <BellRing size={18} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">Notifications</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white/60 backdrop-blur-md border border-white rounded-[2.5rem] p-8 shadow-[10px_10px_40px_rgba(0,0,0,0.03)] transition-all hover:scale-105 active:scale-95">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm`}>
                                    <stat.icon size={24} className={stat.color} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-slate-900 tracking-tighter italic">{stat.value}</span>
                                <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-white">
                                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${stat.progress}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 glass-surface rounded-[3rem] p-10 py-12 flex flex-col min-h-[600px] mb-10">
                    <div className="mb-10 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{tabs.find(t => t.id === activeTab)?.label} Controller</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {activeTab === 'inventory' && <AdminRoomTable rooms={rooms.items} />}
                        {activeTab === 'staff' && <AdminStaffTable staff={staff.items} />}
                        {activeTab === 'reservations' && <AdminReservationTable bookings={bookings.items} />}
                        {activeTab === 'reports' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-4">
                                <div className="p-12 rounded-[3rem] bg-slate-50 border-4 border-white flex flex-col items-center text-center space-y-6 shadow-inner">
                                    <BarChart3 size={60} className="text-indigo-600" />
                                    <h3 className="text-xl font-bold text-slate-900 uppercase">Financial Metrics</h3>
                                    <p className="text-sm text-slate-400 max-w-xs font-medium italic leading-relaxed">High-fidelity visualization of capital distribution and operational expenditures.</p>
                                </div>
                                <div className="p-12 rounded-[3rem] bg-slate-50 border-4 border-white flex flex-col items-center text-center space-y-6 shadow-inner">
                                    <TrendingUp size={60} className="text-cyan-600" />
                                    <h3 className="text-xl font-bold text-slate-900 uppercase">Growth Telemetry</h3>
                                    <p className="text-sm text-slate-400 max-w-xs font-medium italic leading-relaxed">Proactive forecasting of market trends and occupancy saturation indicators.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
