'use client';
import { Plus, Edit, Trash, Settings } from 'lucide-react';

interface Room {
    id: string;
    type: string;
    price: number;
    status: string;
}

export default function AdminRoomTable({ rooms }: { rooms: Room[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
                <h3 className="text-xl font-bold">Room Management</h3>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-500">
                    <Plus size={18} />
                    <span>Add Room</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{room.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold leading-5 ${
                                        room.status === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                    }`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-300 font-medium">${room.price}/night</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                                            <Trash size={18} />
                                        </button>
                                        <button className="text-slate-400 hover:text-slate-200 transition-colors">
                                            <Settings size={18} />
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
