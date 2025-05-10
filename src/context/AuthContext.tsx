"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

type UserRole = 'admin' | 'core_member' | 'team_member' | 'pending';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  permissions: Record<string, boolean>;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
  error: null,
  clearError: () => {}
});

export const useAuth = () => useContext(AuthContext);

// Mock data for when Firebase is unavailable
const createMockUserData = (user: FirebaseUser): User => {
  console.log('Using mock user data due to Firestore access issues');
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: 'admin', // Grant admin access when in mock mode
    permissions: {
      'architecture': true,
      'app-ui': true,
      'pitch-deck': true,
      'business-strategy': true,
      'traction-analysis': true,
      'roadmap': true
    }
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  const clearError = () => setError(null);

  const formatUser = async (user: FirebaseUser): Promise<User> => {
    if (useMockData) {
      return createMockUserData(user);
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: (userData.role as UserRole) || 'pending',
          permissions: userData.permissions || {},
        };
      } else {
        // New user, set up with pending role
        try {
          const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'pending' as UserRole,
            permissions: {},
            createdAt: serverTimestamp(),
          };
          
          await setDoc(doc(db, 'users', user.uid), newUser);
          return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'pending',
            permissions: {},
          };
        } catch (error) {
          console.error('Error creating new user document:', error);
          
          // Switch to mock data mode if we have Firebase permission issues
          if (error instanceof FirebaseError && 
              (error.code === 'permission-denied' || error.message.includes('permission'))) {
            setUseMockData(true);
            setError('Using demo mode due to Firebase permissions issues. Some features may be limited.');
            return createMockUserData(user);
          }
          
          // If we can't write to Firestore, still allow the user to access the app with default permissions
          setError('Could not save user data. You may have limited functionality.');
          return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'pending',
            permissions: {},
          };
        }
      }
    } catch (error) {
      console.error('Error accessing Firestore:', error);
      
      // Switch to mock data mode if we have Firebase permission issues
      if (error instanceof FirebaseError && 
          (error.code === 'permission-denied' || error.message.includes('permission'))) {
        setUseMockData(true);
        setError('Using demo mode due to Firebase permissions issues.');
        return createMockUserData(user);
      }
      
      setError('Firebase permissions error. Contact administrator.');
      
      // Return default user with pending role even if there's a permissions error
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'pending',
        permissions: {},
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUseMockData(false);
    } catch (error) {
      console.error('Error logging out', error);
      setError('Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      try {
        if (firebaseUser) {
          const formattedUser = await formatUser(firebaseUser);
          setUser(formattedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setError('Authentication error occurred.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [useMockData]);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}; 