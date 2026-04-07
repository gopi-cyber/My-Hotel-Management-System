'use client';
import { Plus, Edit, Trash, ShieldCheck } from 'lucide-react';

interface Staff {
    id: string;
    name: string;
    role: string;
    status: string;
    email: string;
}

export default function AdminStaffTable({ staff }: { staff: Staff[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-blue-500" size={24} />
                    <h3 className="text-xl font-bold">Staff Management</h3>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-emerald-500">
                    <Plus size={18} />
                    <span>Invite Staff</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {staff.map((member) => (
                            <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{member.name}</td>
                                <td className="px-6 py-4 text-slate-300">{member.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                                        member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                                    }`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 italic">{member.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
