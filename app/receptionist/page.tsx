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
    const [activeView, setActiveView] = useState<'arrivals' | 'rooms' | 'billing'>('arrivals');

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
        setSelectedBooking(null);
    };

    // Calculate nights stayed for billing
    const calculateNights = (checkIn: string, checkOut: string) => {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays > 0 ? diffDays : 1; // Minimum 1 night
    };

    // Filter today's arrivals (mock system date: 2026-04-09)
    const todaysArrivals = bookings.filter(b => b.checkIn === '2026-04-09' && b.status === 'Confirmed');

    // Get currently checked-in guests for billing selection
    const checkedInGuests = bookings.filter(b => b.status === 'CheckedIn');

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
                    <button 
                        onClick={() => setActiveView('arrivals')}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                            activeView === 'arrivals' 
                            ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-cyan-600 border border-white' 
                            : 'text-slate-400 hover:text-cyan-600 hover:bg-white/40'
                        }`}
                    >
                        <ClipboardList size={20} className={activeView === 'arrivals' ? 'text-cyan-600' : 'text-slate-300 group-hover:text-cyan-400'} /> Today's Arrivals
                    </button>
                    <button 
                        onClick={() => setActiveView('rooms')}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                            activeView === 'rooms' 
                            ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-cyan-600 border border-white' 
                            : 'text-slate-400 hover:text-cyan-600 hover:bg-white/40'
                        }`}
                    >
                        <Hotel size={20} className={activeView === 'rooms' ? 'text-cyan-600' : 'text-slate-300 group-hover:text-cyan-400'} /> Room Status Board
                    </button>
                    <button 
                        onClick={() => setActiveView('billing')}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                            activeView === 'billing' 
                            ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-cyan-600 border border-white' 
                            : 'text-slate-400 hover:text-cyan-600 hover:bg-white/40'
                        }`}
                    >
                        <FileText size={20} className={activeView === 'billing' ? 'text-cyan-600' : 'text-slate-300 group-hover:text-cyan-400'} /> Billing Terminal
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
                        {/* Conditional Rendering based on Active View */}

                        {activeView === 'arrivals' && (
                            <div className="glass-card rounded-[2.5rem] p-10 shadow-[20px_20px_60px_#d1d9e6]">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Today's Arrivals</h2>
                                    <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-bold uppercase tracking-widest">{todaysArrivals.length} Pending</span>
                                </div>
                                <div className="space-y-4">
                                    {todaysArrivals.length === 0 ? (
                                        <div className="text-center py-10 text-slate-400 italic font-medium">No arrivals pending for today.</div>
                                    ) : (
                                        todaysArrivals.map((booking) => {
                                            const room = rooms.find(r => r.id === booking.roomId);
                                            return (
                                                <div key={booking.id} className="group flex items-center justify-between p-5 rounded-3xl bg-white/50 border border-white hover:bg-white hover:shadow-xl transition-all">
                                                    <div className="flex items-center gap-5">
                                                        <div className="h-12 w-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:shadow-lg transition-all">
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
                                                        <button onClick={() => handleCheckIn(booking.id)} className="h-11 px-6 rounded-2xl bg-emerald-500 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all uppercase tracking-widest">Execute Check In</button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                
                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 w-full">All Check-ins & Active Guests</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max h-64 overflow-y-auto pr-2 custom-scrollbar">
                                        {checkedInGuests.map(booking => {
                                            const room = rooms.find(r => r.id === booking.roomId);
                                            return (
                                                <div key={booking.id} className="flex flex-row justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                                    <div>
                                                        <span className="font-bold text-slate-800 block text-sm">{booking.guestName}</span>
                                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-1">Room {booking.roomId}</span>
                                                    </div>
                                                    <button onClick={() => setSelectedBooking(booking)} className="h-8 w-8 rounded-xl bg-slate-50 flex justify-center items-center text-slate-400 hover:bg-slate-100 transition-colors">
                                                        <FileText size={14}/>
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeView === 'rooms' && (
                            <div className="glass-card rounded-[2.5rem] p-10 shadow-[20px_20px_60px_#d1d9e6]">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Room Telemetry Grid</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {rooms.map(room => (
                                        <div key={room.id} className={`p-6 rounded-[2rem] border-2 transition-all group flex flex-col justify-between h-40 ${
                                            room.status === 'Available' ? 'bg-emerald-50/50 border-emerald-100 hover:shadow-emerald-500/20' : 
                                            room.status === 'Occupied' ? 'bg-red-50/50 border-red-100 hover:shadow-red-500/20' :
                                            'bg-yellow-50/50 border-yellow-100 hover:shadow-yellow-500/20'
                                        } hover:scale-105 hover:shadow-xl`}>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">#Room_{room.id}</p>
                                                <p className="text-sm font-extrabold text-slate-800 leading-tight">{room.type}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className={`text-[9px] font-black tracking-widest flex items-center gap-1.5 ${
                                                    room.status === 'Available' ? 'text-emerald-600' : 
                                                    room.status === 'Occupied' ? 'text-red-500' : 'text-yellow-600'
                                                }`}>
                                                    <div className={`h-1.5 w-1.5 rounded-full ${
                                                        room.status === 'Available' ? 'bg-emerald-500' : 
                                                        room.status === 'Occupied' ? 'bg-red-500' : 'bg-yellow-500'
                                                    }`} />
                                                    {room.status.toUpperCase()}
                                                </div>
                                                <p className="text-xs font-bold text-slate-500">₹{room.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeView === 'billing' && (
                             <div className="glass-card rounded-[2.5rem] p-10 shadow-[20px_20px_60px_#d1d9e6]">
                                 <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Guest Directory for Billing</h2>
                                 {checkedInGuests.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 italic font-medium">No checked-in guests currently require billing.</div>
                                 ) : (
                                     <div className="space-y-4">
                                        {checkedInGuests.map(booking => {
                                             const room = rooms.find(r => r.id === booking.roomId);
                                             const isSelected = selectedBooking?.id === booking.id;
                                             return (
                                                 <div 
                                                    key={booking.id} 
                                                    onClick={() => setSelectedBooking(booking)}
                                                    className={`group flex items-center justify-between p-5 rounded-3xl border cursor-pointer transition-all ${
                                                        isSelected 
                                                        ? 'bg-indigo-50 border-indigo-200 shadow-md transform scale-[1.02]' 
                                                        : 'bg-white/50 border-white hover:bg-white hover:shadow-md'
                                                    }`}
                                                >
                                                     <div className="flex items-center gap-5">
                                                         <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                                                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                                                         }`}>
                                                             <User size={24} />
                                                         </div>
                                                         <div>
                                                             <p className={`text-lg font-extrabold tracking-tight ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>{booking.guestName}</p>
                                                             <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5 italic ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}>
                                                                 Room {booking.roomId} • Stayed {calculateNights(booking.checkIn, '2026-04-09')} Nts
                                                             </p>
                                                         </div>
                                                     </div>
                                                     <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-300'}`}>
                                                         <ArrowRight size={16} />
                                                     </div>
                                                 </div>
                                             )
                                        })}
                                     </div>
                                 )}
                             </div>
                        )}
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
                                    <span className="text-sm font-bold text-white">{selectedBooking?.guestName || 'Select Guest'}</span>
                                    <User size={16} className="text-white/40" />
                                </div>
                                
                                {selectedBooking ? (() => {
                                    const room = rooms.find(r => r.id === selectedBooking.roomId);
                                    // Base calculations
                                    const nights = calculateNights(selectedBooking.checkIn, '2026-04-09');
                                    const roomRate = room?.price || 0;
                                    const subTotal = roomRate * nights;
                                    
                                    // Premium extras mock
                                    const serviceCharge = 150; // Flat premium wellness mock fee
                                    const taxRate = 0.18; // 18% GST mock
                                    
                                    const preTax = subTotal + serviceCharge;
                                    const totalTax = preTax * taxRate;
                                    const grandTotal = preTax + totalTax;

                                    return (
                                        <>
                                            <div className="pt-6 border-t border-white/10 space-y-4">
                                                <div className="flex justify-between items-baseline text-white/80">
                                                    <span className="text-xs font-medium">Accommodation ({nights} Nts)</span>
                                                    <span className="text-sm font-bold">₹{subTotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between items-baseline text-white/80">
                                                    <span className="text-xs font-medium">Service & Amenities</span>
                                                    <span className="text-sm font-bold">₹{serviceCharge.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between items-baseline text-white/50 pt-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Estimated Taxes (18%)</span>
                                                    <span className="text-xs font-bold">₹{totalTax.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="pt-10 flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Grand Total</span>
                                                <span className="text-5xl font-black italic text-white tracking-tighter">₹{grandTotal.toFixed(0)}</span>
                                            </div>
                                        </>
                                    );
                                })() : (
                                    <>
                                        <div className="pt-6 border-t border-white/10 space-y-4">
                                            <div className="flex justify-between items-baseline text-white/40">
                                                <span className="text-xs font-medium">Accommodation</span>
                                                <span className="text-sm font-bold">₹0.00</span>
                                            </div>
                                            <div className="flex justify-between items-baseline text-white/40">
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Taxes</span>
                                                <span className="text-xs font-bold">₹0.00</span>
                                            </div>
                                        </div>
                                        <div className="pt-10 flex flex-col items-center opacity-30">
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Grand Total</span>
                                            <span className="text-5xl font-black italic text-white tracking-tighter">₹0</span>
                                        </div>
                                    </>
                                )}
                                
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
