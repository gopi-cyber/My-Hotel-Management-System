'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchBookings, updateBookingStatus } from '@/lib/features/bookingSlice';
import { fetchRooms, checkOutRoom } from '@/lib/features/roomSlice';
import { useEffect, useState } from 'react';
import { UserCheck, UserMinus, FileText, ClipboardList, Clock, ArrowRight, User, Hotel, Bell, Home, Settings, Search, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function ReceptionistDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const bookings = useSelector((state: RootState) => state.bookings.items);
    const rooms = useSelector((state: RootState) => state.rooms.items);

    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchBookings());
        dispatch(fetchRooms());
    }, [dispatch]);

    const handleCheckIn = async (bookingId: string) => {
        await dispatch(updateBookingStatus({ id: bookingId, status: 'CheckedIn' }));
    };

    const handleCheckOut = async (booking: any) => {
        await dispatch(updateBookingStatus({ id: booking.id, status: 'CheckedOut' }));
        await dispatch(checkOutRoom(booking.roomId));
    };

    return (
        <main className="flex min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
            {/* Mesh decor */}
            <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-cyan-100/30 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none z-0" />

            {/* Glass Side Navigation */}
            <aside className="z-20 w-72 glass-morphism border-r border-white/60 flex flex-col p-8 space-y-10">
                <div className="flex items-center gap-4 px-2">
                    <div className="h-10 w-10 rounded-2xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Hotel className="text-white" size={20} />
                    </div>
                    <div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none">Front Desk</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Live Operations</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold bg-white shadow-[10px_10px_20px_#d1d9e6] text-cyan-600 border border-white">
                        <ClipboardList size={20} /> Today's Arrivals
                    </button>
                    <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-white/40 transition-all">
                        <Hotel size={20} /> Room Status Board
                    </button>
                    <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-white/40 transition-all">
                        <FileText size={20} /> Billing Terminal
                    </button>
                </nav>

                <div className="pt-8 border-t border-slate-200/50">
                    <Link href="/" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Home size={20} /> Exit Gateway
                    </Link>
                </div>
            </aside>

            {/* Main Terminal Area */}
            <section className="flex-1 flex flex-col h-screen overflow-y-auto z-10 p-10 pt-8">
                <header className="flex items-center justify-between mb-10 pb-6 border-b border-white">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Operations Alpha</h1>
                        <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">Active Shift • Reception Terminal</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-[10px_10px_20px_#d1d9e6] border border-white">
                            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse outline outline-4 outline-emerald-500/20" />
                            <span className="text-sm font-bold text-slate-700">System Online</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        {/* Arrival Log */}
                        <div className="glass-card rounded-[2.5rem] p-10 shadow-[20px_20px_60px_#d1d9e6]">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Confirmed Bookings</h2>
                            <div className="space-y-4">
                                {bookings.map((booking) => {
                                    const room = rooms.find(r => r.id === booking.roomId);
                                    return (
                                        <div key={booking.id} className="group flex items-center justify-between p-5 rounded-3xl bg-white/50 border border-white hover:bg-white hover:shadow-xl transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-cyan-600 group-hover:text-white group-hover:shadow-lg transition-all">
                                                    <User size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-extrabold text-slate-900 tracking-tight">{booking.guestName}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5 italic">
                                                        {room?.type || 'Room ' + booking.roomId} • Status: {booking.status}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-3">
                                                {booking.status === 'Confirmed' && (
                                                    <button onClick={() => handleCheckIn(booking.id)} className="h-11 px-6 rounded-2xl bg-emerald-500 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all uppercase tracking-widest">Check In</button>
                                                )}
                                                {booking.status === 'CheckedIn' && (
                                                    <button onClick={() => handleCheckOut(booking)} className="h-11 px-6 rounded-2xl bg-orange-500 text-[11px] font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all uppercase tracking-widest">Check Out</button>
                                                )}
                                                <button onClick={() => setSelectedBooking(booking)} className="h-11 w-11 rounded-2xl bg-white border border-slate-100 shadow-[4px_4px_10px_#d1d9e6] flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-indigo-600">
                                                    <FileText size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Status Matrix */}
                        <div className="glass-card rounded-[2.5rem] p-10 shadow-[20px_20px_60px_#d1d9e6]">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Room Telemetry Grid</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {rooms.map(room => (
                                    <div key={room.id} className={`p-5 rounded-3xl border-2 transition-all group cursor-pointer hover:scale-105 ${
                                        room.status === 'Available' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'
                                    }`}>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">#R_{room.id}</p>
                                        <p className="text-sm font-extrabold text-slate-800 mb-3">{room.type}</p>
                                        <div className={`text-[9px] font-black tracking-widest flex items-center gap-1.5 ${room.status === 'Available' ? 'text-emerald-500' : 'text-red-500'}`}>
                                            <div className={`h-1.5 w-1.5 rounded-full ${room.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            {room.status.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Operational Sidebar */}
                    <div className="space-y-10">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
                            <h3 className="text-2xl font-bold text-white italic tracking-tight mb-10">Invoicing Core</h3>
                            <div className="bg-white/10 rounded-3xl p-8 border border-white/20 space-y-6 backdrop-blur-md shadow-inner">
                                <div className="flex justify-between items-center text-[11px] font-bold text-indigo-100 uppercase tracking-widest opacity-60">
                                    <span>Guest Profile</span>
                                    <span>#{selectedBooking?.id?.slice(0, 4) || 'PNDG'}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/10">
                                    <span className="text-sm font-bold text-white">{selectedBooking?.guestName || 'Select Patient'}</span>
                                    <User size={16} className="text-white/40" />
                                </div>
                                <div className="pt-6 border-t border-white/10 space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-medium text-white/60">Base Accommodation</span>
                                        <span className="text-xl font-bold text-white">${selectedBooking ? (rooms.find(r => r.id === selectedBooking.roomId)?.price || 0) : 0}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline text-white/60">
                                        <span className="text-xs font-medium">Service & Amenities</span>
                                        <span className="text-sm font-bold">$32.50</span>
                                    </div>
                                </div>
                                <div className="pt-10 flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Grand Total</span>
                                    <span className="text-6xl font-black italic text-white tracking-tighter">${selectedBooking ? (rooms.find(r => r.id === selectedBooking.roomId)?.price || 0) + 32.50 : 0}</span>
                                </div>
                                <button 
                                    disabled={!selectedBooking || selectedBooking.status !== 'CheckedIn'}
                                    onClick={() => handleCheckOut(selectedBooking)}
                                    className="w-full mt-8 h-16 bg-white text-indigo-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-50 transition-all disabled:opacity-30 active:scale-95"
                                >
                                    Execute Checkout
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                             <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-[10px_10px_30px_#d1d9e6] border-l-8 border-l-cyan-500">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Shift Notice</p>
                                <p className="text-sm font-bold text-slate-800 leading-relaxed italic">Room 204 requested late checkout extension until 14:00 PM.</p>
                             </div>
                             <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-[10px_10px_30px_#d1d9e6] border-l-8 border-l-orange-500">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Maintenance Log</p>
                                <p className="text-sm font-bold text-slate-800 leading-relaxed italic">Suite #102 sanitation complete. Inventory telemetry updated.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
