'use client';
import { useState } from 'react';
import { User, Mail, X } from 'lucide-react';

import { Staff } from '@/lib/features/staffSlice';


interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: Omit<Staff, 'id'> | Staff) => void;
    staffMember?: Staff | null;
}

export default function StaffModal({ isOpen, onClose, onConfirm, staffMember }: StaffModalProps) {
    const [formData, setFormData] = useState({
        name: staffMember?.name || '',
        email: staffMember?.email || '',
        role: (staffMember?.role || 'Receptionist') as 'Receptionist' | 'Housekeeping' | 'Management',
        status: (staffMember?.status || 'Active') as 'Active' | 'On Leave' | 'Inactive',
        shift: (staffMember?.shift || 'Morning') as 'Morning' | 'Afternoon' | 'Night',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(staffMember ? { ...formData, id: staffMember.id } : formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl animate-in fade-in duration-500">
            <div className="absolute inset-0 bg-slate-950/80" onClick={onClose} />
            
            <div className="relative w-full max-w-xl bg-slate-900/60 backdrop-blur-3xl rounded-[3.5rem] border-4 border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                <div className="absolute top-[-10%] left-[-10%] h-64 w-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="p-10 border-b border-white/5 flex items-center justify-between relative">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase leading-none">
                            {staffMember ? 'Modify Identity' : 'Invite Identity'}<span className="text-amber-500">.</span>
                        </h2>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-2 italic">Personnel Credential Management</p>
                    </div>
                    <button onClick={onClose} className="h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/20 hover:text-red-500 transition-all shadow-xl">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-12 space-y-10 relative">
                    <div className="grid grid-cols-1 gap-10">
                        {/* Name Field */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-6">Full Name Identity</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <User size={20} className="text-white/10 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="ALEXANDER VANCE"
                                    className="w-full h-18 py-5 rounded-[2rem] border border-white/5 bg-slate-950/50 pl-16 pr-8 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all shadow-inner placeholder:text-white/5 italic"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-6">Digital Post Hub</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-white/10 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="VANCE@CORE.VORTEX.COM"
                                    className="w-full h-18 py-5 rounded-[2rem] border border-white/5 bg-slate-950/50 pl-16 pr-8 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all shadow-inner placeholder:text-white/5 italic"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-6">Sector Allocation</label>
                                <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value as 'Receptionist' | 'Housekeeping' | 'Management'})}
                                    className="w-full h-18 px-8 rounded-[2rem] border border-white/5 bg-slate-950/50 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all appearance-none cursor-pointer shadow-inner italic uppercase tracking-widest"
                                >
                                    <option value="Receptionist" className="bg-slate-900">Receptionist</option>
                                    <option value="Housekeeping" className="bg-slate-900">Housekeeping</option>
                                    <option value="Management" className="bg-slate-900">Management</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-6">Temporal Shift</label>
                                <select 
                                    value={formData.shift}
                                    onChange={(e) => setFormData({...formData, shift: e.target.value as 'Morning' | 'Afternoon' | 'Night'})}
                                    className="w-full h-18 px-8 rounded-[2rem] border border-white/5 bg-slate-950/50 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all appearance-none cursor-pointer shadow-inner italic uppercase tracking-widest"
                                >
                                    <option value="Morning" className="bg-slate-900">Morning</option>
                                    <option value="Afternoon" className="bg-slate-900">Afternoon</option>
                                    <option value="Night" className="bg-slate-900">Night</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-6">Telemetry Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'On Leave' | 'Inactive'})}
                                className="w-full h-18 px-8 rounded-[2rem] border border-white/5 bg-slate-950/50 text-sm font-black text-white outline-none focus:border-amber-500/30 transition-all appearance-none cursor-pointer shadow-inner italic uppercase tracking-widest"
                            >
                                <option value="Active" className="bg-slate-900">ACTIVE SYNC</option>
                                <option value="On Leave" className="bg-slate-900">ON LEAVE</option>
                                <option value="Inactive" className="bg-slate-900">INACTIVE</option>
                            </select>
                        </div>

                    </div>

                    <div className="pt-8 flex gap-6">
                        <button type="button" onClick={onClose} className="flex-1 h-18 rounded-[2rem] bg-slate-950 border border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.4em] hover:text-red-500 transition-all shadow-xl active:scale-95">
                            Abort
                        </button>
                        <button type="submit" className="flex-1 h-18 rounded-[2rem] bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all">
                            Initialize Sync
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
