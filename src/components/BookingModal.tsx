import { useState } from 'react';
import { X, User, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { guestName: string; checkIn: string; checkOut: string; roomId: string }) => void;
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
                  className="absolute right-8 top-8 h-10 w-10 rounded-2xl bg-white shadow-[5px_5px_15px_#d1d9d4] flex items-center justify-center text-emerald-400 hover:text-red-500 transition-all hover:scale-110"
                >
                    <X size={20} />
                </button>

                {step === 1 ? (
                    <>
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-black tracking-tighter text-emerald-950 leading-tight italic">Reservation Terminal</h2>
                            <p className="text-emerald-700/40 text-[10px] mt-2 font-bold uppercase tracking-widest">Verification for Registry ID #<span className="text-emerald-700 font-black">{room.id.toUpperCase()}</span></p>
                        </div>

                        <div className="mb-10 p-8 rounded-[2.5rem] bg-emerald-50/50 border-2 border-white flex items-center justify-between shadow-inner">
                            <div>
                                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter italic">{room.type} Suite</h3>
                                <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.2em] mt-1 italic">Verified Premium Accomodation</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-emerald-700 tracking-tighter italic">₹{room.price}</span>
                                <p className="text-[10px] text-emerald-400 uppercase font-black tracking-widest mt-1">Base / nt</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-left">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 ml-4">Guest Identity</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Full Legal Name" 
                                        className="w-full h-16 rounded-[1.8rem] border-2 border-white bg-white/40 pl-16 pr-6 text-sm font-bold text-emerald-900 shadow-[inset_4px_4px_8px_#d1d9d4,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                        onChange={(e) => setBookingData({...bookingData, guestName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 ml-4">Check In</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-16 rounded-[1.8rem] border-2 border-white bg-white/40 px-6 text-sm font-bold text-emerald-900 shadow-[inset_4px_4px_8px_#d1d9d4,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 ml-4">Check Out</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-16 rounded-[1.8rem] border-2 border-white bg-white/40 px-6 text-sm font-bold text-emerald-900 shadow-[inset_4px_4px_8px_#d1d9d4,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-emerald-50 flex flex-col gap-6">
                            <button 
                                onClick={handleCheckIn}
                                className="w-full h-16 rounded-[1.8rem] bg-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-[0_20px_40px_rgba(4,120,87,0.3)] hover:bg-emerald-800 hover:translate-y-[-3px] active:scale-95 transition-all flex items-center justify-center gap-4"
                            >
                                Secure Selection <ArrowRight size={20} />
                            </button>
                             <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300">
                                <ShieldCheck size={16} className="text-emerald-400" />
                                <span>Encrypted High-Availability confirmed</span>
                             </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center py-16 text-center">
                        <div className="mb-10 h-24 w-24 rounded-[2.5rem] bg-emerald-50 border-4 border-white shadow-[20px_20px_40px_#d1d9d4] flex items-center justify-center">
                            <Sparkles size={48} className="text-emerald-500" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-emerald-950 mb-4 italic">Registration Active</h2>
                        <p className="text-emerald-800/40 text-lg font-bold max-w-sm mb-12 italic">Your operational telemetry is synchronized and the checkout terminal is ready.</p>
                        <button 
                            onClick={onClose}
                            className="h-16 w-full rounded-[1.8rem] bg-emerald-950 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-950/20"
                        >
                            Back to Console
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
