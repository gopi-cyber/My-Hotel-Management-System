'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchBookings, updateBookingStatus } from '@/lib/features/bookingSlice';
import { fetchRooms, checkOutRoom } from '@/lib/features/roomSlice';
import { useEffect, useState } from 'react';
import { UserCheck, UserMinus, FileText, ClipboardList, Clock, ArrowRight, User, Hotel } from 'lucide-react';

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
        <main className="min-h-screen bg-slate-950 p-8 pt-12 text-white selection:bg-blue-500/30">
            <div className="mx-auto max-w-[1400px]">
                {/* Header Information */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <div className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Live Operations</div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase">Front Desk</h1>
                        <p className="mt-2 text-slate-500 font-medium tracking-tight">Main terminal for arrivals, departures, and active room logs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {/* Schedule / Arrivals Table */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-md">
                            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="flex items-center gap-3">
                                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500">
                                      <ClipboardList size={22} />
                                   </div>
                                   <h2 className="text-2xl font-black italic tracking-tighter uppercase">Arrival Schedule</h2>
                                </div>
                                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Global Queues</span>
                            </div>

                            <div className="space-y-4">
                                {bookings.map((booking) => {
                                    const room = rooms.find(r => r.id === booking.roomId);
                                    return (
                                        <div key={booking.id} className="group relative flex items-center justify-between rounded-2xl bg-white/5 border border-transparent p-5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                                            <div className="flex items-center gap-5">
                                               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                  <User size={24} />
                                               </div>
                                               <div className="flex flex-col">
                                                  <span className="text-lg font-black tracking-tight">{booking.guestName}</span>
                                                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic flex items-center gap-2">
                                                     <ArrowRight size={10} className="text-blue-500" />
                                                     Room {room?.type || booking.roomId} • Status: {booking.status}
                                                  </span>
                                               </div>
                                            </div>
                                            <div className="flex gap-4">
                                                {booking.status === 'Confirmed' ? (
                                                    <button 
                                                        onClick={() => handleCheckIn(booking.id)}
                                                        className="flex items-center gap-2 rounded-xl bg-green-600/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-green-500 transition-all hover:bg-green-600 hover:text-white"
                                                    >
                                                        <UserCheck size={14} /> Check In
                                                    </button>
                                                ) : booking.status === 'CheckedIn' ? (
                                                    <button 
                                                        onClick={() => handleCheckOut(booking)}
                                                        className="flex items-center gap-2 rounded-xl bg-orange-600/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-orange-500 transition-all hover:bg-orange-600 hover:text-white"
                                                    >
                                                        <UserMinus size={14} /> Check Out
                                                    </button>
                                                ) : (
                                                    <span className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                        Completed
                                                    </span>
                                                )}
                                                <button 
                                                    onClick={() => setSelectedBooking(booking)}
                                                    className="flex items-center justify-center rounded-xl bg-white/5 p-2.5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                                                >
                                                    <FileText size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {bookings.length === 0 && (
                                <div className="text-center py-20 text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">No arrival logs found for the current period.</div>
                            )}
                        </div>

                        {/* Room Status Board */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-md">
                             <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="flex items-center gap-3">
                                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-500">
                                      <Hotel size={20} />
                                   </div>
                                   <h2 className="text-2xl font-black italic tracking-tighter uppercase">Room Status Board</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {rooms.map(room => (
                                    <div key={room.id} className={`rounded-2xl border p-4 transition-all ${
                                        room.status === 'Available' ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                                    }`}>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Room {room.id}</div>
                                        <div className="text-xs font-bold text-white truncate">{room.type}</div>
                                        <div className={`mt-3 text-[8px] font-black uppercase tracking-[0.2em] ${
                                            room.status === 'Available' ? 'text-green-500' : 'text-red-500'
                                        }`}>{room.status}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Operational Quick-Action Sidebar */}
                    <div className="space-y-8">
                        <div className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl transition-all hover:border-blue-500/50">
                             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FileText size={120} />
                             </div>
                             <div className="relative z-10 mb-8 flex items-center gap-3">
                                <FileText className="text-blue-500" />
                                <h3 className="text-xl font-bold uppercase tracking-tighter italic">Terminal <span className="text-blue-500">Invoicing</span></h3>
                             </div>
                             <div className="relative z-10 rounded-2xl bg-black/40 p-6 border border-white/5">
                                 <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-500 italic uppercase">GS</div>
                                        <span className="text-xs font-bold text-white">GrandStay Bill v1.4</span>
                                    </div>
                                    <Clock size={14} className="text-slate-500" />
                                 </div>
                                 <div className="space-y-4 pt-2">
                                     <div className="flex justify-between">
                                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Guest Selected</span>
                                         <span className="text-sm font-black text-white">{selectedBooking?.guestName || 'None'}</span>
                                     </div>
                                     <div className="flex justify-between">
                                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Room Base Rate</span>
                                         <span className="text-sm font-black text-white">${selectedBooking ? (rooms.find(r => r.id === selectedBooking.roomId)?.price || 0) : 0}</span>
                                     </div>
                                     <div className="mt-6 flex items-center justify-between border-t border-dashed border-white/20 pt-6">
                                        <span className="text-lg font-black italic tracking-tighter">Running Total</span>
                                        <span className="text-3xl font-black italic text-blue-500 tracking-tighter leading-none">${selectedBooking ? (rooms.find(r => r.id === selectedBooking.roomId)?.price || 0) + 32.50 : 0}</span>
                                     </div>
                                 </div>
                                 <button 
                                    disabled={!selectedBooking || selectedBooking.status !== 'CheckedIn'}
                                    onClick={() => handleCheckOut(selectedBooking)}
                                    className="mt-8 w-full rounded-2xl bg-blue-600 py-4.5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                                 >
                                    Final Check-out
                                 </button>
                             </div>
                        </div>

                         <div className="flex flex-col gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 border-l-4 border-l-orange-500">
                                <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-600">Shift Alert</div>
                                <p className="text-sm font-bold text-white leading-relaxed">Guest in Room 204 requested late checkout (12:00 PM).</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 border-l-4 border-l-blue-500">
                                <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-600">Inventory Notice</div>
                                <p className="text-sm font-bold text-white leading-relaxed">Deluxe Room #102 is successfully sanitized and ready.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
