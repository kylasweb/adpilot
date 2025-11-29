import { SignJWT, jwtVerify } from 'jose';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Secret keys from environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_SECRET || 'refresh-secret-key-change-in-production'
);

// CORS configuration for API routes
export const CORS_OPTIONS = {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  origin: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  maxAge: 86400 // 24 hours
};

// TypeScript interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  status?: string;
  avatarUrl?: string | null; // Allow null to match Prisma schema
  createdAt?: string;
  organizationId?: string;
}

// Generate JWT access token
export const generateToken = async (user: Omit<User, "password">) => {
  const expiresIn = '1h';

  const token = await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);

  return token;
};

// Generate refresh token
export const generateRefreshToken = async (userId: string) => {
  const expiresIn = '7d';

  const token = await new SignJWT({
    sub: userId,
    type: 'refresh'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(REFRESH_SECRET);

  return token;
};

// Verify JWT access token
export const verifyJWT = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Verify refresh token
export const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return payload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
