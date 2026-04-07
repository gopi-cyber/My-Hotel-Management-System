'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchBookings } from '@/lib/features/bookingSlice';
import { useEffect, useState } from 'react';
import { Clock, Coffee, ShieldCheck, Download, CreditCard, WashingMachine, House, ChevronRight, Star, Sparkles, MapPin } from 'lucide-react';
import ServiceRequestModal from '@/components/ServiceRequestModal';

export default function GuestProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const bookings = useSelector((state: RootState) => state.bookings.items);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    
    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const serviceOptions = [
        { name: 'Room Service', icon: Coffee, color: 'text-orange-400' },
        { name: 'Housekeeping', icon: House, color: 'text-green-400' },
        { name: 'Laundry', icon: WashingMachine, color: 'text-blue-400' },
        { name: 'Security Assist', icon: ShieldCheck, color: 'text-red-400' },
    ];

    return (
        <main className="min-h-screen bg-slate-950 p-8 pt-12 text-white selection:bg-blue-500/30">
            <div className="mx-auto max-w-[1400px]">
                {/* Profile Header */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                           <Sparkles size={12} /> Elite Membership v1.4
                        </div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase">Guest <span className="text-blue-500">Portal</span></h1>
                        <p className="mt-2 text-slate-500 font-medium tracking-tight">Your gateway to luxury stays and personalized hotel services.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Download size={18} /> Download Invoices
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                    {/* Main Timeline Section */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 backdrop-blur-md">
                            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-8">
                                <div className="flex items-center gap-3">
                                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-500/10">
                                      <Clock size={24} />
                                   </div>
                                   <h2 className="text-3xl font-black italic tracking-tighter uppercase">Reservations</h2>
                                </div>
                                <span className="rounded-full bg-blue-600/20 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-600/30">Active Collection</span>
                            </div>

                            <div className="space-y-6">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="group flex flex-col gap-6 rounded-2xl bg-white/5 border border-transparent p-8 transition-all hover:bg-white/10 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="text-2xl font-black italic tracking-tighter text-white">Imperial Grand Deluxe</h3>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1 italic">
                                                   <MapPin size={12} className="text-blue-500" /> 
                                                   Booking Reference: {booking.id}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="rounded-xl bg-blue-600/20 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-600/30">
                                                {booking.status}
                                                </span>
                                                <div className="flex items-center gap-1 text-yellow-500 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-12 border-t border-white/5 pt-8">
                                            <div className="flex flex-col">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Check-in</p>
                                                <p className="text-lg font-black tracking-tight">{booking.checkIn || 'Nov 12th, 2026'}</p>
                                            </div>
                                             <div className="flex flex-col">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Check-out</p>
                                                <p className="text-lg font-black tracking-tight">{booking.checkOut || 'Nov 18th, 2026'}</p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <button className="flex items-center gap-2 text-sm font-black italic tracking-tighter text-blue-400 hover:text-white transition-colors">
                                                    <Download size={18} /> Get Vouchers
                                                 </button>
                                                 <ChevronRight size={20} className="text-slate-800" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {bookings.length === 0 && (
                                    <div className="flex h-64 flex-col items-center justify-center p-12 text-center opacity-30">
                                         <Clock size={48} className="mb-4" />
                                         <span className="text-[10px] font-black uppercase tracking-widest">No Active Lodging Logs Found</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Guest Service Sidebar */}
                    <div className="flex flex-col gap-10">
                        {/* Service Selection Card */}
                         <div className="rounded-3xl border border-white/10 bg-slate-900 border-l-4 border-l-blue-600 p-8 shadow-2xl transition-all hover:border-blue-500/50">
                            <h3 className="mb-8 text-xl font-black italic tracking-tighter uppercase">Request <span className="text-blue-500">Service</span></h3>
                            <div className="grid grid-cols-2 gap-4">
                                {serviceOptions.map((service) => (
                                    <button 
                                        key={service.name}
                                        onClick={() => setIsServiceModalOpen(true)}
                                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/5 p-6 transition-all hover:bg-blue-600 hover:border-blue-400 active:scale-95"
                                    >
                                        <service.icon className={`${service.color} group-hover:text-white transition-colors`} size={32} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-100 transition-colors">{service.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Balance Card */}
                        <div className="group relative overflow-hidden rounded-3xl bg-blue-600 p-8 shadow-2xl shadow-blue-600/30 transition-all hover:scale-[1.02]">
                             <div className="relative z-10">
                                 <div className="mb-8 flex items-center justify-between">
                                    <CreditCard size={32} className="text-white" />
                                    <span className="rounded-xl bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">Tier 1 Elite</span>
                                 </div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 opacity-60 mb-1">Total Stay Value</p>
                                 <h4 className="text-5xl font-black italic tracking-tighter leading-none mb-10">$892.50</h4>
                                 <button className="w-full rounded-2xl bg-white py-4.5 text-xs font-black uppercase tracking-widest text-blue-600 shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                                    Final Settlement
                                 </button>
                             </div>
                             {/* Abstract Decorative Flare */}
                             <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-[100px] transition-transform group-hover:scale-150 duration-1000" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Selection Interaction */}
            <ServiceRequestModal 
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
            />
        </main>
    );
}
