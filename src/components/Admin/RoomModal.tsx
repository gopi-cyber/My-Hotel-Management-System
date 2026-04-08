'use client';
import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, ArrowRight } from 'lucide-react';

interface Room {
    id?: string;
    type: string;
    price: number;
    status: string;
    amenities?: string[];
    floor?: number;
    description?: string;
}

export default function AdminRoomModal({ 
    isOpen, 
    onClose, 
    onSave, 
    room 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSave: (room: any) => void; 
    room?: Room | null 
}) {
    const [formData, setFormData] = useState<Room>({
        type: '',
        price: 0,
        status: 'Available',
        amenities: [],
        floor: 1,
        description: ''
    });

    useEffect(() => {
        if (room) {
            setFormData({...room, amenities: room.amenities || []});
        } else {
            setFormData({ type: '', price: 0, status: 'Available', amenities: [], floor: 1, description: '' });
        }
    }, [room, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/20 p-4 backdrop-blur-xl">
            {/* Inline 3D Styles */}
            <style jsx>{`
                .glass-modal {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(24px);
                    border: 4px solid rgba(255, 255, 255, 1);
                    box-shadow: 40px 40px 80px rgba(0,0,0,0.1), -20px -20px 60px #ffffff;
                }
            `}</style>

            <div className="glass-modal grid grid-rows-[auto_1fr_auto] w-full max-w-lg rounded-[3.5rem] p-10 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="pb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-black italic tracking-tighter text-slate-900 leading-none">
                                {room ? 'Advanced Config' : 'Initialize Record'}
                            </h3>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic">Standard Metadata Protocol</p>
                        </div>
                        <button onClick={onClose} className="h-12 w-12 rounded-2xl bg-white shadow-[10px_10px_20px_#d1d9e6] flex items-center justify-center text-slate-400 hover:text-red-500 transition-all active:scale-95">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Identify / Descriptor</label>
                        <input 
                            type="text" 
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all capitalize"
                            placeholder="e.g. Royal Suite"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Base Rate ($)</label>
                            <input 
                                type="number" 
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Sector / Floor</label>
                            <input 
                                type="number" 
                                value={formData.floor}
                                onChange={(e) => setFormData({...formData, floor: Number(e.target.value)})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Status Vector</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="Available">ACTIVE / AVAILABLE</option>
                                <option value="Occupied">LOCKED / OCCUPIED</option>
                                <option value="Maintenance">SYSTEM MAINTENANCE</option>
                            </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Neural Description</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full h-32 rounded-[2rem] border-2 border-white bg-white/40 p-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all resize-none"
                            placeholder="Metadata logistics..."
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-10 flex gap-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 h-14 rounded-2xl bg-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-500 border-2 border-white shadow-[10px_10px_20px_#d1d9e6] hover:bg-white transition-all"
                    >
                        Abort
                    </button>
                    <button 
                        onClick={() => onSave(formData)}
                        className="flex-1 h-16 rounded-[2rem] bg-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:bg-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        Commit Record <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
