'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, bookRoom } from '@/lib/features/roomSlice';
import { addBooking } from '@/lib/features/bookingSlice';
import { RootState, AppDispatch } from '@/lib/store';
import RoomCard from '@/components/RoomCard';
import BookingModal from '@/components/BookingModal';
import { Sparkles, Calendar, Search, MapPin, Star, ShieldCheck, Coffee, Wifi, Waves } from 'lucide-react';
import Image from 'next/image';

const AMENITIES = [
    { icon: Wifi, label: 'Free Wifi', description: 'High-speed connectivity' },
    { icon: Waves, label: 'Infinity Pool', description: 'Heated rooftop swimming' },
    { icon: Coffee, label: 'Breakfast', description: 'International buffet' },
    { icon: ShieldCheck, label: 'Secure', description: '24/7 on-site security' },
];

const REVIEWS = [
    { name: 'Sarah J.', rating: 5, comment: 'An unforgettable stay. The service and views were world-class!' },
    { name: 'Michael R.', rating: 5, comment: 'Pure luxury throughout. The check-in process was incredibly smooth.' },
];

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.rooms);
  const [activeTab, setActiveTab] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const handleRoomAction = (room: any) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleBookConfirm = async (data: any) => {
    // 1. Dispatch the booking to our brain (Redux + Server)
    await dispatch(addBooking({
       guestName: data.guestName,
       roomId: data.roomId,
       checkIn: data.checkIn,
       checkOut: data.checkOut,
       status: 'Confirmed'
    }));
    
    // 2. Update the room status to "Occupied"
    await dispatch(bookRoom(data.roomId));
  };

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Filters (Mock logic for presentation)
  const filteredRooms = activeTab === 'All' 
    ? items 
    : items.filter(r => r.type.includes(activeTab));

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Rendered Background (Full Screen Image) */}
        <div className="absolute inset-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat transition-transform duration-1000 items-center justify-center flex">
             {/* Using absolute paths from assets if they were moved, but using Unsplash high-res for instant preview */}
        </div>

        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Excellence Since 1994</span>
          </div>

          <h1 className="mb-8 text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl leading-[0.9]">
            A NEW ERA <br />
            <span className="bg-gradient-to-r from-blue-500 via-blue-200 to-indigo-400 bg-clip-text text-transparent italic">
              OF LUXURY
            </span>
          </h1>

          <div className="mb-12 flex items-center gap-4 text-slate-400 font-medium tracking-tight">
             <div className="flex items-center gap-2"><MapPin size={16} /> <span>Manhattan, New York</span></div>
             <div className="h-1 w-1 rounded-full bg-slate-700" />
             <div className="flex items-center gap-2 items-center">
                <div className="flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                </div>
                <span>4.9/5 Rating</span>
             </div>
          </div>

          {/* New Smooth Date Picker Flow */}
          <div className="group flex w-full max-w-4xl items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-2xl hover:border-white/20 transition-all shadow-2xl shadow-black/50">
             <div className="flex flex-1 items-center gap-6 px-6">
                 <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Check In</p>
                    <input type="text" placeholder="Select Date" className="bg-transparent text-sm font-bold placeholder:text-slate-600 focus:outline-none" />
                 </div>
                 <div className="h-10 w-px bg-white/10" />
                 <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Check Out</p>
                    <input type="text" placeholder="Select Date" className="bg-transparent text-sm font-bold placeholder:text-slate-600 focus:outline-none" />
                 </div>
                 <div className="h-10 w-px bg-white/10" />
                 <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Guests</p>
                    <select className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer">
                        <option className="bg-slate-900">2 Adults, 0 Children</option>
                        <option className="bg-slate-900">1 Adult, 0 Children</option>
                        <option className="bg-slate-900">2 Adults, 1 Child</option>
                    </select>
                 </div>
             </div>
             <button className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:bg-blue-500 hover:scale-105 active:scale-95">
                <Search size={28} />
             </button>
          </div>
        </div>
      </section>

      {/* Brand Amenities Section */}
      <section className="relative bg-slate-950 px-6 py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {AMENITIES.map((item, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500">
                            <item.icon size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">{item.label}</h4>
                            <p className="text-sm text-slate-500">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Featured Room Collection */}
      <section id="rooms" className="mx-auto max-w-7xl px-6 py-24 pb-40">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">Inventory</h3>
            <h2 className="text-5xl font-black leading-[1.1]">Signature <br /> Accommodations.</h2>
          </div>
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
             {['All', 'Deluxe', 'Suite'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-8 py-3 text-xs font-bold transition-all ${
                    activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                    {tab}
                </button>
             ))}
          </div>
        </div>

        {status === 'loading' && (
           <div className="flex h-96 w-full flex-col items-center justify-center gap-4">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600/30 border-t-blue-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Retrieving Rooms...</p>
           </div>
        )}

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room: any) => (
            <div key={room.id} className="transition-all hover:-translate-y-2">
                <RoomCard room={room} onBook={() => handleRoomAction(room)} />
            </div>
          ))}
        </div>

        {/* The Premium Booking Interaction */}
        <BookingModal 
           room={selectedRoom}
           isOpen={isModalOpen}
           onClose={() => setIsModalOpen(false)}
           onConfirm={handleBookConfirm}
        />
      </section>

      {/* Social Proof / Guest Reviews */}
      <section className="bg-white/5 py-24 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 text-center">
            <h3 className="mb-16 text-2xl font-black uppercase tracking-tighter opacity-30">Trusted by Global Travelers</h3>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {REVIEWS.map((review, i) => (
                    <div key={i} className="flex flex-col items-center gap-6">
                        <div className="flex gap-1 text-yellow-500">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-2xl font-medium italic text-slate-300 leading-relaxed max-w-lg">"{review.comment}"</p>
                        <span className="font-bold uppercase tracking-widest text-blue-500 text-[10px]">— {review.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-950 px-6 py-20 pb-32">
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
                <div className="col-span-1 md:col-span-2">
                     <span className="text-3xl font-black tracking-tighter mb-6 block">GRANDSTAY HMS</span>
                     <p className="max-w-xs text-sm text-slate-500 leading-loose">
                        Redefining modern hospitality with state-of-the-art reservation management and world-class guest services.
                     </p>
                </div>
                <div>
                    <h5 className="mb-6 font-bold uppercase tracking-widest text-slate-500 text-xs">Platform</h5>
                    <ul className="space-y-4 text-sm font-medium text-slate-300">
                        <li className="hover:text-blue-500 transition-colors cursor-pointer">Admin Dashboard</li>
                        <li className="hover:text-blue-500 transition-colors cursor-pointer">Reception Desk</li>
                        <li className="hover:text-blue-500 transition-colors cursor-pointer">Guest Portal</li>
                    </ul>
                </div>
                <div>
                   <h5 className="mb-6 font-bold uppercase tracking-widest text-slate-500 text-xs">Contact</h5>
                   <ul className="space-y-4 text-sm font-medium text-slate-300">
                        <li>info@grandstay.com</li>
                        <li>+1 (555) 000-0000</li>
                    </ul>
                </div>
            </div>
            <div className="mt-20 border-t border-white/5 pt-12 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
                © 2026 GrandStay Architecture. Built for the Future of Comfort.
            </div>
        </div>
      </footer>
    </main>
  );
}
