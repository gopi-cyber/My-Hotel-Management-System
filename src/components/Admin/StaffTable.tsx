import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { addStaff, updateStaff, deleteStaff, Staff } from '@/lib/features/staffSlice';
import StaffModal from './StaffModal';


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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personnel Log</h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium italic">Active staff credentials and shift status.</p>
                </div>
                <button 
                    onClick={handleInvite}
                    className="flex items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 active:scale-95"
                >
                    <Plus size={18} />
                    Invite Identity
                </button>
            </div>

            <div className="flex-1 overflow-hidden rounded-[2rem] border border-white bg-white/40 backdrop-blur-md shadow-[10px_10px_30px_#d1d9e6]">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-white">
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identify</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sector / Role</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telemetry</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {staff.map((member) => (
                            <tr key={member.id} className="group hover:bg-white/60 transition-all">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-[4px_4px_10px_#d1d9e6] border border-slate-100 flex items-center justify-center text-indigo-600">
                                            <User size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-extrabold text-slate-800 tracking-tight">{member.name}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{member.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight bg-slate-100 px-3 py-1 rounded-lg border border-white">{member.role}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border ${
                                        member.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                    }`}>
                                        <div className={`h-1.5 w-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEdit(member)}
                                            className="h-9 w-9 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(member.id)}
                                            className="h-9 w-9 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
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
