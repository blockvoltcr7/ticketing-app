import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For now, we'll just check if there's a session cookie
  // This is a placeholder and should be replaced with proper NextAuth session checking
  const session = request.cookies.get('next-auth.session-token');

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // For now, we'll skip role-based checks
  // You can implement these once you have NextAuth fully set up

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/tech/:path*', '/api/admin/:path*', '/api/tech/:path*'],
};