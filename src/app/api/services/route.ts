import { NextRequest, NextResponse } from 'next/server';
import { getServices, addServiceRequest, updateServiceStatus } from '@/lib/db';

export async function GET() {
  try {
    const services = getServices();
    return NextResponse.json(services);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const service = addServiceRequest(body);
    return NextResponse.json(service, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const service = updateServiceStatus(id, status);
    return NextResponse.json(service);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
