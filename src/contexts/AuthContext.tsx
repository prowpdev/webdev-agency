import React, { createContext, useContext, useEffect, useState } from 'react';
import { StorageService } from '../services/storageService';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClient: boolean;
  login: (email: string, role?: UserRole) => boolean;
  register: (name: string, email: string, company?: string) => User;
  logout: () => void;
  switchUser: (userId: string) => void;
  availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('apexflow_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default to admin for convenient preview, but easily switchable
    const users = StorageService.getUsers();
    return users.find((u) => u.role === 'Admin') || null;
  });

  const [availableUsers, setAvailableUsers] = useState<User[]>(() => StorageService.getUsers());

  useEffect(() => {
    const handleStorageChange = () => {
      setAvailableUsers(StorageService.getUsers());
    };
    window.addEventListener('apexflow-storage-change', handleStorageChange);
    return () => window.removeEventListener('apexflow-storage-change', handleStorageChange);
  }, []);

  const login = (email: string, role?: UserRole): boolean => {
    const users = StorageService.getUsers();
    let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found && role) {
      found = users.find((u) => u.role === role);
    }

    if (found) {
      setCurrentUser(found);
      localStorage.setItem('apexflow_active_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, company?: string): User => {
    const users = StorageService.getUsers();
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      company: company || 'Independent',
      role: 'Client',
      phone: '+1 (555) 000-0000',
    };
    users.push(newUser);
    StorageService.saveUsers(users);
    setCurrentUser(newUser);
    localStorage.setItem('apexflow_active_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('apexflow_active_user');
  };

  const switchUser = (userId: string) => {
    const users = StorageService.getUsers();
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('apexflow_active_user', JSON.stringify(found));
    }
  };

  const isAdmin = currentUser?.role === 'Admin' || currentUser?.role === 'Manager' || currentUser?.role === 'Developer';
  const isClient = currentUser?.role === 'Client';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin,
        isClient,
        login,
        register,
        logout,
        switchUser,
        availableUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
