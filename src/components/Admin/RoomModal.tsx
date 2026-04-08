'use client';
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="grid grid-rows-[auto_1fr_auto] w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-8 pb-4 border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">
                            {room ? 'Advanced Settings' : 'Add Room'}
                        </h3>
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-all cursor-pointer p-2">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Area - Scrollable */}
                <div className="overflow-y-auto p-8 min-h-0 custom-scrollbar">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Room Type</label>
                            <input 
                                type="text" 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500/50"
                                placeholder="e.g. Deluxe Ocean View"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Price ($)</label>
                                <input 
                                    type="number" 
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Floor</label>
                                <input 
                                    type="number" 
                                    value={formData.floor}
                                    onChange={(e) => setFormData({...formData, floor: Number(e.target.value)})}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
                            >
                                <option value="Available" className="bg-slate-900">Available</option>
                                <option value="Occupied" className="bg-slate-900">Occupied</option>
                                <option value="Maintenance" className="bg-slate-900">Maintenance</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Amenities (Comma separated)</label>
                            <input 
                                type="text" 
                                value={formData.amenities?.join(', ')}
                                onChange={(e) => setFormData({...formData, amenities: e.target.value.split(',').map(s => s.trim())})}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500/50"
                                placeholder="WiFi, Mini Bar, Ocean View"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Description</label>
                            <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500/50 h-32 resize-none"
                                placeholder="Describe the room experience..."
                            />
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="p-8 border-t border-white/10 bg-slate-900 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                    <div className="flex gap-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                        >
                            Close
                        </button>
                        <button 
                            type="button"
                            onClick={() => onSave(formData)}
                            className="flex-[2] flex items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
                        >
                            <Save size={18} />
                            <span>Save Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}




