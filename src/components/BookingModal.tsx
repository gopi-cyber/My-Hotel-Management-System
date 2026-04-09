'use client';
import { useState } from 'react';
import { X, Calendar, User, Sparkles, CreditCard, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/20 p-4 backdrop-blur-xl">
            <div className="relative w-full max-w-xl rounded-[3rem] border-4 border-white bg-white/60 p-12 shadow-[40px_40px_80px_rgba(0,0,0,0.1),-20px_-20px_60px_#ffffff] backdrop-blur-2xl">
                <button 
                  onClick={onClose}
                  className="absolute right-8 top-8 h-10 w-10 rounded-2xl bg-white shadow-[5px_5px_15px_#d1d9e6] flex items-center justify-center text-slate-400 hover:text-red-500 transition-all hover:scale-110"
                >
                    <X size={20} />
                </button>

                {step === 1 ? (
                    <>
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">Reservation Terminal</h2>
                            <p className="text-slate-500 text-sm mt-2 font-medium">Verification for Room ID #<span className="text-indigo-600 font-bold">{room.id}</span></p>
                        </div>

                        <div className="mb-10 p-8 rounded-[2rem] bg-indigo-50/50 border-2 border-white flex items-center justify-between shadow-inner">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{room.type} Suite</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Verified Premium Accomodation</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-indigo-600 tracking-tighter">₹{room.price}</span>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Base/nt</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-left">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">Guest Identity</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Full Legal Name" 
                                        className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 pl-14 pr-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                        onChange={(e) => setBookingData({...bookingData, guestName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">Check In</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">Check Out</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-slate-100/50 flex flex-col gap-6">
                            <button 
                                onClick={handleConfirm}
                                className="w-full h-16 rounded-[1.8rem] bg-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:translate-y-[-3px] active:scale-95 transition-all flex items-center justify-center gap-4"
                            >
                                Secure Selection <ArrowRight size={20} />
                            </button>
                             <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                                <ShieldCheck size={16} className="text-emerald-400" />
                                <span>Encrypted High-Availability confirmed</span>
                             </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center py-16 text-center">
                        <div className="mb-10 h-24 w-24 rounded-[2rem] bg-emerald-50 border-4 border-white shadow-[20px_20px_40px_#d1d9e6] flex items-center justify-center">
                            <Sparkles size={48} className="text-emerald-500" />
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tighter text-slate-900 mb-4">Registration Active</h2>
                        <p className="text-slate-400 text-lg font-medium max-w-sm mb-12 italic">Your operational telemetry is synchronized and the checkout terminal is ready.</p>
                        <button 
                            onClick={onClose}
                            className="h-16 w-full rounded-2xl bg-slate-900 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
                        >
                            Back to Console
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
