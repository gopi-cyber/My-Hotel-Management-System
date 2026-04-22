import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { REMOTE_ENDPOINTS } from '@/lib/apiConfig';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const response = await fetch(REMOTE_ENDPOINTS.BOOKINGS);
    let bookings = await response.json();
    
    // Sync to local
    const db = readDB();
    db.bookings = bookings;
    writeDB(db);
    
    if (userId) {
      bookings = bookings.filter((b: any) => b.guestId === userId);
    }
    
    return NextResponse.json(bookings);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const remoteResponse = await fetch(REMOTE_ENDPOINTS.BOOKINGS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const booking = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    db.bookings.push(booking);
    writeDB(db);
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const remoteResponse = await fetch(`${REMOTE_ENDPOINTS.BOOKINGS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const booking = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    const idx = db.bookings.findIndex((b: any) => b.id === id);
    if (idx !== -1) db.bookings[idx] = booking;
    writeDB(db);
    
    return NextResponse.json(booking);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
