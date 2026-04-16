'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '@/lib/features/bookingSlice';
import { fetchUserServices, createService } from '@/lib/features/serviceSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Coffee, Home, Zap, ShieldAlert, AlertCircle, Clock, User, LogOut, Plus, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const user = useSelector((state: RootState) => state.user.user);
  const bookings = useSelector((state: RootState) => state.bookings.items);
  const services = useSelector((state: RootState) => state.services.items);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const serviceOptions = [
    { name: 'Room Service', icon: Coffee, color: 'text-amber-500' },
    { name: 'Housekeeping', icon: Home, color: 'text-indigo-400' },
    { name: 'Laundry Service', icon: Zap, color: 'text-amber-500' },
    { name: 'Security Assistance', icon: ShieldAlert, color: 'text-red-500' },
  ];

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    dispatch(fetchUserBookings(user.id));
    dispatch(fetchUserServices(user.id));
  }, [user, dispatch, router]);

  const handleServiceRequest = async () => {
    if (!serviceName || !description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await dispatch(createService({
        guestId: user!.id,
        roomId: bookings.find(b => b.status === 'checked_in')?.roomId || '',
        serviceName,
        description,
        status: 'pending',
      }));
      setSuccess('Service request submitted successfully!');
      setServiceName('');
      setDescription('');
      setShowServiceModal(false);
      setTimeout(() => setSuccess(''), 2000);
    } catch {
      setError('Failed to submit service request');
    }
  };

  const activeBooking = bookings.find(b => b.status === 'checked_in');

  return (
    <main className="flex min-h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      <style jsx>{`
          .glass-sidebar {
              background: rgba(6, 9, 15, 0.8);
              backdrop-filter: blur(20px);
              border-right: 1px solid rgba(255, 255, 255, 0.03);
          }
      `}</style>
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="z-20 w-72 glass-sidebar flex flex-col p-8 space-y-10 h-screen">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <User className="text-slate-950" size={20} />
          </div>
          <span className="text-lg font-black tracking-tighter text-white">IDENTITY</span>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 shadow-xl">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic leading-none mb-4">Verified Credentials</p>
            <p className="font-black text-white italic text-lg tracking-tight mb-1">{user?.name || user?.username}</p>
            <p className="text-[10px] text-white/40 font-bold mb-4">{user?.email}</p>
            <p className="text-[9px] px-3 py-1 bg-amber-500 text-slate-950 rounded-xl w-fit font-black uppercase tracking-widest">
              {user?.role || 'Guest'}
            </p>
          </div>

          <div className="bg-slate-950/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 shadow-xl">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic leading-none mb-4">Registry Node</p>
            {activeBooking ? (
              <>
                <p className="font-black text-white italic text-lg tracking-tight">Suite #{activeBooking.roomId}</p>
                <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest mt-1">Status: Active Sync</p>
              </>
            ) : (
              <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">Status: Offline</p>
            )}
          </div>
        </div>

        <Link href="/dashboard">
          <button className="w-full px-6 py-4 rounded-2xl bg-slate-900 border border-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:text-amber-500 transition-all active:scale-95 shadow-lg shadow-black/20">
            Back to Dashboard
          </button>
        </Link>
        
        <Link href="/">
          <button className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 border border-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-all active:scale-95 shadow-lg shadow-black/20">
            <LogOut size={16} /> Logout Protocol
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto bg-slate-950/20">
        <div className="p-10 space-y-12">
          {error && (
            <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          {success && (
            <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
              ✓ {success}
            </div>
          )}

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Registry Overview<span className="text-amber-500">.</span></h1>
            <p className="text-xs font-black text-white/20 uppercase tracking-[0.5em] italic mt-2">Manage your guest telemetry and active services in real-time.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Stays', value: bookings.length },
              { label: 'Active Sync', value: activeBooking ? 'VERIFIED' : 'NULL', highlight: activeBooking ? 'text-amber-500' : 'text-white/10' },
              { label: 'Service Hub', value: services.length },
              { label: 'Pending Cycle', value: services.filter(s => s.status === 'pending').length, highlight: 'text-indigo-400' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 space-y-3 shadow-xl hover:bg-slate-900/60 transition-all">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-4xl font-black italic tracking-tighter ${stat.highlight || 'text-white'}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase">Service Protocol Hub <span className="text-amber-500">_</span></h2>
              <button
                onClick={() => setShowServiceModal(true)}
                className="flex items-center gap-3 px-8 py-3.5 bg-amber-500 text-slate-950 rounded-2xl hover:bg-amber-400 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95"
              >
                <Plus size={18} /> Request Identity Transfer
              </button>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    setServiceName(option.name);
                    setShowServiceModal(true);
                  }}
                  className={`p-8 rounded-[2.5rem] bg-slate-900/40 border-2 border-dashed border-white/5 transition-all hover:border-solid hover:border-amber-500/30 hover:bg-slate-900 group relative overflow-hidden`}
                >
                  <div className="absolute top-[-20%] right-[-20%] h-32 w-32 bg-amber-500/5 blur-[40px] rounded-full pointer-events-none" />
                  <option.icon size={36} className={`mb-4 group-hover:scale-110 transition-transform ${option.color}`} />
                  <p className="font-black text-white uppercase italic tracking-widest text-[10px] group-hover:text-amber-500 transition-colors leading-relaxed">{option.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Requests */}
          <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border-4 border-white/5 shadow-2xl">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-10">Active Protocol Log</h2>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-slate-950/60 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all hover:bg-slate-950 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/10 uppercase tracking-widest italic">Identity: {service.id.slice(-6).toUpperCase()}</p>
                        <p className="font-black text-white text-xl italic tracking-tighter group-hover:text-amber-500 transition-colors uppercase">
                          {service.serviceName}
                        </p>
                      </div>
                      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg ${
                        service.status === 'completed' ? 'bg-amber-500 text-slate-950' :
                        service.status === 'in_progress' ? 'bg-indigo-600 text-white' :
                        service.status === 'pending' ? 'bg-slate-900 text-white/40 border border-white/5' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {service.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white/40 leading-relaxed italic mb-8">&quot;{service.description}&quot;</p>
                    <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                      <Clock size={14} className="text-white/10" />
                      <p className="text-[9px] font-black text-white/10 uppercase tracking-widest italic">
                        TIMESTAMP: {new Date(service.createdAt || '').toLocaleString().toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                  <div className="h-1 bg-white/5 w-24 mx-auto mb-6 rounded-full" />
                  <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] italic leading-relaxed">System Idle: No Active Service Decoders Registered.</p>
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border-4 border-white/5 shadow-2xl mb-20">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-10">Historical Registry Archive</h2>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.slice(-5).reverse().map((booking) => (
                  <div key={booking.id} className="bg-slate-950/40 p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-slate-950/80 transition-colors group">
                    <div className="flex items-center gap-8 w-full md:w-auto">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white/10 border border-white/5 group-hover:text-amber-500 transition-colors">
                            <Bookmark size={24} />
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-lg tracking-tight italic uppercase">Booking #{booking.id.slice(-6).toUpperCase()}</p>
                          <p className="text-xs font-black text-white/20 uppercase tracking-widest italic mt-1">{booking.checkInDate} <span className="mx-2 text-white/5">—</span> {booking.checkOutDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-[9px] font-black text-white/10 uppercase tracking-widest italic">CAPITAL VALUE</p>
                        <p className="text-xl font-black text-amber-500 italic">₹{booking.totalPrice}</p>
                      </div>
                      <span className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl ${
                        booking.status === 'checked_out' ? 'bg-slate-900 text-white/20 border border-white/5' :
                        booking.status === 'checked_in' ? 'bg-indigo-600 text-white' :
                        booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                        'bg-amber-500 text-slate-950'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] italic">Archive Data: Unavailable.</p>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] p-12 max-w-lg w-full space-y-10 border-4 border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] h-64 w-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="text-center space-y-3 relative">
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Service Manifest Creation<span className="text-amber-500">.</span></h2>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Initializing guest hospitality handshake</p>
            </div>

            <div className="space-y-6 relative">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-6">Decoder Selection</label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl bg-slate-950/50 border border-white/5 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-white shadow-inner appearance-none uppercase tracking-widest italic"
                >
                  <option value="" className="bg-slate-900">SELECT PROTOCOL...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.name} value={opt.name} className="bg-slate-900">{opt.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-6">Request Parameters</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="INPUT MANUAL TELEMETRY DATA HERE..."
                  className="w-full px-8 py-6 rounded-[2.5rem] bg-slate-950/50 border border-white/5 focus:outline-none focus:border-amber-500/30 transition-all text-sm font-bold text-white shadow-inner h-32 resize-none placeholder:text-white/5 italic"
                />
              </div>
            </div>

            <div className="flex gap-6 relative">
              <button
                onClick={() => setShowServiceModal(false)}
                className="flex-1 h-16 rounded-3xl bg-slate-950 text-white/20 font-black text-[10px] uppercase tracking-[0.3em] hover:text-red-500 transition-all active:scale-95 border border-white/5"
              >
                Abort
              </button>
              <button
                onClick={handleServiceRequest}
                className="flex-1 h-16 rounded-3xl bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
