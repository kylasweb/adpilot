
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || "/dashboard";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled in the AuthContext
      console.error("Login error:", error);
    }
  };

  const setTestCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-adpilot-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to AdPilot</CardTitle>
          <CardDescription>
            Enter your credentials below to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-adpilot-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </span>
              )}
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Test Accounts:</p>
            <Tabs defaultValue="admin">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="admin" className="pt-2">
                <Alert className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setTestCredentials("admin@example.com", "password123")}>
                  <AlertTitle className="text-sm font-medium">Admin Account</AlertTitle>
                  <AlertDescription className="text-xs text-gray-500">
                    Email: admin@example.com<br />
                    Password: password123
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="users" className="pt-2 space-y-2">
                <Alert className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setTestCredentials("user1@example.com", "password123")}>
                  <AlertTitle className="text-sm font-medium">User 1 - Marketing Team</AlertTitle>
                  <AlertDescription className="text-xs text-gray-500">
                    Email: user1@example.com<br />
                    Password: password123
                  </AlertDescription>
                </Alert>
                
                <Alert className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setTestCredentials("user2@example.com", "password123")}>
                  <AlertTitle className="text-sm font-medium">User 2 - Design Team</AlertTitle>
                  <AlertDescription className="text-xs text-gray-500">
                    Email: user2@example.com<br />
                    Password: password123
                  </AlertDescription>
                </Alert>
                
                <Alert className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setTestCredentials("user3@example.com", "password123")}>
                  <AlertTitle className="text-sm font-medium">User 3 - Analytics Team</AlertTitle>
                  <AlertDescription className="text-xs text-gray-500">
                    Email: user3@example.com<br />
                    Password: password123
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-adpilot-text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-adpilot-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
