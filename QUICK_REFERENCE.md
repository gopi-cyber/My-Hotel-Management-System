# ⚡ LuxeStay - Developer Quick Reference

## 🚀 Quick Start (Copy-Paste Ready)

```bash
# Navigate to project
cd My-Hotel-Management-System

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Start production server
npm start
```

**Then open**: http://localhost:3000

---

## 🔐 Login Credentials

```
👨‍💼 Admin:        username: admin      password: 123
👥 Receptionist:   username: staff      password: 123  
🛎️ Guest:         username: new_guest  password: 123
```

---

## 📁 Project Root Files

| File | Purpose |
|------|---------|
| `README.md` | Getting started guide |
| `DEPLOYMENT_GUIDE.md` | How to deploy |
| `SETUP_GUIDE.md` | Complete technical setup |
| `PROJECT_SUMMARY.md` | Project completion report |
| `db.json` | Database file (auto-created) |
| `start.bat` | Quick start (Windows) |
| `start.sh` | Quick start (Linux/Mac) |

---

## 🎯 Key Pages & URLs

| Page | URL | File | Role |
|------|-----|------|------|
| Login | `/` | `app/page.tsx` | All |
| Register | `/register` | `app/register/page.tsx` | New users |
| Dashboard | `/dashboard` | `app/dashboard/page.tsx` | Guest |
| Profile | `/profile` | `app/profile/page.tsx` | Guest |
| Receptionist | `/receptionist` | `app/receptionist/page.tsx` | Receptionist |
| Admin | `/admin` | `app/admin/page.tsx` | Admin |

---

## 🔌 API Endpoints

```
GET  /api/rooms              → All rooms
POST /api/rooms              → Create room
PUT  /api/rooms              → Update room

GET  /api/bookings           → All bookings
POST /api/bookings           → Create booking
PUT  /api/bookings           → Update booking

GET  /api/services           → All services
POST /api/services           → Create request
PUT  /api/services           → Update request

GET  /api/staff              → All staff
POST /api/staff              → Add staff
PUT  /api/staff              → Update staff

POST /api/checkin            → Check-in/out
```

---

## 📊 Redux Slices

```typescript
// Import & use
import { fetchRooms, addRoom } from '@/lib/features/roomSlice';
import { fetchBookings, updateBooking } from '@/lib/features/bookingSlice';
import { fetchServices, createService } from '@/lib/features/serviceSlice';
import { fetchStaff } from '@/lib/features/staffSlice';
import { loginUser } from '@/lib/features/userSlice';
```

---

## 🗂️ Component Locations

```
src/components/
├── BookingModal.tsx
├── Navbar.tsx
├── RoomCard.tsx
├── ServiceRequestModal.tsx
└── Admin/
    ├── ReservationTable.tsx
    ├── RoomTable.tsx
    ├── StaffTable.tsx
    ├── ReportDetailModal.tsx
    └── ReservationDetailModal.tsx
```

---

## 🎨 Styling Classes

**Color Theme:**
```css
Primary:    bg-indigo-600, text-indigo-600
Secondary:  bg-cyan-600, text-cyan-600
Success:    bg-green-600, text-green-600
Danger:     bg-red-600, text-red-600
```

**Glassmorphism:**
```css
.glass-morphism {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 20px 20px 60px #d1d9e6;
}
```

---

## 🧬 Redux Pattern

```typescript
// Async thunk
export const fetchData = createAsyncThunk(
  'feature/fetch',
  async () => {
    const res = await fetch('/api/data');
    return res.json();
  }
);

// Use in component
const dispatch = useDispatch();
const { items, status } = useSelector(state => state.feature);

useEffect(() => {
  dispatch(fetchData());
}, []);
```

---

## 🔧 Development Commands

```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
```

---

## 📦 Key Dependencies

```json
{
  "next": "16.2.2",
  "react": "19",
  "typescript": "~5.0",
  "@reduxjs/toolkit": "latest",
  "tailwindcss": "latest",
  "lucide-react": "latest"
}
```

---

## 🐛 Quick Fixes

**Port 3000 already in use?**
```bash
npx kill-port 3000
```

**Clear build cache:**
```bash
rm -rf .next
npm run build
```

**Reset database:**
```bash
rm db.json
npm run build  # Auto-recreates db.json
```

---

## 🚀 Deployment Quick Links

**Vercel**:
```bash
vercel deploy
```

**Docker**:
```bash
docker build -t luxestay . && docker run -p 3000:3000 luxestay
```

**PM2** (Node.js):
```bash
pm2 start npm --name "hotel" -- start
```

---

## 📱 Responsive Breakpoints

```css
Mobile:  320px - 640px
Tablet:  641px - 1024px
Desktop: 1025px+
```

---

## 🎯 File Examples

### API Route
```typescript
// app/api/rooms/route.ts
export async function GET() {
  const db = readDB();
  return Response.json({ rooms: db.rooms });
}
```

### Redux Slice
```typescript
// src/lib/features/roomSlice.ts
export const fetchRooms = createAsyncThunk(
  'rooms/fetch',
  async () => {
    const res = await fetch('/api/rooms');
    return res.json();
  }
);
```

### Component
```typescript
// src/components/RoomList.tsx
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '@/lib/features/roomSlice';

export default function RoomList() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms.items);
  
  useEffect(() => {
    dispatch(fetchRooms());
  }, []);
  
  return <div>{rooms.map(...)}</div>;
}
```

---

## 📊 Database Schema

```json
{
  "rooms": [{"id","number","type","price","status","amenities"}],
  "bookings": [{"id","roomId","guestId","guestName","checkInDate","checkOutDate","totalPrice","status"}],
  "users": [{"id","username","email","password","role","name"}],
  "staff": [{"id","name","email","role","shift","status"}],
  "services": [{"id","guestId","roomId","serviceName","description","status"}],
  "checkIns": [{"id","bookingId","roomId","guestId","action","timestamp"}]
}
```

---

## ✅ QA Checklist

- [ ] All pages load
- [ ] Redux state works
- [ ] API endpoints respond
- [ ] Data persists to db.json
- [ ] Role-based access works
- [ ] Responsive on mobile
- [ ] Build completes
- [ ] No console errors

---

## 📞 Support Resources

- **Setup Issues**: See `SETUP_GUIDE.md`
- **Deployment Help**: See `DEPLOYMENT_GUIDE.md`
- **API Reference**: Check route files in `app/api/`
- **Component Guide**: See component files in `src/components/`

---

## 🌟 Pro Tips

1. Use Redux DevTools for debugging state
2. Check browser console for errors
3. Use TypeScript for type safety
4. Test in multiple browsers
5. Always run `npm run build` before deploying
6. Keep db.json backed up
7. Use `.env.local` for sensitive data

---

## 📈 Performance Tips

- Images use Unsplash CDN (fast)
- Tailwind CSS is pre-optimized
- Redux helps prevent re-renders
- API calls are async with loading states
- Build is optimized with Turbopack

---

## 🎓 Learning Path

1. Read `README.md` (5 min)
2. Run `npm run dev` (1 min)
3. Test all login roles (5 min)
4. Review `SETUP_GUIDE.md` (10 min)
5. Check API routes in `app/api/` (10 min)
6. Explore Redux in `src/lib/features/` (10 min)
7. Check components in `src/components/` (15 min)

---

**Last Updated**: April 11, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
