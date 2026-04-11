import { NextRequest, NextResponse } from 'next/server';
import { getCheckIns, addCheckIn } from '@/lib/db';

export async function GET() {
  try {
    const checkIns = getCheckIns();
    return NextResponse.json(checkIns);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const checkIn = addCheckIn(body);
    return NextResponse.json(checkIn, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
