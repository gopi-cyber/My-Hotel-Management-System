'use client';
import { useState } from 'react';
import { X, Calendar, User, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
    room: {
        id: string;
        type: string;
        price: number;
    } | null;
}

export default function BookingModal({ isOpen, onClose, onConfirm, room }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        guestName: '',
        checkIn: '',
        checkOut: '',
    });

    if (!isOpen || !room) return null;

    const handleConfirm = () => {
        onConfirm({ ...bookingData, roomId: room.id });
        setStep(2); // Show success state
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
                <button 
                  onClick={onClose}
                  className="absolute right-6 top-6 text-slate-500 hover:text-white"
                >
                    <X size={24} />
                </button>

                {step === 1 ? (
                    <>
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-500/10">
                                <Calendar size={24} />
                            </div>
                            <h2 className="text-3xl font-black italic tracking-tighter">Confirm <span className="text-blue-500">Reservation</span></h2>
                        </div>

                        <div className="mb-10 rounded-2xl bg-white/5 p-6 border border-white/5">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Selected Room</p>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">{room.type} Suite</h3>
                                <span className="text-2xl font-black text-blue-400">${room.price}<span className="text-xs text-slate-500 font-normal">/night</span></span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="text-left">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 focus-within:border-blue-500/50 transition-all">
                                    <User size={18} className="text-slate-600" />
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                                        onChange={(e) => setBookingData({...bookingData, guestName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div className="text-left">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Check In</label>
                                    <input 
                                        type="date" 
                                        className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                                    />
                                </div>
                                <div className="text-left">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Check Out</label>
                                    <input 
                                        type="date" 
                                        className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col gap-4">
                            <button 
                                onClick={handleConfirm}
                                className="w-full rounded-2xl bg-blue-600 py-4 text-base font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/30 transition-all hover:bg-blue-500 active:scale-95"
                            >
                                Secure My Room
                            </button>
                             <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                                <ShieldCheck size={14} className="text-green-500" />
                                <span>No hidden fees • Instant Confirmation</span>
                             </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center py-20 text-center">
                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-green-500 shadow-2xl shadow-green-500/20">
                            <Sparkles size={48} className="text-white" />
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tighter mb-4">You're All Set!</h2>
                        <p className="text-slate-400 text-lg max-w-xs mb-10">Your reservation has been secured. We've sent the confirmation details to your account.</p>
                        <button 
                            onClick={onClose}
                            className="rounded-2xl bg-white/5 border border-white/10 px-12 py-4 text-sm font-bold hover:bg-white/10 transition-all"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
