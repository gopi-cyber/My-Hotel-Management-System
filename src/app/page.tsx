'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BellRing, ConciergeBell, Hotel, KeyRound, MapPin, Menu, ShieldCheck, Sparkles, Star, UtensilsCrossed, Waves, Wifi } from 'lucide-react';
import { ScrollHero } from '@/components/ScrollHero';

const rooms = [
  { name: 'Ocean Deluxe', detail: 'King bed · 2 guests · Ocean view', price: '₹20,800', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Garden Family Suite', detail: '2 queen beds · 4 guests · Garden view', price: '₹24,200', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Presidential Penthouse', detail: '2 king beds · 4 guests · Private terrace', price: '₹41,700', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85' },
];
const services = [
  { icon: ConciergeBell, title: 'Thoughtful service', text: 'A dedicated team available around the clock, from arrival to departure.' },
  { icon: UtensilsCrossed, title: 'Seasonal dining', text: 'Locally sourced menus, private dining and breakfast served at your pace.' },
  { icon: Waves, title: 'Wellness & calm', text: 'Restorative treatments, a quiet pool and spaces designed to help you reset.' },
  { icon: Wifi, title: 'Effortless comfort', text: 'Fast Wi-Fi, considered workspaces and every modern detail handled.' },
];

export default function LandingPage() {
 return <main className="site-shell">
  <header className="site-nav">
   <button className="menu-pill" type="button"><Menu size={18}/> Menu</button>
   <Link href="/" className="brand" aria-label="LuxeStay home"><span className="brand-mark"><Hotel size={21}/></span><span><strong>LuxeStay</strong><small>Hotels & Residences</small></span></Link>
   <div className="site-nav-actions"><Link href="/login" className="text-link">Sign in</Link><Link href="/register" className="button button-dark">Book <ArrowRight size={16}/></Link></div>
  </header>
  <ScrollHero/>
  <section className="booking-strip"><div><span>Destination</span><strong><MapPin size={17}/> LuxeStay Grand, Goa</strong></div><div><span>Check in</span><strong>Select date</strong></div><div><span>Check out</span><strong>Select date</strong></div><div><span>Guests</span><strong>2 guests, 1 room</strong></div><Link href="/register" className="button button-dark">Check availability</Link></section>
  <section id="story" className="intro-section content-width"><div className="intro-label"><Sparkles size={18}/><span>Welcome to LuxeStay</span></div><div className="intro-copy"><h2>Hospitality that feels<br/><em>beautifully natural.</em></h2><p>We believe the best hotels do more than impress. They help you feel at ease. Every detail at LuxeStay—from the light in your room to the warmth of your welcome—is designed around that simple idea.</p><Link href="/register" className="inline-arrow">Plan your stay <ArrowRight size={18}/></Link></div></section>
  <section id="stay" className="rooms-section"><div className="content-width section-heading"><div><span className="eyebrow">Rooms & suites</span><h2>Rest, your way.</h2></div><p>Serene spaces, generous comfort and thoughtful details for every kind of traveller.</p></div><div className="room-grid content-width">{rooms.map(room=><article key={room.name} className="room-tile"><div className="room-photo"><Image src={room.image} alt={room.name} fill sizes="(max-width: 900px) 100vw, 33vw"/></div><div className="room-info"><span>{room.detail}</span><h3>{room.name}</h3><div><p>From <strong>{room.price}</strong> / night</p><Link href="/register"><ArrowRight size={19}/></Link></div></div></article>)}</div></section>
  <section id="experience" className="experience-section content-width"><div className="experience-image"><Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85" alt="Peaceful spa at LuxeStay" fill sizes="(max-width: 900px) 100vw, 50vw"/></div><div className="experience-copy"><span className="eyebrow">The LuxeStay experience</span><h2>Everything you need.<br/><em>Nothing you don’t.</em></h2><p>Considered service meets relaxed elegance. Explore a stay shaped by the way you want to feel.</p><div className="service-list">{services.map(({icon:Icon,title,text})=><div key={title}><span><Icon size={20}/></span><p><strong>{title}</strong><small>{text}</small></p></div>)}</div></div></section>
  <section className="trust-band"><div className="content-width">{[[Star,'4.9 / 5','Guest rating'],[ShieldCheck,'Secure','Direct booking'],[KeyRound,'24 / 7','Guest support'],[BellRing,'5 min','Average response']].map(([Icon,val,label])=>{const I=Icon as typeof Star;return <div key={String(label)}><I size={22}/><strong>{String(val)}</strong><span>{String(label)}</span></div>})}</div></section>
  <section className="closing-cta"><span className="eyebrow-light">Your room is waiting</span><h2>Make yourself<br/><em>at home.</em></h2><Link href="/register" className="button button-gold">Reserve your stay <ArrowRight size={17}/></Link></section>
  <footer className="site-footer"><div className="content-width"><div className="brand footer-brand"><span className="brand-mark"><Hotel size={21}/></span><span><strong>LuxeStay</strong><small>Hotels & Residences</small></span></div><p>Thoughtful stays. Beautifully personal.</p><div><Link href="/login">Guest portal</Link><Link href="/register">Reservations</Link><a href="#experience">Experiences</a></div><small>© 2026 LuxeStay Hospitality. All rights reserved.</small></div></footer>
 </main>;
}
