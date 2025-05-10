"use client";

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AccessDenied() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">🚫</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-white/60 mb-6">
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/"
              className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
            >
              Go Home
            </Link>
            <button
              onClick={logout}
              className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 