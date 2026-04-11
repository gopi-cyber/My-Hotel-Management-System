'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '@/lib/features/bookingSlice';
import { fetchUserServices, createService } from '@/lib/features/serviceSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Coffee, Home, Zap, ShieldAlert, AlertCircle, CheckCircle, Clock, User, LogOut, Plus } from 'lucide-react';
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
    { name: 'Room Service', icon: Coffee, color: 'bg-orange-100 text-orange-700' },
    { name: 'Housekeeping', icon: Home, color: 'bg-green-100 text-green-700' },
    { name: 'Laundry Service', icon: Zap, color: 'bg-blue-100 text-blue-700' },
    { name: 'Security Assistance', icon: ShieldAlert, color: 'bg-red-100 text-red-700' },
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
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 text-slate-800 font-sans overflow-hidden">
      {/* Mesh Decor */}
      <div className="absolute top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-100/40 blur-[120px] pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="z-20 w-72 glass-morphism border-r border-white/60 flex flex-col p-8 space-y-10 h-screen">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <User className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold text-slate-900">PROFILE</span>
        </div>

        <div className="flex-1 space-y-4">
          <div className="glass-morphism p-4 rounded-2xl border border-white/60">
            <p className="text-sm text-slate-600">Welcome</p>
            <p className="font-bold text-slate-900">{user?.name || user?.username}</p>
            <p className="text-xs text-slate-600">{user?.email}</p>
            <p className="text-xs mt-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded w-fit font-semibold">
              {user?.role || 'Guest'}
            </p>
          </div>

          <div className="glass-morphism p-4 rounded-2xl border border-white/60">
            <p className="text-sm text-slate-600">Active Booking</p>
            {activeBooking ? (
              <>
                <p className="font-bold text-slate-900">Room #{activeBooking.roomId}</p>
                <p className="text-xs text-slate-600">Checked In</p>
              </>
            ) : (
              <p className="text-xs text-slate-600">No active booking</p>
            )}
          </div>
        </div>

        <Link href="/dashboard">
          <button className="w-full px-4 py-2 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all">
            Back to Dashboard
          </button>
        </Link>
        
        <Link href="/">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto">
        <div className="p-10 space-y-10">
          {error && (
            <div className="p-4 bg-red-100 border border-red-300 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">My Profile & Services</h1>
            <p className="text-slate-600 mt-2">Manage your stay and request hotel services</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-morphism p-6 rounded-2xl border border-white/60 space-y-2">
              <p className="text-slate-600 text-sm">Total Stays</p>
              <p className="text-3xl font-bold text-slate-900">{bookings.length}</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl border border-white/60 space-y-2">
              <p className="text-slate-600 text-sm">Active Booking</p>
              <p className="text-3xl font-bold text-green-600">{activeBooking ? '✓' : '—'}</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl border border-white/60 space-y-2">
              <p className="text-slate-600 text-sm">Service Requests</p>
              <p className="text-3xl font-bold text-slate-900">{services.length}</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl border border-white/60 space-y-2">
              <p className="text-slate-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{services.filter(s => s.status === 'pending').length}</p>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Hotel Services</h2>
              <button
                onClick={() => setShowServiceModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold"
              >
                <Plus size={20} /> Request Service
              </button>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    setServiceName(option.name);
                    setShowServiceModal(true);
                  }}
                  className={`p-4 rounded-xl border-2 border-dashed transition-all hover:border-solid ${option.color}`}
                >
                  <option.icon size={28} className="mb-2" />
                  <p className="font-semibold text-sm">{option.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Requests */}
          <div className="glass-morphism p-6 rounded-2xl border border-white/60">
            <h2 className="text-xl font-bold text-slate-900 mb-6">My Service Requests</h2>
            {services.length > 0 ? (
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="bg-white/40 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-2">
                          {service.serviceName}
                          {service.status === 'completed' && <CheckCircle size={18} className="text-green-600" />}
                          {service.status === 'pending' && <Clock size={18} className="text-yellow-600" />}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.status === 'completed' ? 'bg-green-100 text-green-700' :
                        service.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        service.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {service.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Request ID: {service.id} • Created: {new Date(service.createdAt || '').toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 text-center py-8">No service requests yet </p>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="glass-morphism p-6 rounded-2xl border border-white/60">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Bookings</h2>
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.slice(-5).reverse().map((booking) => (
                  <div key={booking.id} className="bg-white/40 p-4 rounded-lg flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">Booking #{booking.id}</p>
                      <p className="text-sm text-slate-600">{booking.checkInDate} to {booking.checkOutDate}</p>
                      <p className="text-sm text-slate-600">{booking.nights} nights • ${booking.totalPrice}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'checked_out' ? 'bg-gray-100 text-gray-700' :
                      booking.status === 'checked_in' ? 'bg-green-100 text-green-700' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 text-center py-8">No bookings yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Request a Service</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Service Type</label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your service request..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowServiceModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-slate-900 font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleServiceRequest}
                className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
