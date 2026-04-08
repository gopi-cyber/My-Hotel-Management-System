'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, bookRoom } from '@/lib/features/roomSlice';
import { addBooking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import RoomCard from '@/components/RoomCard';
import BookingModal from '@/components/BookingModal';
import { Sparkles, Calendar, Search, MapPin, Star, ShieldCheck, Coffee, Wifi, Waves, Home, Compass, Bookmark, Clock, User, Hotel, BellRing } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.rooms);
  const [activeTab, setActiveTab] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

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
  }, [dispatch]);

  const filteredRooms = activeTab === 'All' 
    ? items 
    : items.filter(r => r.type.includes(activeTab));

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-100/40 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-100/40 blur-[120px]" />

      {/* Glass Sidebar */}
      <aside className="z-20 w-72 glass-morphism border-r border-white/60 flex flex-col p-8 space-y-10 h-screen">
          <div className="flex items-center gap-4 px-2">
              <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Hotel className="text-white" size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 uppercase">GrandStay</span>
          </div>

          <nav className="flex-1 space-y-2">
              <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold bg-white shadow-[10px_10px_20px_#d1d9e6] text-indigo-600 border border-white">
                  <Home size={20} /> Home
              </button>
              <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-white/50 transition-all">
                  <Compass size={20} /> Discover
              </button>
              <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-white/50 transition-all">
                  <Bookmark size={20} /> My Stays
              </button>
              <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-white/50 transition-all">
                  <Clock size={20} /> Ledger
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
              <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-white shadow-inner">
                  {['All', 'Deluxe', 'Suite'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 text-[11px] font-bold rounded-xl transition-all ${
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
                  <div className="h-10 w-10 rounded-full border-2 border-indigo-200 overflow-hidden shadow-md">
                      <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold italic">GS</div>
                  </div>
              </div>
          </header>

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
