import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    // In production, require explicit credentials (avoid accidental defaults).
    if (process.env.NODE_ENV === 'production' && (!ADMIN_USERNAME || !ADMIN_PASSWORD)) {
      return NextResponse.json(
        { error: 'Admin credentials are not configured in production' },
        { status: 500 }
      );
    }

    const { username, password } = await request.json();

    // In development, fall back to defaults for convenience.
    const expectedUser = ADMIN_USERNAME || 'admin';
    const expectedPass = ADMIN_PASSWORD || 'password123';

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    // Set a simple auth cookie for the admin area and API routes
    response.cookies.set('admin_auth', '1', {
      httpOnly: true,
      path: '/', // Set to root so it's available for API routes too
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

