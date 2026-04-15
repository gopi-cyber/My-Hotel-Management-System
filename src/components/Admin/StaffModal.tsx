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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                            {staffMember ? 'Modify Identity' : 'Invite Identity'}
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Personnel Credential Management</p>
                    </div>
                    <button onClick={onClose} className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 gap-8">
                        {/* Name Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                    <User size={18} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g. Alexander Vance"
                                    className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50/50 pl-14 pr-6 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500/20 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Digital Post</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="vance@grandstay.com"
                                    className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50/50 pl-14 pr-6 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500/20 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Sector</label>
                                <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value as 'Receptionist' | 'Housekeeping' | 'Management'})}
                                    className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Receptionist">Receptionist</option>
                                    <option value="Housekeeping">Housekeeping</option>
                                    <option value="Management">Management</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Shift</label>
                                <select 
                                    value={formData.shift}
                                    onChange={(e) => setFormData({...formData, shift: e.target.value as 'Morning' | 'Afternoon' | 'Night'})}
                                    className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                    <option value="Night">Night</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Telemetry Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'On Leave' | 'Inactive'})}
                                className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full h-16 rounded-2xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all">
                            Initialize Credentials
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
