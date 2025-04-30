import { jwtDecode } from "jwt-decode";
import { User } from "@/types/auth.types";

// This is a mock API for demonstration - replace with real API when adding Prisma
const API_URL = "/api";

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

// Function to generate a JWT token (mock implementation)
const generateToken = (user: Omit<User, "password">) => {
  // In a real implementation, you would use a JWT library on the server
  // This is just for demonstration purposes
  const expiresIn = 60 * 60 * 24; // 24 hours
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };
  
  // Base64 encode the payload to simulate a JWT
  const base64Payload = btoa(JSON.stringify(payload));
  const base64Header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  
  return `${base64Header}.${base64Payload}.MOCK_SIGNATURE`;
};

export const login = async (email: string, password: string) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user in mock data (replace with real API call when adding Prisma)
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = user;
    
    // Generate mock token
    const token = generateToken(userWithoutPassword);
    
    // Store token in localStorage
    localStorage.setItem("auth_token", token);
    
    return { user: userWithoutPassword, token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to login");
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }
    
    // Create new user (this would be done on the server in a real app)
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      password,
      role: "user" as const,
      createdAt: new Date().toISOString(),
      organizationId: "org-005",
    };
    
    // In a real app, this would be stored in the database
    MOCK_USERS.push(newUser);
    
    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Generate token
    const token = generateToken(userWithoutPassword);
    
    // Store token in localStorage
    localStorage.setItem("auth_token", token);
    
    return { user: userWithoutPassword, token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to register");
  }
};

export const logout = () => {
  localStorage.removeItem("auth_token");
};

export const getAuthenticatedUser = (): { user: User | null; token: string | null } => {
  try {
    const token = localStorage.getItem("auth_token");
    
    if (!token) {
      return { user: null, token: null };
    }
    
    // In a real app, we would validate the token on the server
    // For this demo, we'll just decode it and check if it's expired
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return { user: null, token: null };
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < currentTime) {
      // Token has expired
      localStorage.removeItem("auth_token");
      return { user: null, token: null };
    }
    
    const user: User = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      createdAt: new Date().toISOString(),
      organizationId: payload.organizationId,
    };
    
    return { user, token };
  } catch (error) {
    console.error("Error parsing authentication token:", error);
    localStorage.removeItem("auth_token");
    return { user: null, token: null };
  }
};
