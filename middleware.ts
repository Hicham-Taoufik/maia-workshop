import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect /admin routes with a simple cookie-based gate
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin and subroutes (but allow the login page and assets)
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname.startsWith('/admin/login');
  const isApiRoute = pathname.startsWith('/api');
  const isStatic = pathname.startsWith('/_next') || pathname.startsWith('/static');

  if (!isAdminRoute || isLoginPage || isApiRoute || isStatic) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get('admin_auth');
  if (!cookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

