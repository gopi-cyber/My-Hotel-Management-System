'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, Room } from '@/lib/features/roomSlice';
import { fetchUserBookings, Booking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { Calendar, Search, Bookmark, Clock, User, Hotel, Download, AlertCircle, CheckCircle2, Home, Compass, MapPin, Star, CreditCard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { TiltCard } from '@/components/TiltCard';

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
    if (new Date(checkOutDate) < new Date(checkInDate)) {
      setError('Outbound date cannot be before inbound date');
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
    return matchesTab && matchesSearch;
  });

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
      <ParticleBackground />
      
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Glass Sidebar */}
      <aside className="z-20 w-80 glass-sidebar flex flex-col p-10 space-y-12 h-screen overflow-y-auto bg-slate-950/80 backdrop-blur-3xl border-r-2 border-white/5">
        <style jsx>{`
            .glass-sidebar {
                border-right: 2px solid rgba(255, 255, 255, 0.05);
            }
        `}</style>
        <Link href="/" className="flex items-center gap-4 px-2 group">
          <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
            <Hotel className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-white uppercase leading-none">Vortex</span>
            <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mt-1">Guest Portal</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'home', label: 'My Dashboard', icon: Home },
            { id: 'discover', label: 'Explore Rooms', icon: Compass },
            { id: 'stays', label: 'My Stays', icon: Bookmark },
            { id: 'ledger', label: 'Billing History', icon: Clock }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id as 'home' | 'discover' | 'stays' | 'ledger')}
              className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest transition-all group ${
                activeView === item.id 
                  ? 'bg-white/10 text-amber-500 border border-white/10 shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon size={22} className={activeView === item.id ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-300'} /> {item.label}
            </button>
          ))}
        </nav>

        <Link href="/">
          <button className="w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] bg-slate-900 text-slate-400 font-bold text-[11px] uppercase tracking-widest hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 active:scale-95">
            <LogOut size={22} /> Log out
          </button>
        </Link>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 overflow-y-auto bg-slate-50">
        <div className="p-8">
            <AnimatePresence mode="wait">
                {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-5 bg-red-50 border border-red-100 rounded-[1.5rem] flex items-center gap-4 text-red-500 text-[11px] font-bold uppercase tracking-widest shadow-sm"
                >
                    <AlertCircle size={20} />
                    {error}
                </motion.div>
                )}
                {success && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-5 bg-green-50 border border-green-100 rounded-[1.5rem] flex items-center gap-4 text-green-600 text-[11px] font-bold uppercase tracking-widest shadow-sm"
                >
                    <CheckCircle2 size={20} />
                    {success}
                </motion.div>
                )}
            </AnimatePresence>
        </div>


            <AnimatePresence mode="wait">
                {activeView === 'home' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="px-10 space-y-12"
                    >
                        <div className="space-y-2">
                        <h1 className="text-6xl font-bold text-slate-900 tracking-tight leading-none uppercase">MY <span className="text-amber-500">DASHBOARD</span></h1>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Welcome back, {user?.name || user?.username}. Here is your current stay overview.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Bookmark, value: myBookings.length, label: 'Active Bookings', color: 'text-amber-500' },
                            { icon: Hotel, value: rooms.filter((r: Room) => r.status === 'available').length, label: 'Available Rooms', color: 'text-blue-500' },
                            { icon: CreditCard, value: `₹${myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}`, label: 'Total Spending', color: 'text-amber-500' }
                        ].map((stat, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-amber-500/30 transition-all group shadow-sm hover:shadow-xl"
                            >
                            <stat.icon className={`mb-6 group-hover:scale-110 transition-transform ${stat.color}`} size={32} />
                            <div className="text-4xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                        </div>

                        <div className="bg-white p-12 rounded-[3.5rem] border-2 border-slate-50 space-y-10 shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Quick Booking</h2>
                                <div className="h-1.5 w-32 bg-slate-50 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-1/3 rounded-full animate-pulse" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Check-in</label>
                                <input
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-slate-900 shadow-sm"
                                />
                                </div>
                                <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Check-out</label>
                                <input
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    min={checkInDate || undefined}
                                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-slate-900 shadow-sm"
                                />
                                </div>
                                <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Guests</label>
                                <input
                                    type="number"
                                    value={guests || ''}
                                    onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-slate-900 shadow-sm"
                                    min="1"
                                    placeholder="1"
                                />
                                </div>
                                <div className="flex items-end">
                                <button
                                    onClick={() => {
                                    if (checkInDate && checkOutDate && new Date(checkOutDate) < new Date(checkInDate)) {
                                        setError('Outbound date cannot be before inbound date');
                                        return;
                                    }
                                    setError('');
                                    setActiveView('discover');
                                    }}
                                    className="w-full h-16 rounded-[1.5rem] bg-amber-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Search size={20} /> Find Rooms
                                </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {activeView === 'discover' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="px-10 space-y-10"
                    >
                        <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">Explore <span className="text-amber-500">Rooms</span></h1>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Finding the perfect space for your stay: {checkInDate || 'TBD'} — {checkOutDate || 'TBD'}</p>
                        </div>

                        {/* Room Type Filter */}
                        <div className="flex gap-4 flex-wrap">
                        {allTypes.map((type) => (
                            <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                activeTab === type
                                ? 'bg-amber-50 text-white border-amber-500 shadow-lg'
                                : 'bg-white text-slate-400 border-slate-100 hover:text-slate-900 hover:border-amber-500/30'
                            }`}
                            >
                            {type}
                            </button>
                        ))}
                        </div>

                        {/* Search */}
                        <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by room type or amenities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white border-2 border-slate-50 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-slate-900 shadow-sm"
                        />
                        </div>

                        {/* Rooms Grid */}
                        {roomsStatus === 'loading' ? (
                        <div className="text-center py-20 text-slate-200 font-bold uppercase tracking-widest animate-pulse italic">Connecting to room inventory...</div>
                        ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                            {filteredRooms.length > 0 ? (
                                filteredRooms.map((room: Room, idx: number) => (
                                    <TiltCard key={room.id} className="h-full">
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-white rounded-[3.5rem] overflow-hidden border-2 border-slate-50 hover:border-amber-500/30 hover:shadow-2xl transition-all group relative h-full flex flex-col"
                                        >
                                            <div className="h-64 relative overflow-hidden bg-slate-100">
                                                <img 
                                                    src={room.image || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"} 
                                                    alt={room.type}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
                                                <div className="absolute top-6 right-6">
                                                    <span className={`px-6 py-2 rounded-xl backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border shadow-lg ${
                                                        room.status === 'available' 
                                                        ? 'bg-white/90 text-green-600 border-green-100' 
                                                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                                                    }`}>
                                                        {room.status === 'available' ? 'Available' : 'Sold Out'}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors uppercase leading-none">{room.type}</h3>
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Rate</p>
                                                            <p className="text-2xl font-bold text-amber-500 tracking-tight leading-none">₹{room.price}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                    {room.amenities.map((amenity: string, idx: number) => (
                                                        <span key={idx} className="text-[9px] font-bold uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl text-slate-400 border border-slate-100 shadow-sm">
                                                        {amenity}
                                                        </span>
                                                    ))}
                                                    </div>
                                                </div>

                                                <button
                                                onClick={() => room.status === 'available' && handleRoomAction(room)}
                                                disabled={room.status !== 'available'}
                                                className={`w-full h-16 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                                                    room.status === 'available' 
                                                    ? 'bg-slate-900 text-white hover:bg-amber-500' 
                                                    : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                                                }`}
                                                >
                                                {room.status === 'available' ? 'Book This Room' : 'Unavailable'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    </TiltCard>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center">
                                    <AlertCircle className="text-slate-100 mb-8" size={80} />
                                    <p className="text-slate-300 font-bold uppercase tracking-widest italic text-xl">No Rooms Found</p>
                                    <p className="text-sm text-slate-200 font-semibold mt-4 italic max-w-sm">Try adjusting your filters or search query to find available accommodations.</p>
                                </div>
                            )}
                        </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {activeView === 'stays' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="px-10 space-y-10"
                    >
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">My <span className="text-amber-500">Stays</span></h1>

                        {bookingsStatus === 'loading' ? (
                        <div className="text-center py-20 text-slate-200 font-bold uppercase tracking-widest animate-pulse italic">Loading your reservation history...</div>
                        ) : myBookings.length > 0 ? (
                        <div className="space-y-8 pb-20">
                            {myBookings.map((booking: Booking, idx: number) => (
                            <motion.div 
                                key={booking.id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] border-2 border-slate-50 space-y-8 hover:border-amber-500/20 transition-all group shadow-sm hover:shadow-xl"
                            >
                                <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight group-hover:text-amber-500 transition-colors">Booking Ref: {booking.id.slice(-6).toUpperCase()}</h3>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">{booking.guestName}</p>
                                </div>
                                <span className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                                    booking.status === 'confirmed' ? 'bg-amber-500 text-white' :
                                    booking.status === 'checked_in' ? 'bg-blue-600 text-white' :
                                    booking.status === 'checked_out' ? 'bg-slate-100 text-slate-400' :
                                    'bg-red-50 text-red-500 border border-red-100'
                                }`}>
                                    {booking.status.replace('_', ' ').toUpperCase()}
                                </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {[
                                    { label: 'Check-in', value: booking.checkInDate },
                                    { label: 'Check-out', value: booking.checkOutDate },
                                    { label: 'Total Nights', value: booking.nights },
                                    { label: 'Total Price', value: `₹${booking.totalPrice}`, highlight: true }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.label}</p>
                                    <p className={`text-xl font-bold mt-1 ${item.highlight ? 'text-amber-500' : 'text-slate-900'}`}>{item.value}</p>
                                    </div>
                                ))}
                                </div>

                                <div className="flex gap-4 pt-6 border-t border-slate-50">
                                <button
                                    onClick={() => downloadInvoice(booking)}
                                    className="h-14 px-8 flex items-center gap-3 bg-white text-slate-400 border border-slate-100 rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest shadow-sm active:scale-95"
                                >
                                    <Download size={18} /> Download Invoice
                                </button>
                                {booking.status === 'confirmed' && (
                                    <button
                                    onClick={() => handleCancelBooking(booking.id)}
                                    className="h-14 px-8 flex items-center gap-3 bg-red-50 text-red-500 border border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest shadow-sm active:scale-95"
                                    >
                                    <AlertCircle size={18} /> Cancel Booking
                                    </button>
                                )}
                                </div>
                            </motion.div>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-50">
                            <Compass className="text-slate-100 mb-8 mx-auto" size={80} />
                            <p className="text-slate-300 font-bold uppercase tracking-widest italic text-xl">No Stay History Found</p>
                            <p className="text-sm text-slate-200 font-semibold mt-4 italic px-10 max-w-lg mx-auto leading-relaxed">Head over to the Explore Rooms tab to start your first booking with us.</p>
                            <button 
                            onClick={() => setActiveView('discover')}
                            className="mt-12 px-12 h-16 bg-amber-500 text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 hover:bg-amber-400"
                            >
                            Find Your Room
                            </button>
                        </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {activeView === 'ledger' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="px-10 space-y-10"
                    >
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">Billing <span className="text-amber-500">History</span></h1>

                        <div className="bg-white p-12 rounded-[3.5rem] border-2 border-slate-50 space-y-12 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                            { icon: Bookmark, label: 'Total Bookings', value: myBookings.length, color: 'text-amber-500' },
                            { icon: Clock, label: 'Current Stays', value: myBookings.filter((b: Booking) => b.status === 'checked_in').length, color: 'text-blue-500' },
                            { icon: CreditCard, label: 'Total Spending', value: `₹${myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}`, color: 'text-amber-500' }
                            ].map((item, idx) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                    <item.icon className={item.color} size={18} />
                                </div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.label}</p>
                                </div>
                                <p className="text-5xl font-bold text-slate-900 tracking-tight leading-none">{item.value}</p>
                            </div>
                            ))}
                        </div>

                        <div className="overflow-x-auto pt-10 border-t border-slate-50">
                            <table className="w-full text-[11px] font-bold text-slate-400">
                            <thead>
                                <tr className="bg-slate-50">
                                <th className="px-8 py-5 text-left uppercase tracking-widest text-slate-400 border-b border-slate-100">Booking ID</th>
                                <th className="px-8 py-5 text-left uppercase tracking-widest text-slate-400 border-b border-slate-100">Date Range</th>
                                <th className="px-8 py-5 text-left uppercase tracking-widest text-slate-400 border-b border-slate-100">Nights</th>
                                <th className="px-8 py-5 text-left uppercase tracking-widest text-slate-400 border-b border-slate-100">Total Amount</th>
                                <th className="px-8 py-5 text-left uppercase tracking-widest text-slate-400 border-b border-slate-100">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {myBookings.map((booking: Booking) => (
                                <motion.tr 
                                    key={booking.id} 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-slate-50 group transition-all"
                                >
                                    <td className="px-8 py-6 font-mono text-[10px] text-slate-400 group-hover:text-amber-500">{booking.id.toUpperCase()}</td>
                                    <td className="px-8 py-6 text-slate-500">{booking.checkInDate} — {booking.checkOutDate}</td>
                                    <td className="px-8 py-6 text-slate-500">{booking.nights}</td>
                                    <td className="px-8 py-6 font-bold text-amber-500 text-lg">₹{booking.totalPrice}</td>
                                    <td className="px-8 py-6">
                                    <span className={`px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-sm ${
                                        booking.status === 'confirmed' ? 'bg-amber-500 text-white' :
                                        booking.status === 'checked_in' ? 'bg-blue-600 text-white' :
                                        'bg-slate-100 text-slate-300'
                                    }`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                    </td>
                                </motion.tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRoom && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-6 backdrop-blur-xl"
            >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-[4rem] p-12 max-w-xl w-full space-y-12 border-4 border-slate-50 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-[-10%] left-[-10%] h-64 w-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="text-center space-y-2 relative">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase leading-none">Confirm <span className="text-amber-500">Booking</span></h2>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Please review your reservation details</p>
                </div>
                
                <div className="space-y-6 bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm relative">
                {[
                    { label: 'Room Type', value: `${selectedRoom.type} (Room ${selectedRoom.number})`, highlight: true },
                    { label: 'Check-in Date', value: checkInDate },
                    { label: 'Check-out Date', value: checkOutDate },
                    { label: 'Price Per Night', value: `₹${selectedRoom.price}` }
                ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-300">{item.label}</span>
                    <span className={`italic ${item.highlight ? 'text-amber-500' : 'text-slate-900'}`}>{item.value}</span>
                    </div>
                ))}
                
                <div className="border-t border-slate-100 pt-8 flex justify-between items-end">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Total Amount:</span>
                    <span className="text-5xl text-amber-500 font-bold tracking-tight leading-none">
                    ₹{Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)) * selectedRoom.price}
                    </span>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-6 relative">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="h-16 rounded-3xl bg-slate-100 text-slate-400 font-bold text-[11px] uppercase tracking-widest hover:text-red-500 transition-all active:scale-95"
                >
                    Cancel
                </button>
                <button
                    onClick={handleBookConfirm}
                    className="h-16 rounded-3xl bg-amber-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4"
                >
                    Confirm & Book <Clock size={20} className="animate-spin-slow" />
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}
