import { Plus, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom, updateRoom, deleteRoom, Room } from '@/lib/features/roomSlice';
import { AppDispatch } from '@/lib/store';
import AdminRoomModal from './RoomModal';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
            {/* Inventory Control Hub Header */}
            <div className="w-full h-48 rounded-[3rem] overflow-hidden mb-10 relative border-4 border-white/5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 bg-slate-900">
                <style jsx>{`
                    .vortex-container {
                        background-image: radial-gradient(circle at center, #f59e0b 1px, transparent 1px);
                        background-size: 40px 40px;
                    }
                `}</style>
                <div className="absolute inset-0">
                    <div className="vortex-container opacity-20 h-full w-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute bottom-8 left-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/60 mb-2 block uppercase">Property Presence</span>
                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">Inventory <span className="text-amber-500">Control</span></h2>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Room Management</h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium italic">Overseer dashboard for all property accommodations.</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-3 rounded-2xl bg-amber-500 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(245,158,11,0.2)] transition-all hover:bg-amber-400 active:scale-95 shadow-xl"
                >
                    <Plus size={18} />
                    Add New Room
                </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-[2rem] border border-slate-100 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Room Preview</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Room Highlights</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Live Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Settings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {rooms.map((room, idx) => (
                            <motion.tr 
                                key={room.id} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group hover:bg-slate-50/50 transition-all cursor-pointer"
                            >
                                <td className="px-8 py-6">
                                    <div className="h-16 w-16 rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-110 transition-transform bg-slate-50 relative">
                                        {room.image ? (
                                            <Image 
                                                src={room.image} 
                                                alt={room.type} 
                                                fill
                                                sizes="64px"
                                                className="h-full w-full object-cover transition-opacity" 
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-slate-200">
                                                <Settings size={20} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-slate-900 tracking-tight text-base group-hover:text-amber-500 transition-colors uppercase">{room.type}</span>
                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Ref: {room.id.slice(0, 8).toUpperCase()}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all ${
                                        room.status === 'available' 
                                            ? 'bg-green-50 text-green-600 border-green-100' 
                                            : room.status === 'occupied'
                                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                                            : 'bg-red-50 text-red-600 border-red-100'
                                    }`}>
                                        <div className={`h-1.5 w-1.5 rounded-full ${room.status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                        {room.status === 'available' ? 'Available' : room.status === 'occupied' ? 'Sold Out' : room.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold text-slate-900">₹{room.price}</span>
                                        <span className="text-[10px] font-bold text-slate-300 uppercase">/night</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                        <button 
                                            onClick={() => handleEdit(room)}
                                            className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-amber-500 hover:border-amber-500/30 transition-all shadow-sm"
                                        >
                                            <Settings size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(room.id)}
                                            className={`h-10 px-4 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                                deleteConfirm === room.id 
                                                    ? 'bg-red-500 text-white shadow-lg' 
                                                    : 'bg-white border border-slate-100 text-slate-300 hover:text-red-500'
                                            }`}
                                        >
                                            <Trash2 size={16} />
                                            {deleteConfirm === room.id ? 'Confirm' : ''}
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
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
