import { SignJWT, jwtVerify } from 'jose';
import { User } from "@/types/auth.types";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Secret keys should be in .env
const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key');
const REFRESH_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_REFRESH_SECRET || 'refresh-secret-key');

// Enhanced cookie configuration for security
const AUTH_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  expires: 1 / 24, // 1 hour
  httpOnly: true
};

const REFRESH_COOKIE_OPTIONS = {
  ...AUTH_COOKIE_OPTIONS,
  expires: 7, // 7 days
  path: '/api/auth/refresh'  // Restrict refresh token to refresh endpoint
};

// CORS configuration
export const CORS_OPTIONS = {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  origin: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080'],
  maxAge: 86400 // 24 hours
};

// Mock data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    password: "password123",
    role: "admin" as const,
    createdAt: new Date().toISOString(),
    organizationId: "org-001",
  },
  {
    id: "2",
    email: "user1@example.com",
    name: "Marketing User",
    password: "password123",
    role: "user" as const,
    createdAt: new Date().toISOString(),
    organizationId: "org-002",
  },
  {
    id: "3",
    email: "user2@example.com",
    name: "Design User",
    password: "password123",
    role: "user" as const,
    createdAt: new Date().toISOString(),
    organizationId: "org-003",
  },
  {
    id: "4",
    email: "user3@example.com",
    name: "Analytics User",
    password: "password123",
    role: "user" as const,
    createdAt: new Date().toISOString(),
    organizationId: "org-004",
  }
];

// Generate JWT token with jose
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

// Verify JWT token
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

export const login = async (email: string, password: string) => {
  try {
    // Find user in mock data (replace with real API call when adding Prisma)
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = user;

    // Generate auth token and refresh token
    const [token, refreshToken] = await Promise.all([
      generateToken(userWithoutPassword),
      generateRefreshToken(user.id)
    ]);

    // Store tokens in secure cookies
    Cookies.set('auth_token', token, AUTH_COOKIE_OPTIONS);
    Cookies.set('refresh_token', refreshToken, REFRESH_COOKIE_OPTIONS);

    return { user: userWithoutPassword, token, refreshToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to login");
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      password,
      role: "user" as const,
      createdAt: new Date().toISOString(),
      organizationId: "org-005",
    };

    MOCK_USERS.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    // Generate auth token and refresh token
    const [token, refreshToken] = await Promise.all([
      generateToken(userWithoutPassword),
      generateRefreshToken(newUser.id)
    ]);

    // Store tokens in secure cookies
    Cookies.set('auth_token', token, AUTH_COOKIE_OPTIONS);
    Cookies.set('refresh_token', refreshToken, REFRESH_COOKIE_OPTIONS);

    return { user: userWithoutPassword, token, refreshToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to register");
  }
};

export const logout = () => {
  Cookies.remove('auth_token', { path: '/' });
  Cookies.remove('refresh_token', { path: '/api/auth/refresh' });
};

// Refresh access token
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const payload = await verifyRefreshToken(refreshToken);
    const user = MOCK_USERS.find(u => u.id === payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    const newToken = await generateToken(userWithoutPassword);

    // Update auth token cookie
    Cookies.set('auth_token', newToken, AUTH_COOKIE_OPTIONS);

    return { token: newToken };
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

export const getAuthenticatedUser = async (): Promise<{ user: User | null; token: string | null }> => {
  try {
    const token = Cookies.get('auth_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!token) {
      return { user: null, token: null };
    }

    try {
      // Verify the current token
      const payload = await verifyJWT(token);

      const user: User = {
        id: payload.sub as string,
        email: payload.email as string,
        name: payload.name as string,
        role: (payload.role === 'admin' || payload.role === 'user')
          ? payload.role
          : 'user', // Default to user if invalid role
        createdAt: new Date().toISOString(),
        organizationId: payload.organizationId as string,
      };

      return { user, token };
    } catch (error) {
      // Token is invalid/expired - attempt refresh if refresh token exists
      if (refreshToken) {
        try {
          const { token: newToken } = await refreshAccessToken(refreshToken);
          // Recursively call with new token
          return getAuthenticatedUser();
        } catch (refreshError) {
          // Refresh failed - clear all tokens
          Cookies.remove('auth_token', { path: '/' });
          Cookies.remove('refresh_token', { path: '/api/auth/refresh' });
          return { user: null, token: null };
        }
      }

      // No refresh token - clear auth token
      Cookies.remove('auth_token', { path: '/' });
      return { user: null, token: null };
    }
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    Cookies.remove('auth_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/api/auth/refresh' });
    return { user: null, token: null };
  }
};
