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
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 text-slate-800 overflow-hidden">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-100/40 blur-[120px] pointer-events-none z-0" />

      {/* Professional Sidebar */}
      <aside className="z-20 w-64 glass-morphism border-r border-white/60 flex flex-col p-8 space-y-10 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-10 rounded-2xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Users className="text-white" size={20} />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900">RECEPTIONIST</span>
            <p className="text-xs text-slate-500">Front Desk</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'checkin' 
                ? 'bg-white shadow-lg text-cyan-600' 
                : 'text-slate-400 hover:text-cyan-600 hover:bg-white/50'
            }`}
          >
            <CheckCircle size={20} /> Check-in/Out
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'billing' 
                ? 'bg-white shadow-lg text-cyan-600' 
                : 'text-slate-400 hover:text-cyan-600 hover:bg-white/50'
            }`}
          >
            <DollarSign size={20} /> Billing
          </button>
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'rooms' 
                ? 'bg-white shadow-lg text-cyan-600' 
                : 'text-slate-400 hover:text-cyan-600 hover:bg-white/50'
            }`}
          >
            <Home size={20} /> Room Status
          </button>
        </nav>

        <Link href="/">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto p-10">
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 font-semibold">
            ✓ {success}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-morphism p-6 rounded-2xl border border-white/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Available Rooms</p>
                <p className="text-3xl font-bold text-slate-900">{availableRooms}</p>
              </div>
              <Home className="text-green-500" size={32} />
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-2xl border border-white/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Occupied Rooms</p>
                <p className="text-3xl font-bold text-slate-900">{occupiedRooms}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-2xl border border-white/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Bookings</p>
                <p className="text-3xl font-bold text-slate-900">{bookings.length}</p>
              </div>
              <Calendar className="text-cyan-500" size={32} />
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-2xl border border-white/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900">₹{totalRevenue}</p>
              </div>
              <TrendingUp className="text-emerald-500" size={32} />
            </div>
          </div>
        </div>

        {/* Check-in/Out Tab */}
        {activeTab === 'checkin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Check-in / Check-out Management</h2>
            <div className="glass-morphism p-6 rounded-2xl border border-white/60">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search guests..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="bg-white/40 p-5 rounded-xl flex justify-between items-center hover:bg-white/60 transition-all">
                    <div>
                      <p className="font-bold text-slate-900">{b.guestName}</p>
                      <p className="text-sm text-slate-600">{b.checkInDate} → {b.checkOutDate}</p>
                    </div>
                    <div className="flex gap-3">
                      {b.status === 'confirmed' && (
                        <button 
                          onClick={() => handleCheckIn(b)} 
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                        >
                          Check-in
                        </button>
                      )}
                      {b.status === 'checked_in' && (
                        <button 
                          onClick={() => handleCheckOut(b)} 
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                        >
                          Check-out
                        </button>
                      )}
                      {(b.status !== 'confirmed' && b.status !== 'checked_in') && (
                        <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold">
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
            <h2 className="text-2xl font-bold text-slate-900">Guest Billing</h2>
            <div className="glass-morphism p-6 rounded-2xl border border-white/60 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-slate-700 font-bold">Guest Name</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-bold">Check-in Date</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-bold">Check-out Date</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-bold">Amount</th>
                    <th className="px-6 py-3 text-left text-slate-700 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="bg-white/20 hover:bg-white/40 border-t border-white/40">
                      <td className="px-6 py-4">{b.guestName}</td>
                      <td className="px-6 py-4">{b.checkInDate}</td>
                      <td className="px-6 py-4">{b.checkOutDate}</td>
                      <td className="px-6 py-4 font-bold text-emerald-700">₹{b.totalPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          b.status === 'checked_in' ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-800'
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
            <h2 className="text-2xl font-bold text-slate-900">Room Status Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rooms.map((r: Room) => (
                <div 
                  key={r.id} 
                  className={`p-5 rounded-xl border-2 transition-all ${
                    r.status === 'available' 
                      ? 'bg-green-50 border-green-200 hover:shadow-lg' 
                      : 'bg-red-50 border-red-200 hover:shadow-lg'
                  }`}
                >
                  <p className="font-bold text-slate-900">{r.type}</p>
                  <p className="text-sm text-slate-600">ID #{r.id.slice(-4)}</p>
                  <p className="text-sm font-semibold text-slate-700 mt-2">₹{r.price}/night</p>
                  <span className={`inline-block mt-3 px-3 py-1 rounded-lg text-xs font-bold ${
                    r.status === 'available' 
                      ? 'bg-green-200 text-green-900' 
                      : 'bg-red-200 text-red-900'
                  }`}>
                    {r.status === 'available' ? '✓ Available' : '✗ Occupied'}
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
