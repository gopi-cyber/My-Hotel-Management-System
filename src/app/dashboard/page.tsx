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
    <main className="flex min-h-screen bg-emerald-50/10 text-emerald-950 overflow-hidden font-sans relative">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-amber-100/40 blur-[120px] pointer-events-none z-0" />

      {/* Glass Sidebar */}
      <aside className="z-20 w-72 glass-morphism border-r border-emerald-100/50 flex flex-col p-8 space-y-10 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-10 rounded-2xl bg-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Hotel className="text-white" size={20} />
          </div>
          <div>
            <span className="text-lg font-black tracking-tighter text-emerald-950 block leading-none">GrandStay</span>
            <span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest mt-1 block">Guest Portal</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveView('home')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
              activeView === 'home' ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Home size={20} className={activeView === 'home' ? 'text-emerald-700' : 'text-emerald-300'} /> Home
          </button>
          <button 
            onClick={() => setActiveView('discover')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
              activeView === 'discover' ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Compass size={20} className={activeView === 'discover' ? 'text-emerald-700' : 'text-emerald-300'} /> Discover Rooms
          </button>
          <button 
            onClick={() => setActiveView('stays')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
              activeView === 'stays' ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Bookmark size={20} className={activeView === 'stays' ? 'text-emerald-700' : 'text-emerald-300'} /> My Stays ({myBookings.length})
          </button>
          <button 
            onClick={() => setActiveView('ledger')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
              activeView === 'ledger' ? 'bg-white shadow-lg text-emerald-700 border border-emerald-50' : 'text-emerald-800/40 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Clock size={20} className={activeView === 'ledger' ? 'text-emerald-700' : 'text-emerald-300'} /> Ledger
          </button>
        </nav>

        <Link href="/profile">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            <User size={18} /> Profile & Services
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto">
        {error && (
          <div className="m-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-bold uppercase tracking-widest shadow-sm animate-pulse">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        {success && (
          <div className="m-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-xs font-bold uppercase tracking-widest shadow-sm">
            ✓ {success}
          </div>
        )}

        {/* HOME VIEW */}
        {activeView === 'home' && (
          <div className="p-10 space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-emerald-950 tracking-tighter italic leading-none">Welcome, {user?.name || user?.username}! 👋</h1>
              <p className="text-xs font-bold text-emerald-800/40 uppercase tracking-[0.3em] mt-2 italic">A premium environment awaits your indulgence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-white hover:shadow-xl transition-all group">
                <Bookmark className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-4xl font-black text-emerald-950 italic">{myBookings.length}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30 mt-2">Active Registry</p>
              </div>
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-white hover:shadow-xl transition-all group">
                <Hotel className="text-amber-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-4xl font-black text-emerald-950 italic">{rooms.filter((r: Room) => r.status === 'available').length}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30 mt-2">Open Suites</p>
              </div>
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-white hover:shadow-xl transition-all group">
                <Calendar className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-4xl font-black text-emerald-950 italic">
                  ₹{myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30 mt-2">Capital Investment</p>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-2 border-white space-y-8 shadow-2xl">
              <h2 className="text-2xl font-black text-emerald-950 tracking-tight italic uppercase">Expedited Reservation <span className="text-amber-500 not-italic">_</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-800/40 ml-4">Inbound Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/40 border border-emerald-50 focus:outline-none focus:bg-white transition-all text-sm font-bold text-emerald-950 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-800/40 ml-4">Outbound Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/40 border border-emerald-50 focus:outline-none focus:bg-white transition-all text-sm font-bold text-emerald-950 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-800/40 ml-4">Guest Count</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-6 py-4 rounded-2xl bg-white/40 border border-emerald-50 focus:outline-none focus:bg-white transition-all text-sm font-bold text-emerald-950 shadow-inner"
                    min="1"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setActiveView('discover')}
                    className="w-full h-14 rounded-2xl bg-emerald-700 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Search size={18} /> Initiate Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DISCOVER VIEW */}
        {activeView === 'discover' && (
          <div className="p-10 space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-black text-emerald-950 tracking-tighter italic">Discovery Console</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/40 italic">Registry synchronization spanning {checkInDate || 'NULL'} to {checkOutDate || 'NULL'}</p>
            </div>

            {/* Room Type Filter */}
            <div className="flex gap-3 flex-wrap">
              {allTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === type
                      ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/40 text-emerald-800/40 hover:bg-white hover:text-emerald-700 border border-emerald-50 shadow-sm'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Synchronize with room registry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 rounded-2xl bg-white/40 border border-emerald-50 focus:outline-none focus:bg-white transition-all text-sm font-bold text-emerald-950 shadow-inner"
              />
            </div>

            {/* Rooms Grid */}
            {roomsStatus === 'loading' ? (
              <div className="text-center py-20 text-emerald-800/40 font-black uppercase tracking-[0.5em] animate-pulse italic">Engaging Telemetry...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room: Room) => (
                    <div key={room.id} className="glass-morphism rounded-[2.5rem] overflow-hidden border-2 border-white hover:shadow-2xl transition-all group hover:-translate-y-2">
                      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 h-48 flex items-center justify-center relative overflow-hidden">
                        <Hotel className="text-white/20 absolute rotate-12 scale-[4]" size={100} />
                        <Hotel className="text-white relative z-10" size={48} />
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-black text-emerald-950 italic tracking-tighter">{room.type}</h3>
                            <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest mt-1 italic">Suite Identifier #{room.number}</p>
                          </div>
                          <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
                            Available
                          </span>
                        </div>

                        <div className="flex justify-between items-center bg-white/30 p-4 rounded-2xl border border-white">
                          <div>
                            <p className="text-[9px] font-black text-emerald-800/30 uppercase tracking-widest">Pricing Model</p>
                            <p className="text-2xl font-black text-emerald-950 italic tracking-tighter">₹{room.price}<span className="text-[10px] text-emerald-400 not-italic">/nt</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black text-emerald-800/30 uppercase tracking-widest">Maximum Occupancy</p>
                            <p className="text-2xl font-black text-emerald-950 italic tracking-tighter">{room.capacity}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity: string, idx: number) => (
                            <span key={idx} className="text-[9px] font-black uppercase tracking-tight bg-white px-3 py-1 rounded-lg text-emerald-700/60 border border-emerald-50 shadow-sm">
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleRoomAction(room)}
                          className="w-full h-14 bg-emerald-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-800 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                        >
                          Secure Selection
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 glass-morphism rounded-[3rem] border-2 border-dashed border-emerald-100 flex flex-col items-center justify-center">
                    <AlertCircle className="text-emerald-200 mb-4" size={48} />
                    <p className="text-emerald-800/40 font-black uppercase tracking-widest italic">Inventory Telemetry Empty</p>
                    <p className="text-xs text-emerald-700/30 font-bold mt-2 italic">Refine search parameters for alternative results.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STAYS VIEW */}
        {activeView === 'stays' && (
          <div className="p-10 space-y-10">
            <h1 className="text-3xl font-black text-emerald-950 tracking-tighter italic">Personal Registry</h1>

            {bookingsStatus === 'loading' ? (
              <div className="text-center py-20 text-emerald-800/40 font-black uppercase tracking-[0.5em] animate-pulse italic">Accessing Ledger...</div>
            ) : myBookings.length > 0 ? (
              <div className="space-y-6 pb-20">
                {myBookings.map((booking: Booking) => (
                  <div key={booking.id} className="glass-morphism p-8 rounded-[2.5rem] border-2 border-white space-y-6 hover:shadow-2xl transition-all group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-black text-emerald-950 uppercase italic tracking-tighter">Reservation Node #{booking.id.slice(-6).toUpperCase()}</h3>
                        <p className="text-[10px] font-bold text-emerald-800/30 uppercase tracking-widest mt-1 italic">Verified for {booking.guestName}</p>
                      </div>
                      <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        booking.status === 'confirmed' ? 'bg-emerald-700 text-white' :
                        booking.status === 'checked_in' ? 'bg-amber-600 text-white' :
                        booking.status === 'checked_out' ? 'bg-white text-emerald-950 border border-emerald-100' :
                        'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="bg-white/30 p-4 rounded-2xl border border-white">
                        <p className="text-[9px] font-black text-emerald-800/30 uppercase tracking-widest">Inbound</p>
                        <p className="text-lg font-black text-emerald-950 italic">{booking.checkInDate}</p>
                      </div>
                      <div className="bg-white/30 p-4 rounded-2xl border border-white">
                        <p className="text-[9px] font-black text-emerald-800/30 uppercase tracking-widest">Outbound</p>
                        <p className="text-lg font-black text-emerald-950 italic">{booking.checkOutDate}</p>
                      </div>
                      <div className="bg-white/30 p-4 rounded-2xl border border-white">
                        <p className="text-[9px] font-black text-emerald-800/30 uppercase tracking-widest">Nights</p>
                        <p className="text-lg font-black text-emerald-950 italic">{booking.nights}</p>
                      </div>
                      <div className="bg-white/30 p-4 rounded-2xl border border-white">
                        <p className="text-[9px] font-black text-emerald-800/30 uppercase tracking-widest">Total Capital</p>
                        <p className="text-lg font-black text-emerald-700 italic">₹{booking.totalPrice}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-emerald-50">
                      <button
                        onClick={() => downloadInvoice(booking)}
                        className="h-12 px-8 flex items-center gap-3 bg-white text-emerald-700 border border-emerald-100 rounded-xl hover:bg-emerald-700 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95"
                      >
                        <Download size={18} /> Financial Artifact
                      </button>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="h-12 px-8 flex items-center gap-3 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95"
                        >
                          <AlertCircle size={18} /> Terminate Request
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 glass-morphism rounded-[3rem] border-2 border-dashed border-emerald-100">
                <Compass className="text-emerald-100 mb-6 mx-auto" size={64} />
                <p className="text-emerald-800/40 font-black uppercase tracking-widest italic text-lg">Empty Registry History</p>
                <p className="text-sm text-emerald-700/30 font-bold mt-2 italic px-10">Access the Discovery Console to initialize your hospitality journey.</p>
                <button 
                  onClick={() => setActiveView('discover')}
                  className="mt-10 px-10 h-14 bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                >
                  Discover Options
                </button>
              </div>
            )}
          </div>
        )}

        {/* LEDGER VIEW */}
        {activeView === 'ledger' && (activeView === 'ledger' && (
          <div className="p-10 space-y-10">
            <h1 className="text-3xl font-black text-emerald-950 tracking-tighter italic">Capital Analysis Ledger</h1>

            <div className="glass-card p-10 rounded-[3rem] border-2 border-white space-y-10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Bookmark className="text-emerald-600" size={16} />
                    </div>
                    <p className="text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.2em]">Transaction Count</p>
                  </div>
                  <p className="text-5xl font-black text-emerald-950 italic tracking-tighter leading-none">{myBookings.length}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Clock className="text-amber-600" size={16} />
                    </div>
                    <p className="text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.2em]">Live Assignments</p>
                  </div>
                  <p className="text-5xl font-black text-emerald-950 italic tracking-tighter leading-none">
                    {myBookings.filter((b: Booking) => b.status === 'checked_in').length}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Download className="text-emerald-700" size={16} />
                    </div>
                    <p className="text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.2em]">Gross Liquidity Flow</p>
                  </div>
                  <p className="text-5xl font-black text-emerald-700 italic tracking-tighter leading-none">
                    ₹{myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto pt-10 border-t border-emerald-50">
                <table className="w-full text-xs font-bold text-emerald-900">
                  <thead className="bg-emerald-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/40">Identifier Hash</th>
                      <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/40">Synchronization Window</th>
                      <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/40">Cycle Count</th>
                      <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/40">Capital Summation</th>
                      <th className="px-6 py-4 text-left uppercase tracking-widest text-emerald-800/40">Operational Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {myBookings.map((booking: Booking) => (
                      <tr key={booking.id} className="hover:bg-emerald-50/30 transition-all group">
                        <td className="px-6 py-5 font-mono text-[10px] group-hover:text-emerald-700">{booking.id.toUpperCase()}</td>
                        <td className="px-6 py-5 italic">{booking.checkInDate} — {booking.checkOutDate}</td>
                        <td className="px-6 py-5">{booking.nights} <span className="text-[9px] uppercase font-black text-emerald-800/20 ml-1">cycles</span></td>
                        <td className="px-6 py-5 font-black text-emerald-700">₹{booking.totalPrice}</td>
                        <td className="px-6 py-5">
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                            booking.status === 'confirmed' ? 'bg-emerald-700 text-white' :
                            booking.status === 'checked_in' ? 'bg-amber-600 text-white' :
                            'bg-white text-emerald-800/40 border border-emerald-100'
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
        ))}
      </div>

      {/* Booking Modal Upgrade */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-emerald-950/40 z-50 flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-card rounded-[3rem] p-12 max-w-lg w-full space-y-10 border-4 border-white shadow-[0_50px_100px_rgba(6,78,59,0.2)]">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-emerald-950 italic tracking-tighter leading-none">Secure Transaction</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/40 italic">Finalizing Telemetry for Registry #{selectedRoom.id.slice(-6).toUpperCase()}</p>
            </div>
            
            <div className="space-y-6 text-sm bg-white/40 p-8 rounded-[2rem] border border-white shadow-inner">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30">Suite Configuration:</span>
                <span className="font-black text-emerald-950 italic text-lg tracking-tighter">{selectedRoom.type} (#{selectedRoom.number})</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30">Inbound Flow:</span>
                <span className="font-black text-emerald-950 italic">{checkInDate}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30">Outbound Flow:</span>
                <span className="font-black text-emerald-950 italic">{checkOutDate}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/30">Configuration Rate:</span>
                <span className="font-black text-emerald-950 italic">₹{selectedRoom.price}<span className="text-[10px] not-italic text-emerald-400">/nt</span></span>
              </div>
              <div className="border-t border-emerald-50 pt-6 flex justify-between items-end font-black">
                <span className="text-[10px] uppercase tracking-widest text-emerald-800/40">Total Capital Sum:</span>
                <span className="text-4xl text-emerald-700 italic tracking-tighter leading-none">
                  ₹{Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)) * selectedRoom.price}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 h-14 rounded-2xl bg-white text-emerald-800/40 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-all active:scale-95 border border-emerald-50"
              >
                Abort
              </button>
              <button
                onClick={handleBookConfirm}
                className="flex-1 h-14 rounded-2xl bg-emerald-700 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
