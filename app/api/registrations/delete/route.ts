import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const REGISTRATION_LIST_KEY = 'registrations:list';
const REGISTRATION_KEY_PREFIX = 'registration:';

// Check if user is authenticated as admin
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const authCookie = request.cookies.get('admin_auth');
  return authCookie?.value === '1';
}

/**
 * DELETE /api/registrations/delete
 * Delete a specific registration by ID, or delete all if id is 'all'
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    if (id === 'all') {
      // Delete all registrations
      const ids = await kv.lrange<string>(REGISTRATION_LIST_KEY, 0, -1);
      
      if (ids.length > 0) {
        // Delete all registration keys
        const pipeline = kv.pipeline();
        for (const registrationId of ids) {
          pipeline.del(`${REGISTRATION_KEY_PREFIX}${registrationId}`);
        }
        // Clear the list
        pipeline.del(REGISTRATION_LIST_KEY);
        await pipeline.exec();
      }

      return NextResponse.json({
        success: true,
        message: `Deleted ${ids.length} registration(s)`,
        deletedCount: ids.length
      });
    } else {
      // Delete specific registration
      const key = `${REGISTRATION_KEY_PREFIX}${id}`;
      const exists = await kv.exists(key);
      
      if (!exists) {
        return NextResponse.json(
          { error: 'Registration not found' },
          { status: 404 }
        );
      }

      // Delete the registration
      await kv.del(key);
      
      // Remove from list (best effort - list might be out of sync)
      await kv.lrem(REGISTRATION_LIST_KEY, 0, id);

      return NextResponse.json({
        success: true,
        message: 'Registration deleted successfully'
      });
    }
  } catch (error) {
    console.error('Delete registration error:', error);
    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}

