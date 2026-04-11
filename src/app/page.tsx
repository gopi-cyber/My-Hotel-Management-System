'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Hotel, ArrowRight, Star, ShieldCheck, Coffee, Wifi, Waves, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
            {/* Header / Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Hotel className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-emerald-950 uppercase">GrandStay</span>
                    </div>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-semibold text-emerald-800/60 hover:text-emerald-700 transition-colors">Features</a>
                        <a href="#rooms" className="text-sm font-semibold text-emerald-800/60 hover:text-emerald-700 transition-colors">Rooms</a>
                        <Link href="/login" className="text-sm font-bold text-emerald-950 hover:text-emerald-700 transition-colors">Log In</Link>
                        <Link href="/register" className="h-11 px-6 flex items-center justify-center rounded-xl bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-800 transition-all active:scale-95">
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-widest animate-fade-in">
                            <Star size={14} className="fill-emerald-700" />
                            Premium Hospitality Experience
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-emerald-950">
                            Your Journey to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-amber-500">Excellence</span> Begins Here.
                        </h1>
                        <p className="text-lg text-emerald-800/70 leading-relaxed max-w-lg">
                            Experience world-class service, breathtaking views, and modern comforts. GrandStay offers more than just a room – we offer a sanctuary for your finest moments.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="/login" className="w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-3 rounded-2xl bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-500/40 hover:bg-emerald-800 transition-all hover:-translate-y-1">
                                Book Your Stay <ArrowRight size={20} />
                            </Link>
                            <a href="#rooms" className="w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-3 rounded-2xl bg-white text-emerald-900 font-bold border-2 border-emerald-50 hover:border-emerald-200 transition-all">
                                View Rooms
                            </a>
                        </div>
                        <div className="flex items-center gap-8 pt-4">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-emerald-50 overflow-hidden">
                                        <div className="h-full w-full bg-gradient-to-br from-emerald-200 to-amber-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">U{i}</div>
                                    </div>
                                ))}
                                <div className="h-10 w-10 rounded-full border-2 border-white bg-emerald-700 flex items-center justify-center text-[10px] font-bold text-white">+5k</div>
                            </div>
                            <p className="text-sm font-medium text-emerald-800/60">Trusted by over <span className="text-emerald-950 font-bold">5,000+</span> happy guests</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
                        <div className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <Image 
                                src="/images/hero.png" 
                                alt="Luxury Hotel Hero" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                        {/* Floating Status Cards */}
                        <div className="absolute -left-6 bottom-20 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl space-y-2 border border-white/50 animate-bounce-slow">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-500" size={16} />
                                <span className="text-xs font-bold text-emerald-950">100% Secure Booking</span>
                            </div>
                        </div>
                        <div className="absolute -right-6 top-20 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl space-y-2 border border-white/50 animate-bounce-slow delay-150">
                            <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                            </div>
                            <span className="text-xs font-bold text-emerald-950">5-Star Guest Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats/Badges Section */}
            <section className="py-12 bg-emerald-50/30 border-y border-emerald-50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: <MapPin />, label: "Global Locations", val: "24+" },
                        { icon: <Users />, label: "Professional Staff", val: "500+" },
                        { icon: <Star />, label: "Luxury Suites", val: "120+" },
                        { icon: <ShieldCheck />, label: "Verified Safety", val: "100%" },
                    ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-2">
                            <div className="text-emerald-700 mb-1">{s.icon}</div>
                            <div className="text-2xl font-bold text-emerald-950">{s.val}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/50">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-[0.3em]">Excellence Defined</h2>
                            <h3 className="text-4xl font-bold text-emerald-950 leading-tight">Elevating Every Aspect <br />of Your Residency</h3>
                        </div>
                        <p className="text-emerald-800/60 max-w-sm">From complimentary high-speed internet to custom pillow menus, we ensure every detail of your stay is perfection.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Wifi />, title: "Ultra Fast Wi-Fi", desc: "Gigabit speed across all rooms and common areas." },
                            { icon: <Coffee />, title: "Premium Breakfast", desc: "Start your day with gourmet organic options." },
                            { icon: <Waves />, title: "Infinity Pool", desc: "Relax with a panoramic view of the skyline." },
                            { icon: <Clock />, title: "24/7 Concierge", desc: "Round-the-clock service for your every need." },
                        ].map((f, idx) => (
                            <div key={idx} className="group p-8 rounded-[2.5rem] bg-emerald-50/20 hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/10 transition-all border border-transparent hover:border-emerald-100">
                                <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-lg mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                                    {f.icon}
                                </div>
                                <h4 className="text-lg font-bold text-emerald-950 mb-2">{f.title}</h4>
                                <p className="text-sm text-emerald-800/60 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Room Categories */}
            <section id="rooms" className="py-24 bg-emerald-950 text-white overflow-hidden rounded-[4rem] mx-4 mb-24 relative">
                <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-emerald-900/50 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden group">
                        <Image 
                            src="/images/rooms.png" 
                            alt="Luxury Rooms collage" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
                        <div className="absolute bottom-10 left-10">
                            <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Editor&apos;s Choice</p>
                            <h4 className="text-3xl font-bold">The Presidential Suite</h4>
                        </div>
                    </div>
                    
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.3em]">Curation</h2>
                            <h3 className="text-4xl font-bold leading-tight">Room for Every <br />Desire and Dream</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { title: "Standard Loft", price: "$199", tag: "Cozy & Modern" },
                                { title: "Deluxe Ocean View", price: "$349", tag: "Panoramic Views" },
                                { title: "Premium Penthouse", price: "$799", tag: "Ultimate Luxury" },
                            ].map((r, idx) => (
                                <div key={idx} className="flex items-center justify-between p-6 rounded-3xl border border-white/10 hover:border-amber-400/50 hover:bg-white/5 transition-all group">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{r.tag}</p>
                                        <h4 className="text-xl font-bold group-hover:text-amber-400 transition-colors">{r.title}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-emerald-400">Starting at</p>
                                        <p className="text-2xl font-bold">{r.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Link href="/login" className="inline-flex h-14 px-8 items-center justify-center gap-3 rounded-2xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-all border border-emerald-600 shadow-xl shadow-emerald-950/20">
                            Check Availability <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-white border-t border-emerald-50">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-12">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Hotel className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-emerald-950 uppercase">GrandStay</span>
                    </div>
                    
                    <div className="max-w-3xl space-y-6">
                        <h4 className="text-4xl font-bold text-emerald-950 leading-tight">Ready to experience the heights of hospitality?</h4>
                        <p className="text-emerald-800/60">Join our rewards program and get 15% off your first prestige booking. Our team is ready to welcome you home.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/register" className="h-14 px-8 flex items-center justify-center gap-3 rounded-2xl bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-500/40 hover:bg-emerald-800 transition-all">
                                Create Account
                            </Link>
                            <Link href="/login" className="h-14 px-8 flex items-center justify-center gap-3 rounded-2xl bg-white text-emerald-950 font-bold border border-emerald-100 hover:border-emerald-700 transition-all">
                                Staff Portal
                            </Link>
                        </div>
                    </div>
                    
                    <div className="w-full pt-12 border-t border-emerald-50 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-emerald-800/40 uppercase tracking-widest gap-6">
                        <p>© 2026 GrandStay Hotels International</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-emerald-700 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-emerald-700 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-emerald-700 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
