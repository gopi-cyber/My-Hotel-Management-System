import Image from 'next/image';

interface RoomCardProps {
    room: {
        id: string;
        type: string;
        price: number;
        status: string;
        amenities: string[];
        image?: string;
    };
    onBook?: (id: string) => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
    const isAvailable = room.status === 'Available' || room.status === 'available';
    
    // Use the room's own image, fall back to a generic luxury hotel photo
    const roomImage = room.image || 
        (room.type.toLowerCase().includes('suite') 
            ? 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80');

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white/40 border-2 border-white shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] transition-all hover:translate-y-[-10px] backdrop-blur-md">
            {/* Image Section */}
            <div className="relative h-64 w-full overflow-hidden">
                <div className={`absolute top-5 right-5 z-20 rounded-2xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl border border-white/30 shadow-lg ${
                    isAvailable ? 'bg-emerald-500/80 shadow-emerald-500/20' : 'bg-red-500/80 shadow-red-500/20'
                }`}>
                    {room.status.toUpperCase()}
                </div>
                
                <Image 
                    src={roomImage} 
                    alt={room.type}
                    fill
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
            </div>

            {/* Glass Detail Section */}
            <div className="flex flex-col p-8">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Operational Log #{room.id}</span>
                </div>

                <h3 className="mb-6 text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{room.type}</h3>
                
                <div className="mb-8 flex flex-wrap gap-2">
                    {room.amenities?.map((amenity: string, i: number) => (
                        <span key={i} className="rounded-xl bg-white px-3.5 py-1.5 text-[9px] font-bold text-slate-500 border border-slate-100 shadow-sm capitalize">
                            {amenity}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-8">
                    <div className="flex flex-col">
                        <div className="flex items-center text-3xl font-black text-slate-900 tracking-tighter">
                            <span className="text-sm font-bold text-indigo-500 mr-1 self-start mt-1">₹</span>
                            <span>{room.price}</span>
                            <span className="text-[11px] font-bold text-slate-400 ml-2 uppercase tracking-tight">/ Day</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onBook?.(room.id)}
                        disabled={!isAvailable}
                        className={`h-14 px-10 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                            isAvailable 
                            ? 'bg-indigo-600 text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-white shadow-inner'
                        }`}
                    >
                        {isAvailable ? 'Secure Now' : 'Occupied'}
                    </button>
                </div>
            </div>
        </div>
    );
}
