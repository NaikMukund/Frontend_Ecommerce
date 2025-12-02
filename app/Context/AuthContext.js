"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        
      }
    }
  }, []);

  const login = (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth anywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default AuthProvider;
