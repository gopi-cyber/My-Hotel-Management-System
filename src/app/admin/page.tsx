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
import { 
    Users, 
    Hotel, 
    CalendarCheck2, 
    ChevronRight, 
    BellRing, 
    AlertCircle, 
    CheckCircle2, 
    MonitorDot, 
    LayoutDashboard, 
    Database, 
    CreditCard, 
    UserPlus, 
    Plus, 
    ArrowUpRight,
    Home,
    Activity,
    BarChart3,
    PieChart,
    TrendingUp,
    Calendar,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { TiltCard } from '@/components/TiltCard';

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
        document.title = 'Vortex Hub | Management Hub';
    }, [dispatch]);

    const stats = [
        { label: 'Occupancy Rate', value: '82%', icon: PieChart, color: 'text-amber-500', progress: 82, onClick: () => setActiveTab('reports') },
        { label: 'Total Rooms', value: rooms.items.length.toString(), icon: LayoutDashboard, color: 'text-blue-500', progress: 100, onClick: () => setActiveTab('inventory') },
        { label: 'Today\'s Revenue', value: '₹14,290', icon: CreditCard, color: 'text-amber-500', progress: 91, onClick: () => setActiveTab('reports') },
        { label: 'Daily Staff', value: '12/15', icon: Users, color: 'text-indigo-500', progress: 80, onClick: () => setActiveTab('staff') },
    ];

    const tabs = [
        { id: 'inventory', label: 'Room List', icon: LayoutDashboard },
        { id: 'staff', label: 'Staff Directory', icon: Users },
        { id: 'reservations', label: 'Guest Records', icon: Calendar },
        { id: 'reports', label: 'Business Insights', icon: BarChart3 },
    ];

    return (
        <main className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
            <ParticleBackground />
            
            {/* Inline 3D Styles */}
            <style jsx>{`
                .glass-surface {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 
                        0 40px 100px rgba(0, 0, 0, 0.05),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.8);
                }
                .glass-sidebar {
                    background: #ffffff;
                    border-right: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 20px 0 50px rgba(0,0,0,0.02);
                }
                .nav-active {
                    background: #f8fafc;
                    color: #0f172a;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.02);
                }
            `}</style>

            {/* Mesh Background */}
            <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none animate-pulse delay-700" />

            {/* Sidebar */}
            <aside className="z-20 w-80 glass-sidebar flex flex-col p-10 space-y-12 bg-white/10 backdrop-blur-3xl border-r border-slate-100">
                <Link href="/" className="flex items-center gap-4 px-2 group">
                    <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                        <Activity className="text-white" size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none uppercase">Vortex</span>
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1">Management Hub</span>
                    </div>
                </Link>

                <nav className="flex-1 space-y-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab(tab.id as TabType);
                            }}
                            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest transition-all group cursor-pointer ${
                                activeTab === tab.id 
                                    ? 'nav-active text-amber-600' 
                                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 border-2 border-transparent'
                            }`}
                        >
                            <tab.icon size={22} className={activeTab === tab.id ? 'text-amber-600' : 'text-slate-200 group-hover:text-slate-400'} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-10 border-t border-slate-100">
                    <Link href="/" className="w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                        <LogOut size={22} />
                        Logout Session
                    </Link>
                </div>
            </aside>

            {/* Content Area */}
            <section className="flex-1 flex flex-col h-screen overflow-y-auto z-10 p-12 bg-[#fcfdfe]">
                <header className="flex items-center justify-between mb-12">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-none uppercase">
                            {activeTab} Management
                        </h1>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Property Oversight & Operational Command
                        </p>
                    </div>

                    <div className="flex items-center gap-8 relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="flex items-center gap-4 bg-white px-8 py-4 rounded-[1.5rem] shadow-sm border border-slate-100 hover:border-amber-500/30 active:scale-95 transition-all text-left group"
                        >
                            <BellRing size={20} className="text-amber-500 group-hover:animate-bounce" />
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Alerts</span>
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        </button>

                        {showNotifications && (
                            <div className="absolute top-20 right-0 w-96 bg-white rounded-[2.5rem] p-8 z-50 animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl border border-slate-100">
                                <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-6 px-4">Recent Notifications</h4>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Booking Updated', time: '2m ago', icon: CheckCircle2, color: 'text-amber-500', tab: 'reservations' },
                                        { title: 'Low Inventory', time: '15m ago', icon: AlertCircle, color: 'text-red-500', tab: 'inventory' },
                                        { title: 'Staff Shift Start', time: '1h ago', icon: Users, color: 'text-blue-500', tab: 'staff' }
                                    ].map((note, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => {
                                                setActiveTab(note.tab as TabType);
                                                setShowNotifications(false);
                                            }}
                                            className="flex gap-4 p-4 rounded-[1.5rem] hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100"
                                        >
                                            <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                                                <note.icon size={18} className={note.color} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 uppercase group-hover:text-amber-600 transition-colors">{note.title}</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{note.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-4 rounded-[1.2rem] bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stats.map((stat, idx) => (
                        <TiltCard key={stat.label}>
                            <motion.button 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    stat.onClick();
                                }}
                                className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 transition-all active:scale-95 text-left group w-full hover:shadow-xl shadow-sm h-full cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-amber-500 transition-all duration-500`}>
                                        <stat.icon size={24} className={stat.color} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">{stat.label}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-slate-900 tracking-tight leading-none">{stat.value}</span>
                                    <div className="mt-5 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                        <div className={`h-full ${stat.color === 'text-amber-500' ? 'bg-amber-500' : 'bg-blue-500'} rounded-full transition-all duration-[2000ms]`} style={{ width: `${stat.progress}%` }} />
                                    </div>
                                </div>
                            </motion.button>
                        </TiltCard>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 bg-white rounded-[3rem] p-12 flex flex-col min-h-[700px] mb-12 border-2 border-slate-100 shadow-sm relative overflow-hidden"
                    >
                        <div className="mb-10 flex items-center justify-between relative z-10">
                            <div className="space-y-1">
                                 <h2 className="text-3xl font-bold text-slate-900 tracking-tight uppercase leading-none">{tabs.find(t => t.id === activeTab)?.label} Manager</h2>
                                 <div className="h-1.5 w-16 bg-amber-500 rounded-full" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
                            {activeTab === 'inventory' && <AdminRoomTable rooms={rooms.items} />}
                            {activeTab === 'staff' && <AdminStaffTable staff={staff.items} />}
                            {activeTab === 'reservations' && <AdminReservationTable bookings={bookings.items} />}
                            {activeTab === 'reports' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-6">
                                    <button 
                                        onClick={() => { setReportType('financial'); setIsReportModalOpen(true); }}
                                        className="p-12 rounded-[3.5rem] bg-white border-2 border-slate-100 flex flex-col space-y-10 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all text-left group overflow-hidden relative"
                                    >
                                        <div className="flex items-center justify-between w-full relative z-10">
                                            <div className="flex items-center gap-6">
                                                <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-all duration-500">
                                                    <BarChart3 size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-500 transition-colors uppercase">Financial Report</h3>
                                                    <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Monthly Earnings & Budget Overview</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={24} className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-500" />
                                        </div>
                                        <div className="space-y-6 w-full relative z-10">
                                            {[
                                                { label: 'Total Sales', value: '₹84.2k', progress: 75, color: 'bg-blue-500' },
                                                { label: 'Expenses', value: '₹12.8k', progress: 22, color: 'bg-red-500' },
                                                { label: 'Net Profit', value: '₹71.4k', progress: 88, color: 'bg-green-500' }
                                            ].map(item => (
                                                <div key={item.label} className="space-y-3">
                                                    <div className="flex justify-between items-end">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                                        <span className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{item.value}</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                        <div className={`h-full ${item.color} rounded-full transition-all duration-[1500ms] shadow-sm`} style={{ width: `${item.progress}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </button>

                                    <button 
                                        onClick={() => { setReportType('growth'); setIsReportModalOpen(true); }}
                                        className="p-12 rounded-[3.5rem] bg-white border-2 border-slate-100 flex flex-col space-y-10 shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all text-left group overflow-hidden relative"
                                    >
                                        <div className="flex items-center justify-between w-full relative z-10">
                                            <div className="flex items-center gap-6">
                                                <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-all duration-500">
                                                    <TrendingUp size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-500 transition-colors uppercase">Growth Insights</h3>
                                                    <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest mt-1">Predictive Occupancy & Marketing</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={24} className="text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all duration-500" />
                                        </div>
                                        <div className="flex-1 grid grid-cols-2 gap-6 w-full relative z-10">
                                            {[
                                                { label: 'Fill Rate', value: '92%', detail: '+14% vs Last Year', color: 'text-blue-500' },
                                                { label: 'Customer Rating', value: '4.8', detail: 'Market Avg 3.2', color: 'text-indigo-500' },
                                                { label: 'Return Guests', value: '78%', detail: 'Strong Loyalty', color: 'text-green-500' },
                                                { label: 'Next Month Est.', value: '₹140k', detail: 'Projected Growth', color: 'text-blue-500' }
                                            ].map(item => (
                                                <div key={item.label} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between transition-all hover:bg-white shadow-sm hover:shadow-md">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</span>
                                                    <div className="mt-4">
                                                        <p className={`text-3xl font-bold ${item.color} tracking-tight leading-none`}>{item.value}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{item.detail}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            <ReportDetailModal 
                isOpen={isReportModalOpen} 
                onClose={() => setIsReportModalOpen(false)} 
                type={reportType} 
            />
        </main>
    );
}

