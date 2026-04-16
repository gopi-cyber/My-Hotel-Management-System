import { useState } from 'react';
import { ArrowRight, User, Calendar, Eye } from 'lucide-react';
import ReservationDetailModal from './ReservationDetailModal';
import { motion } from 'framer-motion';

interface Booking {
    id: string;
    guestName: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
}

export default function AdminReservationTable({ bookings }: { bookings: Booking[] }) {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenDetail = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Guest Records</h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium italic">Confirmed arrivals and reservation details.</p>
                </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Guest Name</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dates</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Ref ID</th>
                            <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {bookings.map((booking, idx) => (
                            <motion.tr 
                                key={booking.id} 
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
                                            <span className="font-bold text-slate-900 tracking-tight text-lg uppercase">{booking.guestName}</span>
                                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-1">Room ID: {booking.roomId}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 shadow-sm">
                                        <Calendar size={14} className="text-slate-400" />
                                        {booking.checkInDate} <ArrowRight size={12} className="text-amber-500/40" /> {booking.checkOutDate}
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-[10px] font-bold uppercase tracking-widest border ${
                                        booking.status === 'Confirmed' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                        booking.status === 'CheckedIn' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                        'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        <div className={`h-2 w-2 rounded-full ${booking.status === 'CheckedIn' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
                                        {booking.status === 'CheckedIn' ? 'In House' : booking.status}
                                    </span>
                                </td>
                                <td className="px-10 py-8 text-center">
                                    <span className="text-[10px] font-bold text-slate-300 tracking-[0.2em]">#{booking.id.slice(0, 8).toUpperCase()}</span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <button 
                                        onClick={() => handleOpenDetail(booking)}
                                        className="h-12 w-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/30 transition-all group/btn active:scale-90"
                                        title="View Details"
                                    >
                                        <Eye size={20} className="group-hover/btn:scale-110 transition-transform" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ReservationDetailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                booking={selectedBooking} 
            />
        </div>
    );
}
