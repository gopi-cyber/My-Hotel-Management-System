import { Bed, DollarSign, Star, Sparkles, MapPin } from 'lucide-react';

interface RoomCardProps {
    room: {
        id: string;
        type: string;
        price: number;
        status: string;
        amenities: string[];
    };
    onBook?: (id: string) => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
    const isAvailable = room.status === 'Available';
    
    // Selecting premium images based on room type
    const roomImage = room.type.toLowerCase().includes('suite') 
        ? 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl transition-all hover:border-blue-500/50 hover:shadow-blue-500/10">
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                <div className={`absolute top-4 right-4 z-20 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-white backdrop-blur-xl border border-white/20 ${
                    isAvailable ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                    {room.status}
                </div>
                
                <img 
                    src={roomImage} 
                    alt={room.type}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col p-8">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 italic">Highly Rated</span>
                </div>

                <h3 className="mb-2 text-2xl font-black text-white">{room.type} <span className="text-blue-500 italic">Room</span></h3>
                
                <div className="mb-6 flex flex-wrap gap-2">
                    {room.amenities?.map((amenity: string, i: number) => (
                        <span key={i} className="rounded-lg bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-400">
                            {amenity}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Per Night</p>
                        <div className="flex items-center text-3xl font-black text-white">
                            <span className="text-sm font-bold text-blue-500 self-start mt-1 mr-0.5">$</span>
                            <span>{room.price}</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onBook?.(room.id)}
                        disabled={!isAvailable}
                        className={`group/btn relative overflow-hidden rounded-2xl px-8 py-3.5 text-xs font-black uppercase tracking-[0.1em] transition-all hover:scale-105 active:scale-95 ${
                            isAvailable 
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500'
                            : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/10'
                        }`}
                    >
                       <span className="relative z-10 flex items-center gap-2">
                          <Sparkles size={14} className={isAvailable ? 'text-blue-200' : 'text-slate-700'} />
                          {isAvailable ? 'Reserve Now' : 'Fully Booked'}
                       </span>
                    </button>
                </div>
            </div>
        </div>
    );
}