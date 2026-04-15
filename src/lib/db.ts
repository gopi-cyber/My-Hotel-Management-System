import fs from 'fs';
import path from 'path';
import { Room } from './features/roomSlice';
import { Booking } from './features/bookingSlice';
import { Staff } from './features/staffSlice';
import { ServiceRequest } from './features/serviceSlice';

const dbPath = path.join(process.cwd(), 'db.json');

interface Database {
  users: Array<unknown>;
  rooms: Array<Room>;
  bookings: Array<Booking>;
  staff: Array<Staff>;
  services: Array<ServiceRequest>;
  checkIns: Array<unknown>;
}

// In-memory cache to avoid excessive file I/O during parallel requests
let cachedDB: Database | null = null;

// Read database
export function readDB(): Database {
  if (cachedDB) return cachedDB;
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    cachedDB = JSON.parse(data);
    return cachedDB as Database;
  } catch {
    cachedDB = {
      users: [],
      rooms: [],
      bookings: [],
      staff: [],
      services: [],
      checkIns: [],
    };
    return cachedDB;
  }
}

// Write database
export function writeDB(data: Database): void {
  cachedDB = data;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Get all rooms
export function getRooms(): Array<Room> {
  const db = readDB();
  return db.rooms || [];
}

// Add room
export function addRoom(room: Omit<Room, 'id' | 'createdAt'>): Room {
  const db = readDB();
  const newRoom: Room = {
    ...room,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  } as Room;
  db.rooms.push(newRoom);
  writeDB(db);
  return newRoom;
}

// Update room
export function updateRoom(id: string, updates: Partial<Room>): Room {
  const db = readDB();
  const index = db.rooms.findIndex((r: Room) => r.id === id);
  if (index === -1) throw new Error('Room not found');
  db.rooms[index] = { ...db.rooms[index], ...updates } as Room;
  writeDB(db);
  return db.rooms[index];
}

// Delete room
export function deleteRoom(id: string): boolean {
  const db = readDB();
  const index = db.rooms.findIndex((r: Room) => r.id === id);
  if (index === -1) throw new Error('Room not found');
  db.rooms.splice(index, 1);
  writeDB(db);
  return true;
}

// Get bookings
export function getBookings(): Array<Booking> {
  const db = readDB();
  return db.bookings || [];
}

// Add booking
export function addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const db = readDB();
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  } as Booking;
  db.bookings.push(newBooking);
  writeDB(db);
  return newBooking;
}

// Update booking
export function updateBooking(id: string, updates: Partial<Booking>): Booking {
  const db = readDB();
  const index = db.bookings.findIndex((b: Booking) => b.id === id);
  if (index === -1) throw new Error('Booking not found');
  db.bookings[index] = { ...db.bookings[index], ...updates } as Booking;
  writeDB(db);
  return db.bookings[index];
}

// Get bookings by user
export function getBookingsByUser(userId: string): Array<Booking> {
  const db = readDB();
  return (db.bookings || []).filter((b: Booking) => b.guestId === userId);
}

// Get staff
export function getStaff(): Array<Staff> {
  const db = readDB();
  return db.staff || [];
}

// Add staff
export function addStaff(staff: Omit<Staff, 'id' | 'createdAt'>): Staff {
  const db = readDB();
  const newStaff: Staff = {
    ...staff,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  } as Staff;
  db.staff.push(newStaff);
  writeDB(db);
  return newStaff;
}

// Update staff
export function updateStaff(id: string, updates: Partial<Staff>): Staff {
  const db = readDB();
  const index = db.staff.findIndex((s: Staff) => s.id === id);
  if (index === -1) throw new Error('Staff not found');
  db.staff[index] = { ...db.staff[index], ...updates } as Staff;
  writeDB(db);
  return db.staff[index];
}

// Delete staff
export function deleteStaff(id: string): boolean {
  const db = readDB();
  const index = db.staff.findIndex((s: Staff) => s.id === id);
  if (index === -1) throw new Error('Staff not found');
  db.staff.splice(index, 1);
  writeDB(db);
  return true;
}

// Add service request
export function addServiceRequest(service: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): ServiceRequest {
  const db = readDB();
  const newService: ServiceRequest = {
    ...service,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  } as ServiceRequest;
  db.services.push(newService);
  writeDB(db);
  return newService;
}

// Get service requests
export function getServices(): Array<ServiceRequest> {
  const db = readDB();
  return db.services || [];
}

// Get services by guest
export function getServicesByGuest(guestId: string): Array<ServiceRequest> {
  const db = readDB();
  return (db.services || []).filter((s: ServiceRequest) => s.guestId === guestId);
}

// Update service status
export function updateServiceStatus(id: string, status: 'pending' | 'in_progress' | 'completed' | 'cancelled'): ServiceRequest {
  const db = readDB();
  const index = db.services.findIndex((s: ServiceRequest) => s.id === id);
  if (index === -1) throw new Error('Service not found');
  db.services[index] = { ...db.services[index], status, updatedAt: new Date().toISOString() } as unknown as ServiceRequest;
  writeDB(db);
  return db.services[index];
}

// Add check-in record
export function addCheckIn(checkIn: unknown): unknown {
  const db = readDB();
  const newCheckIn = {
    ...(checkIn as object),
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  db.checkIns.push(newCheckIn);
  writeDB(db);
  return newCheckIn;
}

// Get check-ins
export function getCheckIns(): Array<unknown> {
  const db = readDB();
  return db.checkIns || [];
}
