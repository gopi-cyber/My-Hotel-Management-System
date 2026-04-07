'use client';
import { FileText, Edit, Trash, Calendar } from 'lucide-react';

interface Booking {
    id: string;
    roomId: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    status: string;
}

export default function AdminReservationTable({ bookings }: { bookings: Booking[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                    <Calendar className="text-blue-500" size={24} />
                    <h3 className="text-xl font-bold">Reservation Overview</h3>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Guest</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Dates</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Room</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{booking.guestName}</td>
                                <td className="px-6 py-4 text-slate-300">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-500">IN: {booking.checkIn}</span>
                                        <span className="text-[10px] font-bold text-slate-500">OUT: {booking.checkOut}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                                        booking.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-400' :
                                        booking.status === 'CheckedIn' ? 'bg-emerald-500/10 text-emerald-400' :
                                        'bg-slate-500/10 text-slate-400'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400">Room {booking.roomId}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                                            <Trash size={18} />
                                        </button>
                                        <button className="text-slate-400 hover:text-indigo-400 transition-colors">
                                            <FileText size={18} />
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
