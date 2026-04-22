import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { REMOTE_ENDPOINTS } from '@/lib/apiConfig';

export async function GET() {
  try {
    const response = await fetch(REMOTE_ENDPOINTS.STAFF);
    const staff = await response.json();
    
    // Sync to local
    const db = readDB();
    db.staff = staff;
    writeDB(db);
    
    return NextResponse.json(staff);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const remoteResponse = await fetch(REMOTE_ENDPOINTS.STAFF, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const member = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    db.staff.push(member);
    writeDB(db);
    
    return NextResponse.json(member, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const remoteResponse = await fetch(`${REMOTE_ENDPOINTS.STAFF}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const member = await remoteResponse.json();
    
    // Sync to local
    const db = readDB();
    const idx = db.staff.findIndex((s: any) => s.id === id);
    if (idx !== -1) db.staff[idx] = member;
    writeDB(db);
    
    return NextResponse.json(member);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('ID is required');
    
    await fetch(`${REMOTE_ENDPOINTS.STAFF}/${id}`, { method: 'DELETE' });
    
    // Sync to local
    const db = readDB();
    db.staff = db.staff.filter((s: any) => s.id !== id);
    writeDB(db);
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
