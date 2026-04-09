'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, bookRoom } from '@/lib/features/roomSlice';
import { fetchBookings, addBooking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import RoomCard from '@/components/RoomCard';
import BookingModal from '@/components/BookingModal';
import { Sparkles, Calendar, Search, MapPin, Star, ShieldCheck, Coffee, Wifi, Waves, Home, Compass, Bookmark, Clock, User, Hotel, BellRing } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.rooms);
  const bookings = useSelector((state: RootState) => state.bookings.items);
  const user = useSelector((state: RootState) => state.user.user);

  const [activeTab, setActiveTab] = useState('All');
  const [activeView, setActiveView] = useState<'home' | 'discover' | 'stays' | 'ledger'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // Filter bookings for the current active guest (loosely)
  const myBookings = bookings.filter(b => 
    user && b.guestName.toLowerCase().includes(user.name?.toLowerCase() || user.username.toLowerCase())
  );

  // Helper for invoice calculation
  const calculateNights = (checkIn: string, checkOut: string) => {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 1; 
  };

  const handleRoomAction = (room: any) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleBookConfirm = async (data: any) => {
    await dispatch(addBooking({
       guestName: data.guestName,
       roomId: data.roomId,
       checkIn: data.checkIn,
       checkOut: data.checkOut,
       status: 'Confirmed'
    }));
    await dispatch(bookRoom(data.roomId));
  };

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());
  }, [dispatch]);

  const allTypes = ['All', ...Array.from(new Set(items.map(r => r.type)))];

  const filteredRooms = items.filter(r => {
    const matchesTab = activeTab === 'All' || r.type === activeTab;
    const matchesSearch = r.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-100/40 blur-[120px] pointer-events-none z-0" />

      {/* Glass Sidebar */}
      <aside className="z-20 w-72 glass-morphism border-r border-white/60 flex flex-col p-8 space-y-10 h-screen">
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
                      activeView === 'home' ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-indigo-600 border border-white' : 'text-slate-400 hover:text-indigo-600 hover:bg-white/50 group'
                  }`}
              >
                  <Home size={20} className={activeView === 'home' ? '' : 'text-slate-300 group-hover:text-indigo-400'} /> Home
              </button>
              <button 
                  onClick={() => setActiveView('discover')}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                      activeView === 'discover' ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-indigo-600 border border-white' : 'text-slate-400 hover:text-indigo-600 hover:bg-white/50 group'
                  }`}
              >
                  <Compass size={20} className={activeView === 'discover' ? '' : 'text-slate-300 group-hover:text-indigo-400'} /> Discover
              </button>
              <button 
                  onClick={() => setActiveView('stays')}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                      activeView === 'stays' ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-indigo-600 border border-white' : 'text-slate-400 hover:text-indigo-600 hover:bg-white/50 group'
                  }`}
              >
                  <Bookmark size={20} className={activeView === 'stays' ? '' : 'text-slate-300 group-hover:text-indigo-400'} /> My Stays
              </button>
              <button 
                  onClick={() => setActiveView('ledger')}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                      activeView === 'ledger' ? 'bg-white shadow-[10px_10px_20px_#d1d9e6] text-indigo-600 border border-white' : 'text-slate-400 hover:text-indigo-600 hover:bg-white/50 group'
                  }`}
              >
                  <Clock size={20} className={activeView === 'ledger' ? '' : 'text-slate-300 group-hover:text-indigo-400'} /> Ledger
              </button>
          </nav>

          <div className="pt-8 border-t border-slate-200/50 space-y-2">
              <Link href="/" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-indigo-600 hover:bg-white/50 transition-all">
                  <User size={20} /> Sign Out
              </Link>
          </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col h-screen overflow-y-auto z-10 p-10 pt-8">
          <header className="flex items-center justify-between mb-12">
              <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-white shadow-inner flex-wrap gap-1">
                  {allTypes.map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 text-[11px] font-bold rounded-xl transition-all ${
                          activeTab === tab ? 'bg-white text-indigo-600 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                          {tab.toUpperCase()}
                      </button>
                  ))}
              </div>
              <div className="flex items-center gap-5">
                  <div className="h-10 w-10 rounded-2xl bg-white border border-white shadow-[10px_10px_20px_#d1d9e6] flex items-center justify-center text-slate-400 hover:text-indigo-600 cursor-pointer transition-all">
                      <BellRing size={20} />
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-indigo-200 overflow-hidden shadow-md flex items-center justify-center bg-white cursor-pointer hover:border-indigo-400 transition-all">
                      {user ? (
                          <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold leading-none uppercase">
                              {user.name ? user.name.slice(0, 2) : user.username.slice(0, 2)}
                          </div>
                      ) : (
                           <User size={16} className="text-slate-400" />
                      )}
                  </div>
              </div>
          </header>

          {activeView === 'home' && (
              <>
                  <div className="max-w-5xl mx-auto w-full mb-16 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                          <Star size={12} fill="currentColor" /> Premium Hospitality Suite
                      </div>
                      <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">Where luxury meets <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic">3D Precision</span>.</h1>
                      
                      <div className="relative group max-w-3xl mx-auto">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                              <Search size={22} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                          </div>
                          <input 
                              type="text" 
                              placeholder="Identify your perfect accommodation..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full h-20 rounded-[2.5rem] border-4 border-white bg-white/60 pl-16 pr-40 text-lg font-medium text-slate-800 placeholder:text-slate-300 shadow-[20px_20px_60px_#d1d9e6] outline-none focus:bg-white transition-all backdrop-blur-md"
                          />
                          <div className="absolute inset-y-3 right-3">
                              <button className="h-full px-10 rounded-[1.8rem] bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest leading-none">Initialize</button>
                          </div>
                      </div>
                  </div>

                  <div className="max-w-7xl mx-auto w-full">
                      <div className="flex items-center justify-between mb-10">
                          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Handpicked Selections</h2>
                          <div className="flex items-center gap-3">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{filteredRooms.length} ACTIVE ROOMS</span>
                          </div>
                      </div>

                      {status === 'loading' ? (
                          <div className="flex h-96 items-center justify-center">
                              <div className="animate-spin rounded-[1.5rem] h-12 w-12 border-4 border-indigo-100 border-t-indigo-600" />
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                              {filteredRooms.map((room: any) => (
                                <RoomCard key={room.id} room={room} onBook={() => handleRoomAction(room)} />
                              ))}
                          </div>
                      )}
                  </div>
              </>
          )}

          {activeView === 'discover' && (
              <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-12 text-center">
                      <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">Discover GrandStay</h2>
                      <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto italic">Curated experiences and world-class amenities designed to elevate your stay above the ordinary.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="h-80 rounded-[3rem] bg-gradient-to-br from-indigo-500 to-indigo-800 p-10 flex flex-col justify-end relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all">
                          <div className="absolute inset-0 bg-black/20" />
                          {/* Use image fallback styling via gradients for mock */}
                          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                          <div className="relative z-10 w-full">
                              <div className="flex items-center gap-2 h-8 px-4 rounded-full bg-white/20 backdrop-blur-md w-max mb-4 border border-white/30 text-white shadow-xl">
                                  <Waves size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Wellness</span>
                              </div>
                              <h3 className="text-3xl font-black text-white tracking-tight mb-2">Neural Spa Oasis</h3>
                              <p className="text-white/80 font-medium leading-relaxed max-w-sm mb-6">Cutting-edge relaxation techniques merging hydrology with deep sensory therapy.</p>
                              <button className="h-10 px-6 bg-white text-indigo-600 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-50 transition-colors uppercase tracking-widest">Learn More</button>
                          </div>
                      </div>

                      <div className="h-80 rounded-[3rem] bg-gradient-to-br from-amber-500 to-amber-700 p-10 flex flex-col justify-end relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-all">
                           <div className="absolute inset-0 bg-black/20" />
                           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                           <div className="relative z-10">
                              <div className="flex items-center gap-2 h-8 px-4 rounded-full bg-white/20 backdrop-blur-md w-max mb-4 border border-white/30 text-white shadow-xl">
                                  <Coffee size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Dining</span>
                              </div>
                              <h3 className="text-3xl font-black text-white tracking-tight mb-2">Michelin Excellence</h3>
                              <p className="text-white/80 font-medium leading-relaxed max-w-sm mb-6">Savor gastronomical masterpieces curated by our 3-star executive resident chefs.</p>
                              <button className="h-10 px-6 bg-white text-amber-600 rounded-xl text-xs font-bold shadow-lg hover:bg-orange-50 transition-colors uppercase tracking-widest">Reserve Table</button>
                           </div>
                      </div>
                  </div>
              </div>
          )}

          {activeView === 'stays' && (
              <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="flex items-center justify-between mb-10">
                      <div>
                          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Stay History</h2>
                          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">Your allocated accommodations</p>
                      </div>
                      <div className="px-5 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest">
                          {myBookings.length} Total Records
                      </div>
                   </div>

                   {myBookings.length === 0 ? (
                       <div className="flex flex-col items-center justify-center h-64 bg-white/50 border border-white rounded-[3rem] shadow-xl text-center">
                           <Bookmark size={40} className="text-slate-300 mb-4" />
                           <p className="text-lg font-bold text-slate-900 mb-2">No History Found</p>
                           <p className="text-sm text-slate-400 font-medium max-w-sm">We couldn't locate any active or past reservations under your verified identity.</p>
                       </div>
                   ) : (
                       <div className="space-y-6">
                           {myBookings.map((booking) => {
                               const room = items.find(r => r.id === booking.roomId);
                               const isActive = booking.status === 'Confirmed' || booking.status === 'CheckedIn';
                               return (
                                   <div key={booking.id} className="glass-card rounded-[2.5rem] p-8 shadow-[20px_20px_60px_#d1d9e6] flex items-center justify-between group hover:bg-white transition-colors">
                                       <div className="flex items-center gap-8">
                                            <div className={`h-16 w-16 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg ${
                                                isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                <Hotel size={28} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{room?.type || 'Standard Room'}</h3>
                                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                        isActive ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                                    <span><Calendar size={12} className="inline mr-1" /> {booking.checkIn} — {booking.checkOut}</span>
                                                    <span>•</span>
                                                    <span>Room #{booking.roomId}</span>
                                                </p>
                                            </div>
                                       </div>
                                       {isActive && (
                                           <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm text-center">
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confirmation</span>
                                                <span className="block text-sm font-black text-indigo-600 tracking-widest">{booking.id.toUpperCase().slice(0,8)}</span>
                                           </div>
                                       )}
                                   </div>
                               );
                           })}
                       </div>
                   )}
              </div>
          )}

          {activeView === 'ledger' && (
               <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Ledger</h2>
                        <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">Invoices and Account Balances</p>
                    </div>

                    {myBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white/50 border border-white rounded-[3rem] shadow-xl text-center">
                            <Clock size={40} className="text-slate-300 mb-4" />
                            <p className="text-lg font-bold text-slate-900 mb-2">Ledger Empty</p>
                            <p className="text-sm text-slate-400 font-medium max-w-sm">You have no billable records on your account.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                             {myBookings.map(booking => {
                                 const room = items.find(r => r.id === booking.roomId);
                                 const nights = calculateNights(booking.checkIn, booking.checkOut);
                                 const baseRate = room?.price || 0;
                                 const subTotal = nights * baseRate;
                                 const isSettled = booking.status === 'CheckedOut';

                                 const serviceFee = 150; 
                                 const taxRate = 0.18;
                                 const preTax = subTotal + serviceFee;
                                 const tax = preTax * taxRate;
                                 const grandTotal = preTax + tax;

                                 return (
                                     <div key={booking.id} className="relative glass-card rounded-[3rem] p-10 shadow-[20px_20px_60px_#d1d9e6] overflow-hidden">
                                          {/* Paid watermark effect */}
                                          {isSettled && (
                                             <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 rotate-12 text-[120px] font-black opacity-[0.03] text-emerald-600 pointer-events-none select-none">
                                                 SETTLED
                                             </div>
                                          )}
                                          
                                          <div className="flex justify-between items-start mb-8 relative z-10 w-full border-b border-slate-200/60 pb-8">
                                              <div className="flex items-center gap-4">
                                                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border-2 ${
                                                    isSettled ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                                                  }`}>
                                                      <Clock size={20} />
                                                  </div>
                                                  <div>
                                                      <h3 className="text-xl font-bold text-slate-900">Invoice #{booking.id.toUpperCase().slice(0, 6)}</h3>
                                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Issued for {booking.guestName}</p>
                                                  </div>
                                              </div>
                                              <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                                  isSettled ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                              }`}>
                                                  {isSettled ? 'Balance Zero' : 'Payment Pending'}
                                              </div>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                                              <div className="space-y-6">
                                                   <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Itemized Charges</p>
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-center text-sm">
                                                                <span className="font-bold text-slate-700">Room Accommodation ({nights} Nts)</span>
                                                                <span className="font-black text-slate-900">₹{subTotal.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-sm">
                                                                <span className="font-bold text-slate-600">Standard Service & Amenities</span>
                                                                <span className="font-black text-slate-900">₹{serviceFee.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-100">
                                                                <span className="font-bold text-slate-500">Government Taxes (18%)</span>
                                                                <span className="font-black text-slate-700">₹{tax.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                   </div>
                                              </div>

                                              <div className="flex flex-col justify-center items-end bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Grand Total</span>
                                                    <span className="text-5xl font-black italic text-slate-900 tracking-tighter">₹{grandTotal.toFixed(0)}</span>
                                                    
                                                    {!isSettled && (
                                                         <button className="mt-8 px-8 h-12 bg-indigo-600 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-colors w-full sm:w-auto">
                                                             Initiate Payment
                                                         </button>
                                                    )}
                                              </div>
                                          </div>
                                     </div>
                                 )
                             })}
                        </div>
                    )}
               </div>
          )}

          <BookingModal 
             room={selectedRoom}
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             onConfirm={handleBookConfirm}
          />

          <footer className="mt-40 border-t border-slate-200/50 pt-16 pb-24 flex flex-col items-center gap-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[10px_10px_20px_#d1d9e6] text-slate-300">
                  <ShieldCheck size={20} />
              </div>
              <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-500 italic">GrandStay Neural Core v2.1</p>
                  <p className="text-xs text-slate-400 max-w-sm font-medium leading-relaxed">
                      Secured by high-fidelity encryption and decentralized inventory synchronization engines.
                  </p>
              </div>
          </footer>
      </section>
    </main>
  );
}
