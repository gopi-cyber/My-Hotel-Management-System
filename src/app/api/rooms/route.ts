import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { REMOTE_ENDPOINTS } from '@/lib/apiConfig';

export async function GET() {
  try {
    const response = await fetch(REMOTE_ENDPOINTS.ROOMS);
    const rooms = await response.json();
    
    // Sync to local
    const db = readDB();
    db.rooms = rooms;
    writeDB(db);
    
    return NextResponse.json(rooms);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const remoteResponse = await fetch(REMOTE_ENDPOINTS.ROOMS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const room = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    db.rooms.push(room);
    writeDB(db);
    
    return NextResponse.json(room, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const remoteResponse = await fetch(`${REMOTE_ENDPOINTS.ROOMS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const room = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    const idx = db.rooms.findIndex((r: any) => r.id === id);
    if (idx !== -1) db.rooms[idx] = room;
    writeDB(db);
    
    return NextResponse.json(room);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('ID is required');
    
    await fetch(`${REMOTE_ENDPOINTS.ROOMS}/${id}`, { method: 'DELETE' });
    
    // Sync to local
    const db = readDB();
    db.rooms = db.rooms.filter((r: any) => r.id !== id);
    writeDB(db);
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
