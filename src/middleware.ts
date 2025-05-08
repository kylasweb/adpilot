import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from './lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // Check if path requires authentication
  const protectedPaths = ['/admin', '/freelancer', '/project-management', '/invoice']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Verify JWT token
    const payload = await verifyJWT(token)
    
    // Check role-based access
    if (request.nextUrl.pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    const response = NextResponse.next()
    
    // Add auth headers for API routes
    if (request.nextUrl.pathname.includes('/api/')) {
      response.headers.set('Authorization', `Bearer ${token}`)
    }

    return response

  } catch (error) {
    // Token is invalid/expired - attempt refresh if refresh token exists
    if (refreshToken) {
      // Redirect to token refresh endpoint
      return NextResponse.redirect(new URL('/api/auth/refresh', request.url))
    }
    
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/freelancer/:path*',
    '/project-management/:path*',
    '/invoice/:path*'
  ]
}