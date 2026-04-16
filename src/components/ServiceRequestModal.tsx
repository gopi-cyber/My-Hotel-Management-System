'use client';
import { useState } from 'react';
import { X, Coffee, WashingMachine, House, ShieldCheck, Sparkles, Clock, CheckCircle } from 'lucide-react';

interface ServiceRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServiceRequestModal({ isOpen, onClose }: ServiceRequestModalProps) {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    if (!isOpen) return null;

    const services = [
        { id: '1', name: 'Imperial Brunch', icon: Coffee, desc: 'Served in-suite' },
        { id: '2', name: 'Express Laundry', icon: WashingMachine, desc: '4-hour return' },
        { id: '3', name: 'Housekeeping', icon: House, desc: 'Standard cleanup' },
        { id: '4', name: 'VIP Concierge', icon: ShieldCheck, desc: 'Travel assistance' },
    ];

    const handleSubmit = (name: string) => {
        setSelectedService(name);
        setStep(2);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-500">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-xl rounded-[4rem] border-4 border-white/5 bg-slate-900/40 p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-500 group overflow-hidden">
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
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-950 border border-white/5 shadow-2xl group/icon">
                                <Sparkles size={36} className="text-amber-500 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">In-Suite <span className="text-amber-500">Services</span> <span className="text-amber-500">_</span></h2>
                            <p className="text-white/20 text-[10px] mt-4 font-black uppercase tracking-[0.4em] italic">Standard Operational Protocol v2.4</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {services.map((service) => (
                                <button 
                                    key={service.id}
                                    onClick={() => handleSubmit(service.name)}
                                    className="group/item flex w-full items-center gap-6 rounded-[2rem] border-2 border-white/5 bg-slate-950/40 p-6 transition-all hover:bg-slate-950 hover:border-amber-500/30 active:scale-95 shadow-2xl"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 border border-white/5 text-amber-500 group-hover/item:bg-amber-500 group-hover/item:text-slate-950 transition-all duration-300">
                                        <service.icon size={32} />
                                    </div>
                                    <div className="text-left flex flex-col space-y-1">
                                        <span className="text-xl font-black italic tracking-tighter text-white uppercase group-hover/item:text-amber-500 transition-colors leading-none">{service.name}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10 italic group-hover/item:text-white/40 transition-colors">{service.desc}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic">
                             <Clock size={18} className="text-amber-500/40" /> 
                             <span>Estimated Sync: 15 mins <span className="text-amber-500">/</span> Priority Response</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-20 text-center relative z-10">
                        <div className="mb-12 flex h-32 w-32 items-center justify-center rounded-[3.5rem] bg-slate-950 border-4 border-white/5 shadow-2xl animate-bounce">
                            <CheckCircle size={64} className="text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]" />
                        </div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white mb-6 uppercase leading-tight">Request <span className="text-amber-500">Sent</span> <span className="text-amber-500">_</span></h2>
                        <p className="text-white/20 text-lg font-black max-w-sm mb-14 italic uppercase tracking-tight">Our personnel have been notified. Your <strong>{selectedService}</strong> is being initialized.</p>
                        <button 
                            onClick={onClose}
                            className="h-20 w-full rounded-[2.5rem] bg-slate-950 border border-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-white hover:text-amber-500 transition-all shadow-2xl active:scale-95"
                        >
                            Return to Interface
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
