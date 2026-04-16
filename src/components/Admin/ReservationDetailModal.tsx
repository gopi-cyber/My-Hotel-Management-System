'use client';
import React from 'react';
import { X, User, Calendar, MapPin, Phone, Mail, Clock, ShieldCheck, CreditCard, ChevronRight, Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

interface Booking {
    id: string;
    guestName: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
}

interface ReservationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export default function ReservationDetailModal({ isOpen, onClose, booking }: ReservationDetailModalProps) {
    if (!isOpen || !booking) return null;

    const duration = Math.ceil((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 3600 * 24));

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-500">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-3xl bg-slate-900/60 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-500 border-4 border-white/5 max-h-[90vh] overflow-y-auto custom-scrollbar backdrop-blur-3xl">
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 20px;
                    }
                `}</style>
                {/* Visual Header */}
                <div className="h-48 bg-slate-950 w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
                    <div className="absolute top-[-50%] right-[-10%] h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[80px] animate-pulse" />
                    
                    <div className="absolute -bottom-12 left-12 h-28 w-28 rounded-3xl bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-white/5 overflow-hidden group">
                        <div className="h-full w-full bg-slate-950 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                            <User size={48} />
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="absolute top-8 right-8 h-12 w-12 rounded-2xl bg-slate-900 border border-white/5 hover:bg-slate-800 flex items-center justify-center text-white/40 hover:text-white transition-all shadow-xl"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-12 pt-20">
                    <div className="flex justify-between items-start mb-12">
                        <div className="space-y-2">
                            <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">{booking.guestName}<span className="text-amber-500">.</span></h2>
                            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] mt-2 flex items-center gap-3 italic">
                                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                Premium Identity Verified
                            </p>
                        </div>
                        <div className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-xl ${
                            booking.status === 'CheckedIn' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                            {booking.status.toUpperCase()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 mb-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-5 group">
                                <div className="h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/10 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all shadow-xl">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest leading-none mb-2 italic">Stay Period</p>
                                    <p className="text-sm font-black text-white uppercase italic tracking-wider">{booking.checkInDate} <span className="mx-2 text-white/5">—</span> {booking.checkOutDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 group">
                                <div className="h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/10 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all shadow-xl">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest leading-none mb-2 italic">Temporal duration</p>
                                    <p className="text-sm font-black text-white uppercase italic tracking-wider">{duration} Cycles / {duration + 1} Intervals</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-5 group">
                                <div className="h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/10 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all shadow-xl">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest leading-none mb-2 italic">Allocated Suite</p>
                                    <p className="text-sm font-black text-white uppercase italic tracking-wider">Suite #{booking.roomId}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 group">
                                <div className="h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/10 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all shadow-xl">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest leading-none mb-2 italic">Neural Hash Code</p>
                                    <p className="text-sm font-black text-white/40 uppercase italic tracking-[0.2em]">{booking.id.slice(0, 10).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                        {/* Check-out Details */}
                        <div className="bg-slate-950/40 rounded-[2.5rem] p-8 border border-white/5 hover:border-white/10 transition-all">
                             <div className="flex items-center gap-4 mb-6">
                                <CheckCircle2 size={20} className="text-amber-500" />
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">De-sync Status</h4>
                             </div>
                             <div className="space-y-4">
                                <div className="flex justify-between items-center text-[11px] font-black uppercase italic tracking-widest">
                                    <span className="text-white/10">Keys Remitted</span>
                                    <span className="text-amber-500 underline decoration-amber-500/20 underline-offset-4">Verified</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-black uppercase italic tracking-widest">
                                    <span className="text-white/10">Integrity Check</span>
                                    <span className="text-indigo-400">Passed (v1.2)</span>
                                </div>
                             </div>
                        </div>

                        {/* Guest Review */}
                        <div className="bg-slate-950/40 rounded-[2.5rem] p-8 border border-white/5 shadow-inner relative overflow-hidden group">
                             <div className="absolute top-[-10%] right-[-10%] h-32 w-32 bg-amber-500/5 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                             <div className="flex items-center gap-4 mb-6">
                                <Star size={20} className="text-amber-500 fill-amber-500" />
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Neural Feedback</h4>
                             </div>
                             <div className="flex gap-2 mb-4">
                                {[1,2,3,4].map(i => <Star key={i} size={14} className="text-amber-500 fill-amber-500 shadow-lg shadow-amber-500/20" />)}
                                <Star size={14} className="text-white/10 fill-white/5" />
                             </div>
                             <p className="text-[11px] font-black text-white/40 italic leading-relaxed uppercase tracking-wider">&quot;Exceptional stay. The telemetry sync was seamless and the ocean view from the deluxe suite is unparalleled. Highly recommend the butler service.&quot;</p>
                             <MessageSquareQuote size={48} className="absolute bottom-[-10%] right-[-5%] text-white/5 group-hover:text-amber-500/10 transition-colors" />
                        </div>
                    </div>

                    <div className="bg-slate-950/40 rounded-[3rem] p-10 border-4 border-white/5 flex flex-col gap-8 shadow-inner">
                        <div className="flex items-center justify-between pb-8 border-b border-white/5">
                            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Guest Telemetry Archive</h4>
                            <ChevronRight size={18} className="text-white/5" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center gap-5 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-white/10 group-hover:text-amber-500 transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span className="text-[11px] font-black text-white/40 uppercase italic tracking-widest">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-5 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-white/10 group-hover:text-amber-500 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-[11px] font-black text-white/40 uppercase italic tracking-widest">{booking.guestName.toLowerCase().replace(' ', '.')}@NODE.NET</span>
                            </div>
                            <div className="flex items-center gap-5 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-white/10 group-hover:text-amber-500 transition-colors">
                                    <CreditCard size={16} />
                                </div>
                                <span className="text-[11px] font-black text-amber-500 uppercase italic tracking-widest border-b border-amber-500/20 cursor-help">Capital Settlement Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-6">
                        <button 
                            onClick={onClose}
                            className="flex-1 h-18 rounded-[2rem] bg-slate-950 border border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all shadow-xl active:scale-95"
                        >
                            Dismiss Sync
                        </button>
                        <button className="flex-1 h-18 rounded-[2rem] bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-amber-400 active:scale-95 transition-all">
                            Export Log Archive
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
