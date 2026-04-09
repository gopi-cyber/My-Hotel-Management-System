import { useState } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight, User, Calendar, Eye } from 'lucide-react';
import ReservationDetailModal from './ReservationDetailModal';

interface Booking {
    id: string;
    guestName: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Access Log</h3>
                    <p className="text-[12px] text-slate-400 mt-1 font-medium italic">Confirmed arrivals and neural reservation telemetry.</p>
                </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-[2rem] border border-white bg-white/40 backdrop-blur-md shadow-[10px_10px_30px_#d1d9e6]">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-white">
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Identity</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operational Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Reference</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="group hover:bg-white/60 transition-all">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-[4px_4px_10px_#d1d9e6] border border-slate-100 flex items-center justify-center text-indigo-600">
                                            <User size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-extrabold text-slate-800 tracking-tight">{booking.guestName}</span>
                                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest italic">Room ID: {booking.roomId}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3 text-slate-600 font-bold text-xs uppercase tracking-tighter bg-white/50 px-3 py-2 rounded-xl border border-white shadow-sm">
                                        <Calendar size={14} className="text-slate-400" />
                                        {booking.checkIn} <ArrowRight size={10} className="text-indigo-400" /> {booking.checkOut}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border ${
                                        booking.status === 'Confirmed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                        booking.status === 'CheckedIn' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        <div className={`h-1.5 w-1.5 rounded-full ${booking.status === 'CheckedIn' ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-400'}`} />
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-white">#{booking.id.slice(0, 8)}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button 
                                        onClick={() => handleOpenDetail(booking)}
                                        className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all group/btn"
                                        title="View Details"
                                    >
                                        <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
                                    </button>
                                </td>
                            </tr>
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
