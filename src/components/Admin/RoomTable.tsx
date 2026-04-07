'use client';
import { Plus, Edit, Trash, Settings } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRoom, addRoom, updateRoom } from '@/lib/features/roomSlice';
import { AppDispatch } from '@/lib/store';
import AdminRoomModal from './RoomModal';

interface Room {
    id: string;
    type: string;
    price: number;
    status: string;
    amenities?: string[];
}

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

    const handleSave = (roomData: any) => {
        if (selectedRoom) {
            dispatch(updateRoom(roomData));
        } else {
            dispatch(addRoom(roomData));
        }
        setIsModalOpen(false);
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
                <h3 className="text-xl font-bold italic tracking-tighter uppercase">Room <span className="text-blue-500">Management</span></h3>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                >
                    <Plus size={18} />
                    <span>Add Room</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Room Type</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Rate</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-white tracking-tight">{room.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                                        room.status === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                    }`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-300 font-bold">${room.price}/night</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => handleEdit(room)}
                                            className="text-slate-500 hover:text-blue-400 transition-colors"
                                            title="Quick Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(room)}
                                            className="text-slate-500 hover:text-indigo-400 transition-colors"
                                            title="Advanced Settings"
                                        >
                                            <Settings size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(room.id)}
                                            className={`flex items-center gap-2 rounded-lg px-2 py-1 transition-all ${
                                                deleteConfirm === room.id 
                                                    ? 'bg-red-500 text-white font-black text-[10px] uppercase shadow-lg shadow-red-500/30' 
                                                    : 'text-slate-500 hover:text-red-400'
                                            }`}
                                        >
                                            <Trash size={18} />
                                            {deleteConfirm === room.id && <span>Click again to CONFIRM</span>}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminRoomModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                room={selectedRoom}
            />
        </div>
    );
}
