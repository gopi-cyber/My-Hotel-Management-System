'use client';
import { useState } from 'react';
import { X, ArrowRight, ChevronDown, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Room } from '@/lib/features/roomSlice';

export default function AdminRoomModal({ 
    isOpen, 
    onClose, 
    onSave, 
    room 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSave: (room: Room) => void; 
    room?: Room | null 
}) {
    const [formData, setFormData] = useState<Room>({
        id: room?.id || '',
        number: room?.number || '',
        type: room?.type || '',
        price: room?.price || 0,
        status: (room?.status || 'available') as 'available' | 'occupied' | 'maintenance',
        amenities: room?.amenities || [],
        capacity: room?.capacity || 1,
        description: room?.description || '',
        image: room?.image || ''
    });

    const [newAmenity, setNewAmenity] = useState('');

    const addAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            setFormData({
                ...formData,
                amenities: [...formData.amenities, newAmenity.trim()]
            });
            setNewAmenity('');
        }
    };

    const removeAmenity = (index: number) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.filter((_, i) => i !== index)
        });
    };

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
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(79, 70, 229, 0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(79, 70, 229, 0.2);
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
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Identify / Descriptor</label>
                            <input 
                                type="text" 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all capitalize"
                                placeholder="Royal Suite"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Room Number</label>
                            <input 
                                type="text" 
                                value={formData.number}
                                onChange={(e) => setFormData({...formData, number: e.target.value})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                                placeholder="101"
                            />
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Base Rate (₹)</label>
                            <input 
                                type="number" 
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Capacity</label>
                            <input 
                                type="number" 
                                value={formData.capacity}
                                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Status Vector</label>
                        <div className="relative group">
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="available">ACTIVE / AVAILABLE</option>
                                <option value="occupied">LOCKED / OCCUPIED</option>
                                <option value="maintenance">SYSTEM MAINTENANCE</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" size={18} />
                        </div>
                    </div>

                    {/* Amenities Management */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Inventory Perks / Amenities</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addAmenity()}
                                className="flex-1 h-12 rounded-xl border-2 border-white bg-white/40 px-5 text-xs font-bold text-slate-800 shadow-[inset_2px_2px_4px_#d1d9e6] outline-none focus:bg-white transition-all"
                                placeholder="Add Amenity (e.g. Mini Bar)"
                            />
                            <button 
                                onClick={addAmenity}
                                className="h-12 w-12 rounded-xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all active:scale-95"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                            {formData.amenities.map((amenity, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-2 bg-white/80 border border-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase text-slate-600 shadow-sm transition-all hover:shadow-md animate-in fade-in zoom-in duration-200"
                                >
                                    {amenity}
                                    <button 
                                        onClick={() => removeAmenity(index)}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <X size={12} strokeWidth={3} />
                                    </button>
                                </div>
                            ))}
                            {formData.amenities.length === 0 && (
                                <p className="text-[10px] text-slate-300 italic font-bold">No amenities specified yet.</p>
                            )}
                        </div>
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

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Asset Image URL</label>
                        {formData.image && (
                            <div className="h-40 w-full rounded-2xl overflow-hidden border-2 border-white shadow-inner mb-2 relative group bg-slate-50">
                                <Image 
                                    src={formData.image} 
                                    alt="Preview" 
                                    fill
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                        <input 
                            type="url" 
                            value={formData.image || ''}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full h-14 rounded-2xl border-2 border-white bg-white/40 px-6 text-sm font-bold text-slate-800 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] outline-none focus:bg-white transition-all"
                            placeholder="https://images.unsplash.com/..."
                        />
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest ml-2">Paste a direct image URL (Unsplash, etc.)</p>
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
