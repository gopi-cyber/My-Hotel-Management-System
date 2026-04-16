'use client';
import { useState } from 'react';
import { X, ArrowRight, ChevronDown, Plus } from 'lucide-react';
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl transition-opacity"
                onClick={onClose}
            />

            {/* Inline Styles */}
            <style jsx>{`
                .glass-modal {
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 0 50px 100px rgba(0,0,0,0.1);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
            `}</style>

            <div className="glass-modal grid grid-rows-[auto_1fr_auto] w-full max-w-2xl rounded-[4rem] p-12 max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-500 relative bg-white">
                {/* Header */}
                <div className="pb-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-4xl font-bold tracking-tight text-slate-900 uppercase leading-none">
                                {room ? 'Room Details' : 'New Room'} <span className="text-amber-500">_</span>
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2 italic">Room Categorization System</p>
                        </div>
                        <button onClick={onClose} className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all active:scale-95 shadow-sm group">
                            <X size={28} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto pr-4 space-y-10 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Room Type Name</label>
                            <input 
                                type="text" 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full h-16 rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 px-8 text-sm font-bold text-slate-900 outline-none focus:border-amber-500/30 focus:bg-white transition-all capitalize italic tracking-wider placeholder:text-slate-200"
                                placeholder="Royal Suite"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Room Number</label>
                            <input 
                                type="text" 
                                value={formData.number}
                                onChange={(e) => setFormData({...formData, number: e.target.value})}
                                className="w-full h-16 rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 px-8 text-sm font-bold text-slate-900 outline-none focus:border-amber-500/30 focus:bg-white transition-all italic tracking-[0.2em] placeholder:text-slate-200"
                                placeholder="101"
                            />
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Nightly Rate (₹)</label>
                            <input 
                                type="number" 
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                className="w-full h-16 rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 px-8 text-sm font-bold text-amber-500 outline-none focus:border-amber-500/30 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Guest Capacity</label>
                            <input 
                                type="number" 
                                value={formData.capacity}
                                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                                className="w-full h-16 rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 px-8 text-sm font-bold text-slate-900 outline-none focus:border-amber-500/30 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Room Status</label>
                        <div className="relative group">
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as 'available' | 'occupied' | 'maintenance'})}
                                className="w-full h-16 rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 px-8 text-sm font-bold text-slate-900 outline-none focus:border-amber-500/30 focus:bg-white transition-all appearance-none cursor-pointer italic tracking-widest uppercase"
                            >
                                <option value="available" className="bg-white text-slate-900">AVAILABLE</option>
                                <option value="occupied" className="bg-white text-slate-900">OCCUPIED / SOLD OUT</option>
                                <option value="maintenance" className="bg-white text-slate-900">UNDER MAINTENANCE</option>
                            </select>
                            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-amber-500 transition-colors" size={20} />
                        </div>
                    </div>

                    {/* Amenities Management */}
                    <div className="space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Room Amenities</label>
                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addAmenity()}
                                className="flex-1 h-14 rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-8 text-xs font-bold text-slate-900 outline-none focus:border-amber-500/30 transition-all italic tracking-wider placeholder:text-slate-200"
                                placeholder="Add Amenity (e.g. Free Wi-Fi)"
                            />
                            <button 
                                onClick={addAmenity}
                                className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white hover:bg-amber-500 transition-all active:scale-95 shadow-lg"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3 min-h-[50px] p-6 rounded-[2rem] bg-slate-50/50 border-2 border-slate-100 border-dashed">
                            {formData.amenities.map((amenity, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-3 bg-white border border-slate-100 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase text-slate-400 italic tracking-widest shadow-sm animate-in fade-in zoom-in duration-300 group hover:border-amber-500/30 transition-all hover:text-slate-900"
                                >
                                    {amenity}
                                    <button 
                                        onClick={() => removeAmenity(index)}
                                        className="text-slate-200 hover:text-red-500 transition-colors"
                                    >
                                        <X size={14} strokeWidth={3} />
                                    </button>
                                </div>
                            ))}
                            {formData.amenities.length === 0 && (
                                <p className="text-[10px] text-slate-200 italic font-bold uppercase tracking-widest py-2">No amenities listed yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Room Description</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full h-40 rounded-[2.5rem] border-2 border-slate-50 bg-slate-50/50 p-8 text-sm font-bold text-slate-900 outline-none focus:border-amber-500/30 focus:bg-white transition-all resize-none italic leading-relaxed tracking-wider placeholder:text-slate-200"
                            placeholder="Describe the room features and guest experience..."
                        />
                    </div>

                    <div className="space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4 font-bold">Room Image URL</label>
                        {formData.image && (
                            <div className="h-56 w-full rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-lg mb-4 relative group bg-slate-100">
                                <Image 
                                    src={formData.image} 
                                    alt="Preview" 
                                    fill
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />
                            </div>
                        )}
                        <input 
                            type="url" 
                            value={formData.image || ''}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full h-16 rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/50 px-8 text-sm font-bold text-slate-900 outline-none focus:border-amber-500/30 focus:bg-white transition-all italic tracking-wider placeholder:text-slate-200"
                            placeholder="https://images.unsplash.com/..."
                        />
                        <p className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.2em] ml-4 italic">Paste a direct image URL for the room preview.</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-12 flex gap-6">
                    <button 
                        onClick={onClose}
                        className="flex-1 h-18 rounded-[2rem] bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 hover:text-slate-900 transition-all shadow-sm active:scale-95"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onSave(formData)}
                        className="flex-1 h-20 rounded-[2.5rem] bg-amber-500 text-[11px] font-bold uppercase tracking-[0.4em] text-white shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-4"
                    >
                        Save Changes <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
