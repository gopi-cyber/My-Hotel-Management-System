'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, Room } from '@/lib/features/roomSlice';
import { fetchUserBookings, Booking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { Calendar, Search, Bookmark, Clock, User, Hotel, Download, AlertCircle, Home, Compass } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { items: rooms, status: roomsStatus } = useSelector((state: RootState) => state.rooms);
  const { items: myBookings, status: bookingsStatus } = useSelector((state: RootState) => state.bookings);
  const user = useSelector((state: RootState) => state.user.user);

  const [activeTab, setActiveTab] = useState('All');
  const [activeView, setActiveView] = useState<'home' | 'discover' | 'stays' | 'ledger'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    dispatch(fetchRooms());
    dispatch(fetchUserBookings(user.id));
  }, [dispatch, user, router]);

  const handleRoomAction = (room: Room) => {
    if (!checkInDate || !checkOutDate) {
      setError('Please select check-in and check-out dates first');
      return;
    }
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleBookConfirm = async () => {
    if (!selectedRoom || !user) return;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * selectedRoom.price;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedRoom.id,
          guestId: user.id,
          guestName: user.name || user.username,
          checkInDate,
          checkOutDate,
          totalPrice,
          nights,
          status: 'confirmed',
        }),
      });

      if (response.ok) {
        setSuccess('Booking confirmed successfully!');
        setIsModalOpen(false);
        await dispatch(fetchUserBookings(user.id));
        
        // Update room status
        await fetch('/api/rooms', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...selectedRoom,
            status: 'occupied',
          }),
        });
        await dispatch(fetchRooms());

        setTimeout(() => {
          setSuccess('');
          setCheckInDate('');
          setCheckOutDate('');
        }, 2000);
      } else {
        setError('Failed to create booking');
      }
    } catch {
      setError('An error occurred while booking');
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: bookingId,
          status: 'cancelled',
        }),
      });

      if (response.ok) {
        setSuccess('Booking cancelled successfully');
        await dispatch(fetchUserBookings(user!.id));
        setTimeout(() => setSuccess(''), 2000);
      }
    } catch {
      setError('Failed to cancel booking');
    }
  };

  const downloadInvoice = (booking: Booking) => {
    const invoiceContent = `
    ====================================
    HOTEL INVOICE
    ====================================
    Booking ID: ${booking.id}
    Guest: ${booking.guestName}
    Room: ${selectedRoom?.number || 'N/A'}
    ====================================
    Check-in: ${booking.checkInDate}
    Check-out: ${booking.checkOutDate}
    Nights: ${booking.nights}
    Rate: $${selectedRoom?.price || 0} per night
    ====================================
    TOTAL: $${booking.totalPrice}
    ====================================
    Status: ${booking.status}
    ====================================
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceContent));
    element.setAttribute('download', `invoice_${booking.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const allTypes = ['All', ...Array.from(new Set(rooms.map((r: Room) => r.type)))];

  const filteredRooms = rooms.filter((r: Room) => {
    const matchesTab = activeTab === 'All' || r.type === activeTab;
    const matchesSearch = r.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = r.status === 'available';
    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 text-slate-800 overflow-hidden font-sans">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-100/40 blur-[120px] pointer-events-none z-0" />

      {/* Glass Sidebar */}
      <aside className="z-20 w-72 glass-morphism border-r border-white/60 flex flex-col p-8 space-y-10 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Hotel className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 uppercase">GrandStay</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveView('home')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeView === 'home' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Home size={20} /> Home
          </button>
          <button 
            onClick={() => setActiveView('discover')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeView === 'discover' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Compass size={20} /> Discover Rooms
          </button>
          <button 
            onClick={() => setActiveView('stays')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeView === 'stays' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Bookmark size={20} /> My Stays ({myBookings.length})
          </button>
          <button 
            onClick={() => setActiveView('ledger')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeView === 'ledger' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Clock size={20} /> Ledger
          </button>
        </nav>

        <Link href="/profile">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30">
            <User size={20} /> My Profile & Services
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto">
        {error && (
          <div className="m-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
        {success && (
          <div className="m-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
            {success}
          </div>
        )}

        {/* HOME VIEW */}
        {activeView === 'home' && (
          <div className="p-10 space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-900">Welcome, {user?.name || user?.username}! 👋</h1>
              <p className="text-lg text-slate-600">Explore our premium rooms and book your next stay</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-morphism p-6 rounded-3xl border border-white/60 space-y-3">
                <Bookmark className="text-indigo-600" size={28} />
                <div className="text-3xl font-bold text-slate-900">{myBookings.length}</div>
                <p className="text-slate-600">Total Bookings</p>
              </div>
              <div className="glass-morphism p-6 rounded-3xl border border-white/60 space-y-3">
                <Hotel className="text-cyan-600" size={28} />
                <div className="text-3xl font-bold text-slate-900">{rooms.filter((r: Room) => r.status === 'available').length}</div>
                <p className="text-slate-600">Available Rooms</p>
              </div>
              <div className="glass-morphism p-6 rounded-3xl border border-white/60 space-y-3">
                <Calendar className="text-emerald-600" size={28} />
                <div className="text-3xl font-bold text-slate-900">
                  ${myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
                </div>
                <p className="text-slate-600">Total Spent</p>
              </div>
            </div>

            <div className="glass-morphism p-8 rounded-3xl border border-white/60 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Quick Book</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Check-in"
                />
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Check-out"
                />
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="px-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Guests"
                  min="1"
                />
                <button
                  onClick={() => setActiveView('discover')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30"
                >
                  <Search size={20} className="inline mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DISCOVER VIEW */}
        {activeView === 'discover' && (
          <div className="p-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-slate-900">Discover Our Rooms</h1>
              <p className="text-slate-600">Selected dates: {checkInDate || 'Not set'} to {checkOutDate || 'Not set'}</p>
            </div>

            {/* Room Type Filter */}
            <div className="flex gap-2 flex-wrap">
              {allTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    activeTab === type
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white/50 text-slate-600 hover:bg-white border border-white/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Rooms Grid */}
            {roomsStatus === 'loading' ? (
              <div className="text-center py-12 text-slate-600">Loading rooms...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room: Room) => (
                    <div key={room.id} className="glass-morphism rounded-2xl overflow-hidden border border-white/60 hover:shadow-xl transition-all">
                      <div className="bg-gradient-to-br from-indigo-400 to-cyan-400 h-40 flex items-center justify-center">
                        <Hotel className="text-white" size={40} />
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{room.type}</h3>
                            <p className="text-sm text-slate-600">Room #{room.number}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            Available
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-slate-600">Price per night</p>
                            <p className="text-2xl font-bold text-slate-900">${room.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">Capacity</p>
                            <p className="text-2xl font-bold text-slate-900">{room.capacity}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity: string, idx: number) => (
                            <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleRoomAction(room)}
                          className="w-full py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-slate-600">
                    No available rooms found for the selected dates
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STAYS VIEW */}
        {activeView === 'stays' && (
          <div className="p-10 space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

            {bookingsStatus === 'loading' ? (
              <div className="text-center py-12 text-slate-600">Loading bookings...</div>
            ) : myBookings.length > 0 ? (
              <div className="space-y-4">
                {myBookings.map((booking: Booking) => (
                  <div key={booking.id} className="glass-morphism p-6 rounded-2xl border border-white/60 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Booking #{booking.id}</h3>
                        <p className="text-sm text-slate-600">{booking.guestName}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'checked_in' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'checked_out' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Check-in</p>
                        <p className="font-semibold text-slate-900">{booking.checkInDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Check-out</p>
                        <p className="font-semibold text-slate-900">{booking.checkOutDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Nights</p>
                        <p className="font-semibold text-slate-900">{booking.nights}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Total</p>
                        <p className="font-semibold text-slate-900">${booking.totalPrice}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadInvoice(booking)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm font-semibold"
                      >
                        <Download size={16} /> Invoice
                      </button>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-semibold"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-600">
                You haven&apos;t made any bookings yet. Visit the Discover section to book a room!
              </div>
            )}
          </div>
        )}

        {/* LEDGER VIEW */}
        {activeView === 'ledger' && (
          <div className="p-10 space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">Billing Ledger</h1>

            <div className="glass-morphism p-8 rounded-2xl border border-white/60 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-900">{myBookings.length}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm">Active Bookings</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {myBookings.filter((b: Booking) => b.status === 'checked_in').length}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm">Total Amount</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    ${myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/30">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Booking ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Dates</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Nights</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {myBookings.map((booking: Booking) => (
                      <tr key={booking.id} className="bg-white/20 hover:bg-white/40 transition-all">
                        <td className="px-4 py-3 font-mono">{booking.id}</td>
                        <td className="px-4 py-3">{booking.checkInDate} to {booking.checkOutDate}</td>
                        <td className="px-4 py-3">{booking.nights}</td>
                        <td className="px-4 py-3 font-bold">${booking.totalPrice}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'checked_in' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Confirm Booking</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Room:</span>
                <span className="font-semibold">{selectedRoom.type} (#{selectedRoom.number})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Check-in:</span>
                <span className="font-semibold">{checkInDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Check-out:</span>
                <span className="font-semibold">{checkOutDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Price/Night:</span>
                <span className="font-semibold">${selectedRoom.price}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-indigo-600">
                  ${Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)) * selectedRoom.price}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-slate-900 font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBookConfirm}
                className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
