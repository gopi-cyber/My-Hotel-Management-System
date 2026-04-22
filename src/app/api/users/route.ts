import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { REMOTE_ENDPOINTS } from '@/lib/apiConfig';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        
        // Always fetch fresh data from Remote to stay in sync
        const response = await fetch(REMOTE_ENDPOINTS.USERS);
        const users = await response.json();
        
        // Update local db.json
        const db = readDB();
        db.users = users;
        writeDB(db);
        
        let filteredUsers = users;
        if (username) {
            filteredUsers = users.filter((u: any) => u.username === username);
        }
        
        return NextResponse.json(filteredUsers);
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // 1. Write to Remote
        const remoteResponse = await fetch(REMOTE_ENDPOINTS.USERS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const savedUser = await remoteResponse.json();
        
        // 2. Sync to local db.json
        const db = readDB();
        db.users.push(savedUser);
        writeDB(db);
        
        return NextResponse.json(savedUser, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
