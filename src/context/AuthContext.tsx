"use client";

import React, { createContext, useContext, useState } from "react";

export type UserRole = "customer" | "dealer" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(parsedUser.role);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    setUser(userData);
    setRole(userData.role);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, isLoggedIn, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
