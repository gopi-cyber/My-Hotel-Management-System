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
import ReportDetailModal from '@/components/Admin/ReportDetailModal';
import { LayoutDashboard, Users, Activity, BellRing, Calendar, BarChart3, Home, CheckCircle2, AlertCircle, ChevronRight, CreditCard, PieChart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    type TabType = 'inventory' | 'staff' | 'reservations' | 'reports';
    const [activeTab, setActiveTab] = useState<TabType>('inventory');
    const [showNotifications, setShowNotifications] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportType, setReportType] = useState<'financial' | 'growth'>('financial');
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
        { label: 'Occupancy', value: '82%', icon: PieChart, color: 'text-indigo-600', progress: 82, onClick: () => setActiveTab('reports') },
        { label: 'Inventory', value: rooms.items.length.toString(), icon: LayoutDashboard, color: 'text-cyan-600', progress: 100, onClick: () => setActiveTab('inventory') },
        { label: 'Revenue', value: '₹14,290', icon: CreditCard, color: 'text-emerald-600', progress: 91, onClick: () => setActiveTab('reports') },
        { label: 'Staff Active', value: '12/15', icon: Users, color: 'text-amber-600', progress: 80, onClick: () => setActiveTab('staff') },
    ];

    const tabs = [
        { id: 'inventory', label: 'Inventory', icon: LayoutDashboard },
        { id: 'staff', label: 'Staff Management', icon: Users },
        { id: 'reservations', label: 'Reservations', icon: Calendar },
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    ];

    return (
        <main className="flex min-h-screen bg-blue-200 text-slate-900 overflow-hidden font-sans relative">
            {/* Inline 3D Styles */}
            <style jsx>{`
                .glass-surface {
                    background: rgba(255, 255, 255, 0.62);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff;
                }
                .glass-sidebar {
                    background: rgba(255, 255, 255, 0.42);
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
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Premium Hotel</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
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
                    <div className="flex items-center gap-6 relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-[10px_10px_20px_#d1d9e6] border border-white hover:scale-105 active:scale-95 transition-all text-left"
                        >
                            <BellRing size={18} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">Notifications</span>
                            <div className="h-2 w-2 rounded-full bg-red-500 absolute top-4 right-5 animate-pulse" />
                        </button>

                        {showNotifications && (
                            <div className="absolute top-16 right-0 w-80 glass-surface rounded-[2rem] p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Urgent Updates</h4>
                                <div className="space-y-4">
                                    {[
                                        { title: 'New Reservation', time: '2m ago', icon: CheckCircle2, color: 'text-emerald-500', tab: 'reservations' },
                                        { title: 'Inventory Alert', time: '15m ago', icon: AlertCircle, color: 'text-amber-500', tab: 'inventory' },
                                        { title: 'Staff Check-in', time: '1h ago', icon: Users, color: 'text-indigo-500', tab: 'staff' }
                                    ].map((note, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => {
                                                setActiveTab(note.tab as TabType);
                                                setShowNotifications(false);
                                            }}
                                            className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                                        >
                                            <div className={`h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                                <note.icon size={18} className={note.color} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{note.title}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{note.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3 rounded-xl bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {stats.map((stat) => (
                        <button 
                            key={stat.label} 
                            onClick={stat.onClick}
                            className="bg-white/60 backdrop-blur-md border border-white rounded-[2.5rem] p-8 shadow-[10px_10px_40px_rgba(0,0,0,0.03)] transition-all hover:scale-105 active:scale-95 text-left group w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={`h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
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
                        </button>
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
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-4">
                                <button 
                                    onClick={() => { setReportType('financial'); setIsReportModalOpen(true); }}
                                    className="p-10 rounded-[3rem] bg-indigo-50/50 border-4 border-white flex flex-col space-y-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] hover:bg-indigo-100/50 transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                <BarChart3 size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Financial Metrics</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Capital Alpha-Theta sync</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="space-y-6 w-full">
                                        {[
                                            { label: 'Revenue Stream', value: '₹84.2k', progress: 75, color: 'bg-indigo-500' },
                                            { label: 'Operational Cost', value: '₹12.8k', progress: 22, color: 'bg-cyan-500' },
                                            { label: 'Net Liquidity', value: '₹71.4k', progress: 88, color: 'bg-emerald-500' }
                                        ].map(item => (
                                            <div key={item.label} className="space-y-2">
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                                                    <span className="text-lg font-black text-slate-900 italic">{item.value}</span>
                                                </div>
                                                <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-white">
                                                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.progress}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </button>

                                <button 
                                    onClick={() => { setReportType('growth'); setIsReportModalOpen(true); }}
                                    className="p-10 rounded-[3rem] bg-cyan-50/50 border-4 border-white flex flex-col space-y-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] hover:bg-cyan-100/50 transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                                                <TrendingUp size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Growth Telemetry</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Predictive occupancy flow</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-6 w-full">
                                        {[
                                            { label: 'Saturation', value: '92%', detail: '+14% YoY', color: 'text-indigo-600' },
                                            { label: 'Velocity', value: '4.8', detail: 'Market Avg 3.2', color: 'text-cyan-600' },
                                            { label: 'Retention', value: '78%', detail: 'High Stability', color: 'text-emerald-600' },
                                            { label: 'Projection', value: '₹140k', detail: 'Next Quarter', color: 'text-amber-600' }
                                        ].map(item => (
                                            <div key={item.label} className="bg-white/40 p-5 rounded-[2rem] border border-white flex flex-col justify-between">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
                                                <div>
                                                    <p className={`text-2xl font-black ${item.color} tracking-tighter italic`}>{item.value}</p>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">{item.detail}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <ReportDetailModal 
                isOpen={isReportModalOpen} 
                onClose={() => setIsReportModalOpen(false)} 
                type={reportType} 
            />
        </main>
    );
}
