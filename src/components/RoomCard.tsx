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
        <div className="group relative flex flex-col overflow-hidden rounded-[3.5rem] bg-slate-900/40 border-2 border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all hover:translate-y-[-12px] hover:border-amber-500/30 backdrop-blur-2xl animate-in fade-in duration-700">
            {/* Image Section */}
            <div className="relative h-72 w-full overflow-hidden">
                {/* Status Indicator */}
                <div className={`absolute top-6 right-6 z-20 rounded-2xl px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-3xl border border-white/10 shadow-2xl skew-x-[-12deg] ${
                    isAvailable ? 'bg-amber-500/80 text-slate-950' : 'bg-red-500/80'
                }`}>
                    {room.status.toUpperCase()}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <Image 
                    src={roomImage} 
                    alt={room.type}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-10 relative">
                {/* ID Indicator */}
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic">NODE LOG_ID: <span className="text-white/20">#{room.id.toUpperCase()}</span></span>
                </div>

                <h3 className="mb-8 text-4xl font-black text-white tracking-tighter leading-none italic uppercase group-hover:text-amber-500 transition-colors">
                    {room.type} <span className="text-amber-500/20 group-hover:text-amber-500 transition-colors">_</span>
                </h3>
                
                {/* Amenities */}
                <div className="mb-10 flex flex-wrap gap-3">
                    {room.amenities?.map((amenity: string, i: number) => (
                        <span key={i} className="rounded-xl bg-slate-950/60 px-4 py-2 text-[9px] font-black text-white/30 border border-white/5 shadow-xl capitalize tracking-[0.1em] italic group-hover:border-amber-500/20 transition-all">
                            {amenity}
                        </span>
                    ))}
                    {(!room.amenities || room.amenities.length === 0) && (
                        <span className="text-[9px] text-white/5 italic font-black uppercase tracking-widest">No metadata perks.</span>
                    )}
                </div>

                {/* Footer Section */}
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-10">
                    <div className="flex flex-col">
                        <div className="flex items-center text-4xl font-black text-white tracking-tighter italic leading-none">
                            <span className="text-sm font-black text-amber-500 mr-2 self-start mt-1">₹</span>
                            <span>{room.price}</span>
                            <span className="text-[11px] font-black text-white/10 ml-3 uppercase tracking-widest not-italic">/ CYCLE</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onBook?.(room.id)}
                        disabled={!isAvailable}
                        className={`h-16 px-12 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group/btn ${
                            isAvailable 
                            ? 'bg-amber-500 text-slate-950 shadow-[0_15px_40px_rgba(245,158,11,0.2)] hover:bg-amber-400 hover:scale-[1.05] active:scale-95'
                            : 'bg-slate-950 text-white/10 cursor-not-allowed border border-white/5'
                        }`}
                    >
                        <span className="relative z-10">{isAvailable ? 'Secure Node' : 'Locked'}</span>
                        {isAvailable && (
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 pointer-events-none" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
