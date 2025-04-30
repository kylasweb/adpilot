
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthState, LoginCredentials, RegisterData, User } from "@/types/auth.types";
import { login as authLogin, register as authRegister, logout as authLogout, getAuthenticatedUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialAuthState);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user, token } = getAuthenticatedUser();
        
        setState({
          user,
          token,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          ...initialAuthState,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      const { user, token } = await authLogin(credentials.email, credentials.password);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: errorMessage,
      }));
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const register = async (data: RegisterData) => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      const { user, token } = await authRegister(data.name, data.email, data.password);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Registration Successful",
        description: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: errorMessage,
      }));
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    authLogout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const clearError = () => {
    setState((prevState) => ({ ...prevState, error: null }));
  };

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
