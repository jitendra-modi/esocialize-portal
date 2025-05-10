"use client";

import React, { createContext, useContext, useState } from 'react';
import { signInAdmin } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

type AdminContextType = {
  adminUser: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AdminContext = createContext<AdminContextType>({
  adminUser: null,
  loading: false,
  error: null,
  signIn: async () => {},
  signOut: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if there's a saved admin session
  React.useEffect(() => {
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      try {
        setAdminUser(JSON.parse(savedAdmin));
      } catch (error) {
        console.error('Error parsing saved admin:', error);
        localStorage.removeItem('adminUser');
      }
    }
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check credentials
      if (username !== 'PEL' || password !== 'PEL123') {
        throw new Error('Invalid credentials');
      }
      
      // Create a mock admin user
      const mockUser = { email: 'admin@pel.com' } as User;
      setAdminUser(mockUser);
      localStorage.setItem('adminUser', JSON.stringify(mockUser));
      
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Admin sign in error:', error);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  return (
    <AdminContext.Provider value={{ adminUser, loading, error, signIn, signOut }}>
      {children}
    </AdminContext.Provider>
  );
}; 