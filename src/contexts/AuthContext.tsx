import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Define user roles
export type UserRole = 'admin' | 'billing' | 'developer' | 'viewer';

// Define the structure of our auth context
type AuthContextType = {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  logout: () => void;
};

// Default values for the context
const defaultContext: AuthContextType = {
  currentRole: 'viewer',
  setCurrentRole: () => {},
  isAuthenticated: false,
  logout: () => {},
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultContext);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Define props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // In a real app, this would fetch from a session or token
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const storedRole = localStorage.getItem('userRole');
    return (storedRole as UserRole) || 'admin'; // Default to admin for demo
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Update local storage when role changes
  useEffect(() => {
    localStorage.setItem('userRole', currentRole);
  }, [currentRole]);

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  // Create the context value
  const value = {
    currentRole,
    setCurrentRole,
    isAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected route component that checks for authentication and role
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { currentRole, isAuthenticated } = useAuth();
  const location = useLocation();

  // If user is not authenticated, redirect to sign in
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If user doesn't have the required role, show access denied
  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/dashboard/access-denied" replace />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};
