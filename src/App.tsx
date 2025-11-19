
'use client'

import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { initializeDefaultProviders } from "./services/apiKeyManager";

const App = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize API providers when app starts
    initializeDefaultProviders();
  }, []);

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default App;
