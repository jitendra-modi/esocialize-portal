"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Login() {
  const { user, signInWithGoogle, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            E-Socialize Information Portal
          </h1>
          <p className="text-white/60 mb-6">Sign in with Google to request access</p>
          
          {error && (
            <div className="mt-4 mb-4 bg-red-500/20 text-red-300 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all mb-4 ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
          }`}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block animate-spin mr-2"></span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          )}
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1a1a2e] text-white/40">or</span>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/admin" 
            className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            Admin Login
          </Link>
          <p className="mt-4 text-white/40 text-xs">
            Note: New users will require admin approval before accessing the system.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 