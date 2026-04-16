'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { SplitImage } from '@/components/SplitImage';
import { 
    Hotel, 
    Star, 
    ArrowRight, 
    CheckCircle2, 
    MapPin, 
    Users, 
    ShieldCheck, 
    Wifi, 
    Coffee, 
    Waves, 
    Clock 
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-900 overflow-x-hidden bg-slate-50 relative">
            <ParticleBackground />
            {/* Header / Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/40 backdrop-blur-3xl border-b border-white/5 shadow-2xl">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.2)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                            <Hotel className="text-white" size={26} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold tracking-tight text-slate-900 uppercase leading-none">Vortex</span>
                            <span className="text-amber-600 text-[10px] font-bold tracking-widest uppercase">Hospitality</span>
                        </div>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-12">
                        <a href="#features" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">Features</a>
                        <a href="#rooms" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">Rooms</a>
                        <Link href="/login" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">Login</Link>
                        <Link href="/register" className="h-14 px-8 flex items-center justify-center rounded-2xl bg-amber-500 text-white text-[11px] font-bold shadow-lg hover:bg-amber-400 transition-all active:scale-95 uppercase tracking-widest">
                            Book Your Stay
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] bg-amber-500/10 blur-[150px] rounded-full opacity-30 animate-pulse" />
                <div className="absolute bottom-[10%] right-[-10%] h-[500px] w-[500px] bg-indigo-500/10 blur-[150px] rounded-full opacity-30 animate-pulse delay-700" />

                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12 relative z-10"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                            <Star size={18} className="fill-amber-500" />
                            Premium Hospitality Experience
                        </div>
                        <h1 className="text-7xl lg:text-9xl font-bold leading-[0.9] text-slate-900 tracking-tight uppercase">
                            Luxury <br />
                            <span className="text-amber-500">Living</span> <br/>
                            Redefined.
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-lg font-semibold uppercase tracking-tight">
                            Experience high-fidelity hospitality, personalized comfort, and premium service. Vortex offers more than just a stay – we offer a home for your finest moments.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <Link href="/register" className="w-full sm:w-auto h-20 px-12 flex items-center justify-center gap-4 rounded-[2.5rem] bg-amber-500 text-white font-bold shadow-xl hover:bg-amber-400 transition-all hover:-translate-y-2 uppercase tracking-widest active:scale-95">
                                Book Now <ArrowRight size={24} />
                            </Link>
                            <a href="#rooms" className="w-full sm:w-auto h-20 px-12 flex items-center justify-center gap-4 rounded-[2.5rem] bg-white border-2 border-slate-100 text-slate-400 font-bold hover:text-slate-900 hover:border-amber-500 transition-all uppercase tracking-widest active:scale-95 shadow-sm">
                                View Rooms
                            </a>
                        </div>
                        <div className="flex items-center gap-10 pt-10 border-t border-white/5">
                            <div className="flex -space-x-4">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="h-14 w-14 rounded-2xl border-2 border-slate-950 bg-slate-800 overflow-hidden shadow-2xl group cursor-pointer hover:border-amber-500 transition-all">
                                        <div className="h-full w-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-[11px] font-black text-slate-950">NODE_{i}</div>
                                    </div>
                                ))}
                                <div className="h-14 w-14 rounded-2xl border-2 border-slate-950 bg-amber-500 flex items-center justify-center text-[11px] font-black text-slate-950 shadow-2xl">+5k</div>
                            </div>
                            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] italic">Synchronized with over <span className="text-amber-500 font-black">5,000+</span> unique node stays</p>
                        </div>
                    </motion.div>

                    <div className="relative group perspective-[2000px]">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-[4rem] blur-[150px] opacity-20 group-hover:opacity-50 transition-all duration-1000" />
                        <div className="relative aspect-[4/5] w-full rounded-[4.5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.8)] border-4 border-white/5 transition-transform duration-1000 group-hover:rotate-y-12 group-hover:rotate-x-2">
                             <SplitImage 
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
                                alt="Vortex Luxury Hub" 
                                className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                                slices={7}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Floating Status Cards */}
                        <div className="absolute -left-12 bottom-40 bg-slate-950/80 backdrop-blur-3xl p-6 rounded-[2rem] shadow-2xl space-y-3 border-2 border-white/5 animate-float skew-x-[-10deg]">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-amber-500" size={24} />
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">100% Encrypted Stay</span>
                            </div>
                        </div>
                        <div className="absolute -right-12 top-40 bg-slate-950/80 backdrop-blur-3xl p-6 rounded-[2rem] shadow-2xl space-y-4 border-2 border-white/5 animate-float-delayed skew-x-[10deg]">
                            <div className="flex items-center gap-2">
                                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" />)}
                            </div>
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Universal Tier: Luxury</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/60 border-y-2 border-white/5 backdrop-blur-3xl" />
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                    {[
                        { icon: <MapPin />, label: "Grid Hubs", val: "24+" },
                        { icon: <Users />, label: "Active Personnel", val: "500+" },
                        { icon: <Star />, label: "Nexus Suites", val: "120+" },
                        { icon: <ShieldCheck />, label: "System Uptime", val: "99.9%" },
                    ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-5 p-10 rounded-[2.5rem] bg-slate-950/40 border-2 border-white/5 hover:border-amber-500/30 hover:bg-slate-950 transition-all shadow-2xl group">
                            <div className="text-white/10 group-hover:text-amber-500 transition-colors transform group-hover:scale-125 duration-500">{s.icon}</div>
                            <div className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">{s.val}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic group-hover:text-white/40">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-40 relative">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-24"
                    >
                        <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest leading-none">Our Experience</h2>
                            <h3 className="text-6xl lg:text-8xl font-bold text-slate-900 leading-none tracking-tight uppercase">Luxury In Every <br /><span className="text-amber-500">Detail</span></h3>
                        </div>
                        <p className="text-slate-400 max-w-sm font-semibold uppercase tracking-tight leading-relaxed">From zero-latency service to custom environmental settings, we ensure every stay is perfect.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                         {[
                            { icon: <Wifi />, title: "High Speed Fiber", desc: "Super-fast internet access for every guest." },
                            { icon: <Coffee />, title: "Gourmet Dining", desc: "Professional chefs at your service 24/7." },
                            { icon: <Waves />, title: "Luxury Spa", desc: "Private relaxation and wellness treatments." },
                            { icon: <Clock />, title: "Personal Concierge", desc: "Dedicated support for all your needs." },
                        ].map((f, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group p-12 rounded-[3rem] bg-white border-2 border-slate-100 hover:border-amber-500/30 transition-all shadow-sm overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 p-8 text-slate-50">
                                    <span className="text-4xl font-bold">0{idx+1}</span>
                                </div>
                                <div className="h-20 w-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm mb-10 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                                    {f.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight uppercase group-hover:text-amber-600 transition-colors leading-none">{f.title}</h4>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed group-hover:text-slate-600 transition-colors">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Room Categories */}
            <section id="rooms" className="py-40 mx-8 mb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-white rounded-[5rem] border-4 border-slate-100 shadow-xl backdrop-blur-3xl" />
                <div className="max-w-7xl mx-auto px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/3] rounded-[4rem] overflow-hidden group border-4 border-slate-100 shadow-2xl"
                    >
                        <div className="absolute inset-0">
                            <SplitImage 
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
                                alt="Luxury Suite" 
                                className="w-full h-full"
                                slices={9}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-16 left-16 space-y-4">
                            <p className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">Top Rated</p>
                            <h4 className="text-6xl font-bold tracking-tight text-white uppercase leading-none">The Luxury <br />PENTHOUSE</h4>
                        </div>
                    </motion.div>
                    
                    <div className="space-y-16">
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Pricing</h2>
                            <h3 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight text-slate-900 uppercase">Our Best <br />Rooms</h3>
                        </motion.div>
                        
                        <div className="space-y-8">
                            {[
                                { title: "Standard Room", price: "₹19k", tag: "Essential Comfort", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80" },
                                { title: "Deluxe Suite", price: "₹34k", tag: "Premium Quality", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" },
                                { title: "Vortex Suite", price: "₹79k", tag: "Ultimate Luxury", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
                            ].map((r, idx) => (
                                <motion.div 
                                    key={idx} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-10 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 hover:border-amber-500/30 hover:bg-white transition-all group cursor-pointer shadow-sm relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 overflow-hidden">
                                        <SplitImage src={r.img} alt={r.title} slices={5} className="w-full h-full" />
                                    </div>
                                    <div className="space-y-2 relative z-10">
                                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{r.tag}</p>
                                        <h4 className="text-3xl font-bold group-hover:text-amber-600 transition-colors uppercase tracking-tight text-slate-900 leading-none">{r.title}</h4>
                                    </div>
                                    <div className="text-right relative z-10">
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Per Night</p>
                                        <p className="text-4xl font-bold text-amber-500 tracking-tight leading-none">{r.price}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <Link href="/register" className="inline-flex h-20 px-14 items-center justify-center gap-4 rounded-[2.5rem] bg-amber-500 text-white font-bold hover:bg-amber-400 transition-all uppercase tracking-widest shadow-xl active:scale-95">
                            Book Now <ArrowRight size={24} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-32 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-500/5 opacity-50" />
                <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center space-y-20 relative z-10">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="h-14 w-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-transform duration-700 group-hover:rotate-12">
                            <Hotel className="text-slate-950" size={30} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">Vortex</span>
                            <span className="text-amber-500 text-[11px] font-black tracking-[0.5em] uppercase">Hospitality</span>
                        </div>
                    </Link>
                    
                    <div className="max-w-4xl space-y-12">
                        <h4 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">Ready to Initialize <br /><span className="text-amber-500">Premium Residency?</span></h4>
                        <p className="text-white/20 text-xl font-black uppercase italic tracking-tight leading-relaxed max-w-2xl mx-auto">Join the Obsidian tier program and get 15% off your first prestige stay. Our personnel is standby for initialization.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
                            <Link href="/register" className="w-full sm:w-auto h-20 px-14 flex items-center justify-center gap-4 rounded-[2.5rem] bg-amber-500 text-slate-950 font-black shadow-[0_20px_40px_rgba(245,158,11,0.3)] hover:bg-amber-400 transition-all uppercase tracking-[0.4em] italic active:scale-95">
                                Initialize Account
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto h-20 px-14 flex items-center justify-center gap-4 rounded-[2.5rem] bg-slate-950 border-2 border-white/5 text-white/40 font-black hover:text-white hover:border-amber-500/30 transition-all uppercase tracking-[0.4em] italic active:scale-95 shadow-2xl">
                                System Portal
                            </Link>
                        </div>
                    </div>
                    
                    <div className="w-full pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic gap-10">
                        <p>© 2026 Vortex_Hospitality_Systems_Nexus</p>
                        <div className="flex gap-16">
                            <a href="#" className="hover:text-amber-500 transition-colors">Encryption</a>
                            <a href="#" className="hover:text-amber-500 transition-colors">Protocols</a>
                            <a href="#" className="hover:text-amber-500 transition-colors">Nexus_Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
