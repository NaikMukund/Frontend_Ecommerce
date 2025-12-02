// src/hooks/useAuth.js

import { useState, useEffect } from "react";
import { getUser, saveUser, removeUser } from "../lib/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  // Login user and store data in localStorage
  const login = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  // Logout user
  const logout = () => {
    removeUser();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
