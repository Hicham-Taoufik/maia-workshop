import { NextResponse } from 'next/server';
import { getRegistrations } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const registrations = await getRegistrations();
    return NextResponse.json(
      { registrations },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

