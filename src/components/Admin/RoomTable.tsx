import { Plus, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom, updateRoom, deleteRoom, Room } from '@/lib/features/roomSlice';
import { AppDispatch } from '@/lib/store';
import AdminRoomModal from './RoomModal';
import Image from 'next/image';

export default function AdminRoomTable({ rooms }: { rooms: Room[] }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleAdd = () => {
        setSelectedRoom(null);
        setIsModalOpen(true);
    };

    const handleEdit = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleDelete = (roomId: string) => {
        if (deleteConfirm === roomId) {
            dispatch(deleteRoom(roomId));
            setDeleteConfirm(null);
        } else {
            setDeleteConfirm(roomId);
        }
    };

    const handleSave = (roomData: Room) => {
        if (selectedRoom) {
            dispatch(updateRoom(roomData));
        } else {
            dispatch(addRoom(roomData));
        }
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Grand Inventory Header */}
            <div className="w-full h-48 rounded-[3rem] overflow-hidden mb-10 relative border-4 border-white shadow-[20px_20px_40px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-top-4 duration-500">
                <Image 
                    src="/images/inventory_header_grand.png" 
                    alt="Inventory Command Center" 
                    fill 
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-transparent" />
                <div className="absolute bottom-8 left-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mb-2 block">System Status: Optimal</span>
                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">Central Command</h2>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Vanguard Inventory</h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium italic">High-precision room management system.</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 active:scale-95"
                >
                    <Plus size={18} />
                    New Record
                </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-[2rem] border border-white bg-white/40 backdrop-blur-md shadow-[10px_10px_30px_#d1d9e6]">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-white">
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Visualization</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descriptor</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Operational Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Rate</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Settings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rooms.map((room) => (
                            <tr key={room.id} className="group hover:bg-white/60 transition-all cursor-pointer">
                                <td className="px-8 py-6">
                                    <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white shadow-sm group-hover:scale-110 transition-transform bg-slate-100 relative">
                                        {room.image ? (
                                            <Image 
                                                src={room.image} 
                                                alt={room.type} 
                                                fill
                                                className="h-full w-full object-cover" 
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-slate-300">
                                                <Settings size={20} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-slate-800 tracking-tight text-base">{room.type}</span>
                                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">ID: {room.id}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all ${
                                        room.status === 'available' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : 'bg-red-50 text-red-600 border-red-100'
                                    }`}>
                                        <div className={`h-1.5 w-1.5 rounded-full ${room.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />

                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold text-slate-900">₹{room.price}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">/nt</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEdit(room)}
                                            className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-[4px_4px_10px_#d1d9e6] flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all"
                                        >
                                            <Settings size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(room.id)}
                                            className={`h-10 px-4 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                                deleteConfirm === room.id 
                                                    ? 'bg-red-600 text-white shadow-lg' 
                                                    : 'bg-white border border-slate-100 shadow-[4px_4px_10px_#d1d9e6] text-slate-400 hover:text-red-500'
                                            }`}
                                        >
                                            <Trash2 size={16} />
                                            {deleteConfirm === room.id ? 'Confirm' : ''}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminRoomModal 
                key={selectedRoom?.id || 'new'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                room={selectedRoom || undefined}
            />
        </div>
    );
}
