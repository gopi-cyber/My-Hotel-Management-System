'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Hotel, ArrowRight, Star, ShieldCheck, Coffee, Wifi, Waves, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-100 overflow-x-hidden">
            {/* Header / Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Hotel className="text-slate-900" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white uppercase italic">GrandStay</span>
                    </div>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-semibold text-white/60 hover:text-amber-400 transition-colors">Features</a>
                        <a href="#rooms" className="text-sm font-semibold text-white/60 hover:text-amber-400 transition-colors">Rooms</a>
                        <Link href="/login" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">Log In</Link>
                        <Link href="/register" className="h-11 px-6 flex items-center justify-center rounded-xl bg-amber-500 text-slate-950 text-sm font-black shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all active:scale-95 uppercase tracking-tighter">
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-3d border border-white/10 text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">
                            <Star size={14} className="fill-amber-400" />
                            Premium Hospitality Experience
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black leading-[1] text-white tracking-tighter">
                            Your Journey to <br />
                            <span className="text-gradient">Excellence</span> <br/>
                            Begins Here.
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed max-w-lg font-medium">
                            Experience world-class service, breathtaking views, and modern comforts. GrandStay offers more than just a room – we offer a sanctuary for your finest moments.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link href="/login" className="w-full sm:w-auto h-16 px-10 flex items-center justify-center gap-3 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-2xl shadow-amber-500/40 hover:bg-amber-400 transition-all hover:-translate-y-2 uppercase tracking-tighter">
                                Book Your Stay <ArrowRight size={20} />
                            </Link>
                            <a href="#rooms" className="w-full sm:w-auto h-16 px-10 flex items-center justify-center gap-3 rounded-2xl glass-panel-3d bg-white/5 text-white font-bold border border-white/10 hover:border-white/20 transition-all">
                                View Rooms
                            </a>
                        </div>
                        <div className="flex items-center gap-8 pt-6">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="h-12 w-12 rounded-full border-2 border-white/10 bg-slate-800 overflow-hidden shadow-xl">
                                        <div className="h-full w-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-[10px] font-black text-slate-900">U{i}</div>
                                    </div>
                                ))}
                                <div className="h-12 w-12 rounded-full border-2 border-white/10 bg-amber-500 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-xl">+5k</div>
                            </div>
                            <p className="text-sm font-bold text-white/40">Trusted by over <span className="text-amber-400 font-black italic">5,000+</span> happy guests</p>
                        </div>
                    </div>

                    <div className="relative group perspective-[1500px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-[3.5rem] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative aspect-[4/5] w-full rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-2">
                            <Image 
                                src="/images/hero.png" 
                                alt="Luxury Hotel Hero" 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>
                        {/* Floating Status Cards */}
                        <div className="absolute -left-8 bottom-32 glass-panel-3d p-5 rounded-2xl shadow-2xl space-y-2 border border-white/10 animate-float">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-amber-400" size={18} />
                                <span className="text-xs font-black text-white uppercase tracking-widest">100% Secure</span>
                            </div>
                        </div>
                        <div className="absolute -right-8 top-32 glass-panel-3d p-5 rounded-2xl shadow-2xl space-y-2 border border-white/10 animate-float-delayed">
                            <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                            </div>
                            <span className="text-xs font-black text-white uppercase tracking-widest">5-Star Luxury</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats/Badges Section */}
            <section className="py-16 relative">
                 <div className="absolute inset-0 bg-white/5 backdrop-blur-lg border-y border-white/5" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                    {[
                        { icon: <MapPin />, label: "Global Locations", val: "24+" },
                        { icon: <Users />, label: "Professional Staff", val: "500+" },
                        { icon: <Star />, label: "Luxury Suites", val: "120+" },
                        { icon: <ShieldCheck />, label: "Verified Safety", val: "100%" },
                    ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-3 p-6 glass-panel-3d hover:bg-white/10 transition-all border-white/5">
                            <div className="text-amber-400 mb-1">{s.icon}</div>
                            <div className="text-4xl font-black text-white tracking-tighter">{s.val}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                        <div className="space-y-6">
                            <h2 className="text-xs font-black text-amber-400 uppercase tracking-[0.5em]">Excellence Defined</h2>
                            <h3 className="text-5xl font-black text-white leading-[1.1] tracking-tighter">Elevating Every Aspect <br />of Your Residency</h3>
                        </div>
                        <p className="text-white/40 max-w-sm font-medium leading-relaxed">From complimentary high-speed internet to custom pillow menus, we ensure every detail of your stay is perfection.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Wifi />, title: "Ultra Fast Wi-Fi", desc: "Gigabit speed across all rooms and common areas." },
                            { icon: <Coffee />, title: "Premium Breakfast", desc: "Start your day with gourmet organic options." },
                            { icon: <Waves />, title: "Infinity Pool", desc: "Relax with a panoramic view of the skyline." },
                            { icon: <Clock />, title: "24/7 Concierge", desc: "Round-the-clock service for your every need." },
                        ].map((f, idx) => (
                            <div key={idx} className="group glass-panel-3d p-10 hover:bg-white/10 transition-all border-white/5">
                                <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center shadow-inner mb-8 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all border border-white/5">
                                    {f.icon}
                                </div>
                                <h4 className="text-xl font-black text-white mb-4 tracking-tight uppercase italic">{f.title}</h4>
                                <p className="text-sm text-white/40 font-medium leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Room Categories */}
            <section id="rooms" className="py-32 mx-4 mb-24 relative overflow-hidden">
                <div className="absolute inset-0 glass-panel-3d bg-slate-900/40 rounded-[4rem] border-white/10" />
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden group border border-white/10 shadow-2xl">
                        <Image 
                            src="/images/water-bg.png" 
                            alt="Luxury Rooms collage" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-1000 blur-[2px] opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        <div className="absolute bottom-12 left-12 space-y-2">
                            <p className="text-amber-400 font-black uppercase tracking-[0.4em] text-xs">Editor&apos;s Choice</p>
                            <h4 className="text-5xl font-black tracking-tighter text-white uppercase italic">The Presidential Suite</h4>
                        </div>
                    </div>
                    
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-xs font-black text-amber-400 uppercase tracking-[0.5em]">Curation</h2>
                            <h3 className="text-5xl font-black leading-tight tracking-tighter text-white">Room for Every <br />Desire and Dream</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { title: "Standard Loft", price: "$199", tag: "Cozy & Modern" },
                                { title: "Deluxe Ocean View", price: "$349", tag: "Panoramic Views" },
                                { title: "Premium Penthouse", price: "$799", tag: "Ultimate Luxury" },
                            ].map((r, idx) => (
                                <div key={idx} className="flex items-center justify-between p-8 rounded-3xl glass-panel-3d border-white/5 hover:border-amber-400/30 hover:bg-white/10 transition-all group cursor-pointer">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{r.tag}</p>
                                        <h4 className="text-2xl font-black group-hover:text-amber-400 transition-colors uppercase italic tracking-tighter text-white">{r.title}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-white/40 uppercase">Starting at</p>
                                        <p className="text-3xl font-black text-amber-400 tracking-tighter">{r.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Link href="/login" className="inline-flex h-16 px-10 items-center justify-center gap-3 rounded-2xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-all uppercase tracking-tighter shadow-xl shadow-amber-500/20">
                            Check Availability <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-lg border-t border-white/5" />
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-16 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Hotel className="text-slate-900" size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white uppercase italic">GrandStay</span>
                    </div>
                    
                    <div className="max-w-3xl space-y-8">
                        <h4 className="text-5xl font-black text-white leading-tight tracking-tighter uppercase">Ready to experience the heights of hospitality?</h4>
                        <p className="text-white/40 text-lg font-medium">Join our rewards program and get 15% off your first prestige booking. Our team is ready to welcome you home.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <Link href="/register" className="w-full sm:w-auto h-16 px-10 flex items-center justify-center gap-3 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-2xl shadow-amber-500/40 hover:bg-amber-400 transition-all uppercase tracking-tighter">
                                Create Account
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto h-16 px-10 flex items-center justify-center gap-3 rounded-2xl glass-panel-3d bg-white/5 text-white font-bold border border-white/10 hover:border-white/20 transition-all uppercase tracking-tighter">
                                Staff Portal
                            </Link>
                        </div>
                    </div>
                    
                    <div className="w-full pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs font-black text-white/20 uppercase tracking-[0.3em] gap-8">
                        <p>© 2026 GrandStay Hotels International</p>
                        <div className="flex gap-12">
                            <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
                            <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
