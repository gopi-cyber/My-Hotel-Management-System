'use client';
import React from 'react';
import { X, User, Calendar, MapPin, Phone, Mail, Clock, ShieldCheck, CreditCard, ChevronRight, Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

interface Booking {
    id: string;
    guestName: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    status: string;
}

interface ReservationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export default function ReservationDetailModal({ isOpen, onClose, booking }: ReservationDetailModalProps) {
    if (!isOpen || !booking) return null;

    const duration = Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 3600 * 24));

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border border-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(0,0,0,0.1);
                        border-radius: 10px;
                    }
                `}</style>
                {/* Visual Header */}
                <div className="h-32 bg-indigo-600 w-full relative">
                    <div className="absolute -bottom-10 left-10 h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                        <div className="h-full w-full bg-slate-50 flex items-center justify-center text-indigo-600">
                            <User size={40} />
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-10 pt-14">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">{booking.guestName}</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                Premium Identity Verified
                            </p>
                        </div>
                        <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                            booking.status === 'CheckedIn' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                        }`}>
                            {booking.status}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Stay Period</p>
                                    <p className="text-sm font-bold text-slate-700">{booking.checkIn} — {booking.checkOut}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Duration</p>
                                    <p className="text-sm font-bold text-slate-700">{duration} Nights / {duration + 1} Days</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Allocated Suite</p>
                                    <p className="text-sm font-bold text-slate-700">Room #{booking.roomId}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Reference Code</p>
                                    <p className="text-sm font-bold text-slate-700 uppercase">{booking.id.slice(0, 10)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Check-out Details */}
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                             <div className="flex items-center gap-3 mb-4">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Check-out Status</h4>
                             </div>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-slate-400 uppercase tracking-widest">Keys Returned</span>
                                    <span className="text-emerald-600 uppercase tracking-widest">Confirmed</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-slate-400 uppercase tracking-widest">Inspection</span>
                                    <span className="text-indigo-600 uppercase tracking-widest">Passed (v1.2)</span>
                                </div>
                             </div>
                        </div>

                        {/* Guest Review */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                             <div className="flex items-center gap-3 mb-4">
                                <Star size={18} className="text-amber-500 fill-amber-500" />
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Guest Review</h4>
                             </div>
                             <div className="flex gap-1 mb-2">
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <Star size={12} className="text-amber-400 fill-amber-400 opacity-50" />
                             </div>
                             <p className="text-[10px] font-bold text-slate-500 italic leading-relaxed">"Exceptional stay. The telemetry sync was seamless and the ocean view from the deluxe suite is unparalleled. Highly recommend the butler service."</p>
                             <MessageSquareQuote size={40} className="absolute -bottom-4 -right-2 text-slate-50 opacity-5" />
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col gap-6">
                        <div className="flex items-center justify-between pb-6 border-b border-white">
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Guest Telemetry</h4>
                            <ChevronRight size={16} className="text-slate-300" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Phone size={14} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-600">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={14} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-600">{booking.guestName.toLowerCase().replace(' ', '.')}@example.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CreditCard size={14} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-600 text-indigo-600 underline">Payment Settled</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button 
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
                        >
                            Dismiss
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                            Export Log
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
