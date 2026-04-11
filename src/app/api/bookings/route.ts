import { NextRequest, NextResponse } from 'next/server';
import { getBookings, addBooking, updateBooking } from '@/lib/db';

export async function GET() {
  try {
    const bookings = getBookings();
    return NextResponse.json(bookings);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const booking = addBooking(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const booking = updateBooking(id, updates);
    return NextResponse.json(booking);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
