import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_ENDPOINTS } from '@/lib/apiConfig';
import { fallbackData, FallbackUser } from '@/lib/serverFallback';

const publicUser = (source: FallbackUser) => {
  const user = { ...source };
  delete user.password;
  return user;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(BACKEND_ENDPOINTS.USERS, { 
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      let users = await response.json();
      if (username) {
        users = users.filter((u: FallbackUser) => u.username?.toLowerCase() === username.toLowerCase());
      }
      return NextResponse.json(users.map((user: FallbackUser) => publicUser(user)));
    }
  } catch (_e) {
    // Spring Boot backend offline - use fallback
  }

  let users = [...fallbackData.users];
  if (username) {
    users = users.filter((u: FallbackUser) => u.username.toLowerCase() === username.toLowerCase());
  }
  return NextResponse.json(users.map(publicUser));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === 'login') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const response = await fetch(`${BACKEND_ENDPOINTS.USERS}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: body.username, password: body.password }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (response.ok) {
          const user = await response.json();
          return NextResponse.json(publicUser(user as FallbackUser));
        }
        if (response.status === 401 || response.status === 404) {
          return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }
      } catch (_e) {
        // Backend offline - validate against development fallback.
      }

      const user = fallbackData.users.find((candidate) =>
        candidate.username.toLowerCase() === String(body.username ?? '').toLowerCase() &&
        candidate.password === body.password
      );
      return user
        ? NextResponse.json(publicUser(user))
        : NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    if (!body.username || !body.email || !body.password) {
      return NextResponse.json({ error: 'Username, email and password are required' }, { status: 400 });
    }
    const registrationBody = { ...body, role: 'guest' };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(`${BACKEND_ENDPOINTS.USERS}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationBody),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const savedUser = await response.json();
        return NextResponse.json(publicUser(savedUser as FallbackUser), { status: 201 });
      }
    } catch (_e) {
      // Backend offline - use fallback
    }

    const duplicate = fallbackData.users.some((user) =>
      user.username.toLowerCase() === String(body.username).toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }

    const newUser: FallbackUser = {
      id: Date.now().toString(),
      username: body.username,
      password: body.password || '123',
      name: body.name || body.username,
      email: body.email || `${body.username}@example.com`,
      phone: body.phone || '',
      role: 'guest'
    };
    fallbackData.users.push(newUser);
    return NextResponse.json(publicUser(newUser), { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Registration error' }, { status: 400 });
  }
}
