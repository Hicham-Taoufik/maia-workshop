import { NextResponse } from 'next/server';
import { getRegistrations } from '@/lib/data';

export async function GET() {
  try {
    const registrations = getRegistrations();
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

