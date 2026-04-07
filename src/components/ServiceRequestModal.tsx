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
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-10 shadow-2xl">
                <button onClick={onClose} className="absolute right-6 top-6 text-slate-500 hover:text-white transition-all">
                    <X size={24} />
                </button>

                {step === 1 ? (
                    <>
                        <div className="mb-10 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-500/10">
                                <Sparkles size={28} />
                            </div>
                            <h2 className="text-3xl font-black italic tracking-tighter uppercase">In-Suite <span className="text-blue-500">Services</span></h2>
                            <p className="mt-2 text-sm text-slate-500 font-medium">Request premium amenities directly to your room.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {services.map((service) => (
                                <button 
                                    key={service.id}
                                    onClick={() => handleSubmit(service.name)}
                                    className="group flex w-full items-center gap-5 rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-blue-600 hover:border-blue-400 active:scale-95 shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-blue-500 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                                        <service.icon size={26} />
                                    </div>
                                    <div className="text-left flex flex-col">
                                        <span className="text-lg font-black italic tracking-tighter group-hover:text-white transition-colors">{service.name}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-100 transition-colors">{service.desc}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                             <Clock size={16} /> <span>Estimated Response: 15 mins</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center py-16 text-center">
                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 shadow-2xl shadow-blue-600/20">
                            <CheckCircle size={56} className="text-white" />
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tighter mb-4">Request <span className="text-blue-500 italic">Sent</span></h2>
                        <p className="text-slate-400 text-lg max-w-xs mb-10">Our staff has been notified. Your <strong>{selectedService}</strong> is on the way.</p>
                        <button 
                            onClick={onClose}
                            className="rounded-2xl bg-white/10 px-12 py-4 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                        >
                            Back to Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
