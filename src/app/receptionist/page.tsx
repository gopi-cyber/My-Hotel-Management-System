'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, Room } from '@/lib/features/roomSlice';
import { fetchBookings, updateBooking, Booking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { CheckCircle, DollarSign, Home, LogOut, Search, Calendar, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
  }, [dispatch]);

  const handleCheckIn = async (booking: Booking) => {
    await dispatch(updateBooking({ ...booking, status: 'checked_in' }));
    setSuccess(`${booking.guestName} checked in successfully!`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleCheckOut = async (booking: Booking) => {
    await dispatch(updateBooking({ ...booking, status: 'checked_out' }));
    setSuccess(`${booking.guestName} checked out successfully!`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const filteredBookings = bookings.filter((b) => 
    b.guestName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const occupiedRooms = rooms.filter((r: Room) => r.status === 'occupied').length;
  const availableRooms = rooms.filter((r: Room) => r.status === 'available').length;
  const totalRevenue = bookings.reduce((sum, b: Booking) => sum + (Number(b.totalPrice) || 0), 0);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 text-emerald-900 overflow-hidden">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-emerald-100/40 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-amber-100/40 blur-[130px] pointer-events-none z-0" />

      {/* Professional Sidebar */}
      <aside className="z-20 w-64 glass-morphism border-r border-emerald-100/50 flex flex-col p-8 space-y-10 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-10 rounded-2xl bg-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Users className="text-white" size={20} />
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-950">RECEPTIONIST</span>
            <p className="text-xs text-emerald-700/60 uppercase tracking-widest font-bold">Front Desk</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'checkin' 
                ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' 
                : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <CheckCircle size={20} /> Check-in/Out
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'billing' 
                ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' 
                : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <DollarSign size={20} /> Billing
          </button>
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'rooms' 
                ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' 
                : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Home size={20} /> Room Status
          </button>
        </nav>

        <Link href="/">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20">
            <LogOut size={20} /> Logout
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto p-10">
        {success && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 font-bold shadow-sm animate-in fade-in slide-in-from-top-2">
            ✓ {success}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest">Available Rooms</p>
                <p className="text-3xl font-black text-emerald-950">{availableRooms}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Home className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest">Occupied Rooms</p>
                <p className="text-3xl font-black text-emerald-950">{occupiedRooms}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                <Users className="text-amber-600" size={24} />
              </div>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest">Total Bookings</p>
                <p className="text-3xl font-black text-emerald-950">{bookings.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Calendar className="text-emerald-500" size={24} />
              </div>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest">Total Revenue</p>
                <p className="text-3xl font-black text-emerald-950">₹{totalRevenue}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="text-amber-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Check-in/Out Tab */}
        {activeTab === 'checkin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Front Desk Operations</h2>
            <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/60 shadow-sm">
              <div className="relative mb-8">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Search guest registry..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/40 border border-emerald-100 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all text-sm font-bold text-emerald-900 shadow-inner"
                />
              </div>
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="bg-white/60 p-6 rounded-2xl flex justify-between items-center hover:shadow-md hover:translate-x-1 transition-all border border-emerald-50">
                    <div>
                      <p className="font-black text-emerald-950">{b.guestName}</p>
                      <p className="text-xs font-bold text-emerald-700/60 uppercase tracking-tight mt-1">{b.checkInDate} — {b.checkOutDate}</p>
                    </div>
                    <div className="flex gap-3">
                      {b.status === 'confirmed' && (
                        <button 
                          onClick={() => handleCheckIn(b)} 
                          className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                        >
                          Check-in
                        </button>
                      )}
                      {b.status === 'checked_in' && (
                        <button 
                          onClick={() => handleCheckOut(b)} 
                          className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-700 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                        >
                          Check-out
                        </button>
                      )}
                      {(b.status !== 'confirmed' && b.status !== 'checked_in') && (
                        <span className="px-6 py-2.5 bg-emerald-50 text-emerald-800/40 rounded-xl font-bold text-xs uppercase tracking-widest border border-emerald-100">
                          {b.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Ledger & Billing</h2>
            <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/60 shadow-sm overflow-x-auto">
              <table className="w-full text-xs font-bold text-emerald-900">
                <thead className="bg-emerald-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/50">Guest Identification</th>
                    <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/50">Inbound</th>
                    <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/50">Outbound</th>
                    <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/50">Total Capital</th>
                    <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/50">Operational Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-6 py-5 font-black text-emerald-950">{b.guestName}</td>
                      <td className="px-6 py-5">{b.checkInDate}</td>
                      <td className="px-6 py-5">{b.checkOutDate}</td>
                      <td className="px-6 py-5 font-black text-emerald-700">₹{b.totalPrice}</td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          b.status === 'checked_in' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Room Status Tab */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Inventory Telemetry</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rooms.map((r: Room) => (
                <div 
                  key={r.id} 
                  className={`p-6 rounded-[2rem] border-2 transition-all group hover:-translate-y-1 ${
                    r.status === 'available' 
                      ? 'bg-emerald-50/50 border-emerald-100 hover:bg-white hover:border-emerald-300 hover:shadow-xl' 
                      : 'bg-amber-50/50 border-amber-100 hover:bg-white hover:border-amber-300 hover:shadow-xl'
                  }`}
                >
                  <p className="font-black text-emerald-950 text-lg group-hover:text-emerald-700 transition-colors">{r.type}</p>
                  <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest mt-1">Registry ID #{r.id.slice(-4).toUpperCase()}</p>
                  <p className="text-xl font-black text-emerald-900 mt-4 italic">₹{r.price}<span className="text-[10px] font-bold text-emerald-400 uppercase not-italic">/nt</span></p>
                  <span className={`inline-flex mt-4 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    r.status === 'available' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {r.status === 'available' ? 'Available' : 'Occupied'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
