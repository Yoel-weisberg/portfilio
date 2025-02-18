import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { notFound } from "next/navigation";


export default withMiddlewareAuthRequired(
  async function middleware(req) {
    const res = NextResponse.next();
    try {
      const session = await getSession(req, res);
      const path = req.nextUrl.pathname;
      
      // Secure /admin/* and /api/admin/* routes
      if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
        // If no user or no roles claim, deny access
        if (!session || !session.user.roles?.includes('admin')) {
          notFound()
        }
      }
      
      return res;
    } catch (error) {
      return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }
  }
);

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
