import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { REMOTE_ENDPOINTS } from '@/lib/apiConfig';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const guestId = searchParams.get('guestId');
    
    const response = await fetch(REMOTE_ENDPOINTS.SERVICES);
    let services = await response.json();
    
    // Sync to local
    const db = readDB();
    db.services = services;
    writeDB(db);
    
    if (guestId) {
      services = services.filter((s: any) => s.guestId === guestId);
    }
    
    return NextResponse.json(services);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const remoteResponse = await fetch(REMOTE_ENDPOINTS.SERVICES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const service = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    db.services.push(service);
    writeDB(db);
    
    return NextResponse.json(service, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const remoteResponse = await fetch(`${REMOTE_ENDPOINTS.SERVICES}/${id}`, {
      method: 'PUT', // JSON Server uses PUT for full updates, but we'll use it as PATCH here
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const service = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    const idx = db.services.findIndex((s: any) => s.id === id);
    if (idx !== -1) db.services[idx] = service;
    writeDB(db);
    
    return NextResponse.json(service);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
