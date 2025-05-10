"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { adminUser, loading, error, signIn } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // If admin is already logged in, redirect to dashboard
    if (adminUser) {
      router.push('/admin/dashboard');
    }
  }, [adminUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(username, password);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Admin Access
          </h1>
          <p className="text-white/60 mb-6">
            Sign in to manage user access and permissions
          </p>
          
          {error && (
            <div className="mt-4 mb-4 bg-red-500/20 text-red-300 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block animate-spin mr-2"></span>
                  Signing in...
                </>
              ) : (
                'Sign In as Admin'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 