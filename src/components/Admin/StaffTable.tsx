import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { addStaff, updateStaff, deleteStaff, Staff } from '@/lib/features/staffSlice';
import StaffModal from './StaffModal';
import { motion } from 'framer-motion';



export default function AdminStaffTable({ staff }: { staff: Staff[] }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    const handleInvite = () => {
        setSelectedStaff(null);
        setIsModalOpen(true);
    };

    const handleEdit = (member: Staff) => {
        setSelectedStaff(member);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this identity from the core?')) {
            dispatch(deleteStaff(id));
        }
    };

    const handleConfirm = (data: Omit<Staff, 'id'> | Staff) => {
        if (selectedStaff) {
            dispatch(updateStaff(data as Staff));
        } else {
            dispatch(addStaff(data as Omit<Staff, 'id'>));
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Staff Directory</h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium italic">Active staff credentials and shift status.</p>
                </div>
                <button 
                    onClick={handleInvite}
                    className="flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-amber-400 active:scale-95"
                >
                    <Plus size={18} />
                    Add Staff Member
                </button>
            </div>

            <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Staff Profile</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Department</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {staff.map((member, idx) => (
                            <motion.tr 
                                key={member.id} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                            >
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                            <User size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 tracking-tight text-lg uppercase">{member.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{member.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-sm">{member.role}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-[10px] font-bold uppercase tracking-widest border ${
                                        member.status === 'Active' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        <div className={`h-2 w-2 rounded-full ${member.status === 'Active' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                        <button 
                                            onClick={() => handleEdit(member)}
                                            className="h-11 w-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/30 transition-all active:scale-90"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(member.id)}
                                            className="h-11 w-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-90"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <StaffModal 
                key={selectedStaff?.id || 'new'}
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirm}
                staffMember={selectedStaff}
            />
        </div>
    );
}
