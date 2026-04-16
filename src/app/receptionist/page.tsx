'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, Room } from '@/lib/features/roomSlice';
import { fetchBookings, updateBooking, Booking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { CheckCircle, DollarSign, Home, LogOut, Search, Calendar, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReceptionistPage() {
  const dispatch = useDispatch<AppDispatch>();
  const bookings = useSelector((state: RootState) => state.bookings.items);
  const rooms = useSelector((state: RootState) => state.rooms.items);
  
  const [activeTab, setActiveTab] = useState<'checkin' | 'billing' | 'rooms'>('checkin');
  const [searchQuery, setSearchQuery] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());
    document.title = 'Vortex Front Desk | Management';
  }, [dispatch]);

  const handleCheckIn = async (booking: Booking) => {
    await dispatch(updateBooking({ ...booking, status: 'checked_in' }));
    setSuccess(`${booking.guestName} checked in successfully.`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleCheckOut = async (booking: Booking) => {
    await dispatch(updateBooking({ ...booking, status: 'checked_out' }));
    setSuccess(`${booking.guestName} checked out successfully.`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const filteredBookings = bookings.filter((b) => 
    b.guestName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const occupiedRooms = rooms.filter((r: Room) => r.status === 'occupied').length;
  const availableRooms = rooms.filter((r: Room) => r.status === 'available').length;
  const totalRevenue = bookings.reduce((sum, b: Booking) => sum + (Number(b.totalPrice) || 0), 0);

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none z-0 animate-pulse delay-700" />

      {/* Professional Sidebar */}
      <aside className="z-20 w-80 glass-sidebar flex flex-col p-10 space-y-12 h-screen overflow-y-auto bg-white border-r border-slate-100 shadow-xl">
        <style jsx>{`
            .glass-sidebar {
                border-right: 1px solid rgba(0, 0, 0, 0.05);
            }
        `}</style>
        <Link href="/" className="flex items-center gap-4 px-2 group">
          <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
            <Users className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">Vortex</span>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Front Desk</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-3">
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest transition-all group ${
              activeTab === 'checkin' 
                ? 'bg-slate-50 text-amber-600 border border-slate-100 shadow-sm' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckCircle size={22} className={activeTab === 'checkin' ? 'text-amber-600' : 'text-slate-200 group-hover:text-slate-400'} /> Check-In Hub
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest transition-all group ${
              activeTab === 'billing' 
                ? 'bg-slate-50 text-amber-600 border border-slate-100 shadow-sm' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <DollarSign size={22} className={activeTab === 'billing' ? 'text-amber-600' : 'text-slate-200 group-hover:text-slate-400'} /> Billing Ledger
          </button>
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest transition-all group ${
              activeTab === 'rooms' 
                ? 'bg-slate-50 text-amber-600 border border-slate-100 shadow-sm' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Home size={22} className={activeTab === 'rooms' ? 'text-amber-600' : 'text-slate-200 group-hover:text-slate-400'} /> Room Inventory
          </button>
        </nav>

        <Link href="/">
          <button className="w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] bg-slate-50 text-slate-400 font-bold text-[11px] uppercase tracking-widest hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100 active:scale-95">
            <LogOut size={22} /> Exit Portal
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto p-12 bg-slate-950/20">
        <AnimatePresence mode="wait">
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 p-6 bg-amber-500/10 border-2 border-amber-500/20 rounded-[2rem] text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] italic shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          >
             {success}
          </motion.div>
        )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Available Rooms', value: availableRooms, icon: Home, color: 'text-amber-500' },
            { label: 'Occupied Rooms', value: occupiedRooms, icon: Users, color: 'text-blue-500' },
            { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-amber-500' },
            { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: TrendingUp, color: 'text-blue-500' }
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-lg transition-all hover:translate-y-[-8px]"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:border-amber-500 transition-all shadow-sm">
                  <stat.icon size={22} className={stat.color} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Content Display */}
        {activeTab === 'checkin' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase leading-none">Arrival Management</h2>
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <div className="relative mb-8 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-amber-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search guest name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-slate-900 uppercase tracking-widest placeholder:text-slate-200"
                />
              </div>
              <div className="space-y-6">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="bg-slate-950/40 p-10 rounded-[2.5rem] flex justify-between items-center hover:bg-slate-900 hover:border-amber-500/30 transition-all border-2 border-white/5 group shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Users size={100} className="rotate-12" />
                    </div>
                    <div className="relative z-10 space-y-2">
                      <p className="font-bold text-slate-900 text-2xl tracking-tight uppercase leading-none group-hover:text-amber-500 transition-colors">{b.guestName}</p>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 leading-none">Stay Duration: {b.checkInDate} to {b.checkOutDate}</p>
                    </div>
                    <div className="flex gap-6 relative z-10">
                      {b.status === 'confirmed' && (
                        <button 
                          onClick={() => handleCheckIn(b)} 
                          className="h-16 px-12 bg-amber-500 text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] italic hover:bg-amber-400 shadow-[0_15px_40px_rgba(245,158,11,0.2)] active:scale-95 transition-all"
                        >
                          Initialize
                        </button>
                      )}
                      {b.status === 'checked_in' && (
                        <button 
                          onClick={() => handleCheckOut(b)} 
                          className="h-16 px-12 bg-slate-900 text-amber-500 border-2 border-amber-500/30 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] italic hover:bg-amber-500 hover:text-slate-950 active:scale-95 transition-all shadow-2xl"
                        >
                          _Terminate
                        </button>
                      )}
                      {(b.status !== 'confirmed' && b.status !== 'checked_in') && (
                        <span className="h-16 px-12 flex items-center bg-slate-950 text-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] italic border-2 border-white/5 opacity-50">
                          {b.status.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase leading-none">Payments & Billing</h2>
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm overflow-x-auto">
              <table className="w-full text-[10px] font-bold text-slate-400">
                <thead>
                  <tr className="bg-slate-50 uppercase tracking-widest text-slate-300">
                    <th className="px-10 py-6 text-left border-b border-slate-100">Guest Name</th>
                    <th className="px-10 py-6 text-left border-b border-slate-100">Check In</th>
                    <th className="px-10 py-6 text-left border-b border-slate-100">Check Out</th>
                    <th className="px-10 py-6 text-left border-b border-slate-100">Total Price</th>
                    <th className="px-10 py-6 text-left border-b border-slate-100">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-white/5">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-10 py-8 font-bold text-slate-900 text-lg uppercase tracking-tight group-hover:text-amber-600">{b.guestName}</td>
                      <td className="px-10 py-8 tracking-widest">{b.checkInDate}</td>
                      <td className="px-10 py-8 tracking-widest">{b.checkOutDate}</td>
                      <td className="px-10 py-8 font-bold text-amber-600 text-2xl tracking-tight">₹{b.totalPrice}</td>
                      <td className="px-10 py-8">
                        <span className={`px-6 py-2.5 rounded-[1.5rem] text-[9px] font-bold uppercase tracking-widest shadow-sm ${
                          b.status === 'checked_in' ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Room Status Tab */}
        {activeTab === 'rooms' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase leading-none">Room Inventory Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {rooms.map((r: Room) => (
                <motion.div 
                  key={r.id} 
                  whileHover={{ y: -10 }}
                  className={`p-10 rounded-[3rem] border-2 transition-all group relative overflow-hidden shadow-sm ${
                    r.status === 'available' 
                      ? 'bg-white border-slate-100 hover:border-amber-500/30 hover:shadow-xl' 
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <p className="font-bold text-slate-900 text-2xl tracking-tight group-hover:text-amber-600 transition-colors uppercase leading-none">{r.type}</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-3 leading-none">ID: {r.id.slice(-4).toUpperCase()}</p>
                  
                  <div className="mt-8 flex items-end gap-2 border-t border-slate-100 pt-6">
                    <p className="text-3xl font-bold text-slate-900 tracking-tight leading-none">₹{r.price}</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase mb-1 tracking-widest">/ Night</p>
                  </div>
                  
                  <span className={`inline-flex mt-8 px-6 py-2.5 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                    r.status === 'available' 
                      ? 'bg-amber-100 text-amber-600' 
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {r.status === 'available' ? 'Available' : 'Occupied'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
