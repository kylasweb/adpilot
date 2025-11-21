'use client'

import { AuthProvider } from "../context/AuthContext";
import { useEffect } from "react";
import { initializeDefaultProviders } from "../services/apiKeyManager";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize API providers when app starts
    initializeDefaultProviders();
  }, []);

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
