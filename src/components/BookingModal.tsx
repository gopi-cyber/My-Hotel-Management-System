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
    const [error, setError] = useState<string | null>(null);

    if (!isOpen || !room) return null;

    const handleConfirm = () => {
        setError(null);

        if (!bookingData.guestName || !bookingData.checkIn || !bookingData.checkOut) {
            setError("All fields are required.");
            return;
        }

        const cin = new Date(bookingData.checkIn);
        const cout = new Date(bookingData.checkOut);

        if (cout <= cin) {
            setError("Check-out date must be after check-in date.");
            return;
        }

        onConfirm({ ...bookingData, roomId: room.id });
        setStep(2); // Show success state
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-xl rounded-[4rem] border-4 border-white/5 bg-slate-900/40 p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-[-20%] right-[-20%] h-64 w-64 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute bottom-[-20%] left-[-20%] h-64 w-64 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />

                <button 
                  onClick={onClose}
                  className="absolute right-10 top-10 h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/20 hover:text-red-500 transition-all active:scale-95 shadow-2xl z-20 group/close"
                >
                    <X size={24} className="group-hover/close:rotate-90 transition-transform" />
                </button>

                {step === 1 ? (
                    <div className="relative z-10">
                        <div className="mb-12 text-center space-y-2">
                            <h2 className="text-4xl font-black tracking-tighter text-white leading-none italic uppercase">Reservation Terminal <span className="text-amber-500">_</span></h2>
                            <p className="text-white/20 text-[10px] mt-2 font-black uppercase tracking-[0.4em] italic">Verification for Registry ID #<span className="text-amber-500">{room.id.toUpperCase()}</span></p>
                        </div>

                        <div className="mb-12 p-10 rounded-[3rem] bg-slate-950/60 border-2 border-white/5 flex items-center justify-between shadow-2xl group/card relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                            <div className="relative">
                                <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase leading-none">{room.type} Suite</h3>
                                <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] mt-3 italic">Verified Premium Accomodation</p>
                            </div>
                            <div className="text-right relative">
                                <span className="text-4xl font-black text-amber-500 tracking-tighter italic leading-none">₹{room.price}</span>
                                <p className="text-[10px] text-white/10 uppercase font-black tracking-widest mt-3 italic">Base / Cycle</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-left">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-6 italic">Guest Identity Profile</label>
                                <div className="relative group/input">
                                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-amber-500 transition-colors" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Full Legal Name" 
                                        className="w-full h-18 rounded-[2rem] border-2 border-white/5 bg-slate-950/40 pl-20 pr-8 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all italic tracking-wider placeholder:text-white/5"
                                        onChange={(e) => setBookingData({...bookingData, guestName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-6 italic">Check In Node</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-18 rounded-[2rem] border-2 border-white/5 bg-slate-950/40 px-8 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all italic tracking-[0.2em] [color-scheme:dark]"
                                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-6 italic">Check Out Node</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-18 rounded-[2rem] border-2 border-white/5 bg-slate-950/40 px-8 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all italic tracking-[0.2em] [color-scheme:dark]"
                                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-8 p-5 rounded-2xl bg-red-500/10 border-2 border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake italic">
                                [ SYSTEM ERROR ]: {error}
                            </div>
                        )}

                        <div className="mt-12 pt-10 border-t border-white/5 flex flex-col gap-8">
                            <button 
                                onClick={handleConfirm}
                                className="w-full h-20 rounded-[2.5rem] bg-amber-500 text-[11px] font-black uppercase tracking-[0.5em] text-slate-950 shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-6 group/btn"
                            >
                                Secure Selection <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                             <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic">
                                <ShieldCheck size={18} className="text-amber-500/40" />
                                <span>Encrypted High-Availability confirmed node sync</span>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-20 text-center relative z-10">
                        <div className="mb-12 h-32 w-32 rounded-[3.5rem] bg-slate-950 border-4 border-white/5 shadow-2xl flex items-center justify-center animate-bounce">
                            <Sparkles size={64} className="text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]" />
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter text-white mb-6 italic uppercase leading-tight">Registration Active <span className="text-amber-500">_</span></h2>
                        <p className="text-white/20 text-lg font-black max-w-sm mb-14 italic uppercase tracking-tight">Your operational telemetry is synchronized and the node archive is locked.</p>
                        <button 
                            onClick={onClose}
                            className="h-20 w-full rounded-[2.5rem] bg-slate-950 border border-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-white hover:text-amber-500 transition-all shadow-2xl active:scale-95"
                        >
                            Return to Control Center
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
