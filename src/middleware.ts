import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is causing redirects loops because we're using localStorage
// in our authentication system, but middleware runs on the server and can't access it.
// Let's simplify it for now to just handle basic routing without auth checks.

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Special paths that need direct access regardless of auth
  const publicPaths = ['/login', '/admin'];
  
  // If the path is in the public paths list, allow direct access
  if (publicPaths.some(p => path === p)) {
    return NextResponse.next();
  }
  
  // Don't try to implement redirection here until we switch to cookie-based auth
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - API routes (/api/ paths)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}; 