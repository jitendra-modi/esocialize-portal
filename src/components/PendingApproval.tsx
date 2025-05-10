"use client";

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function PendingApproval() {
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
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-yellow-500 text-2xl">⌛</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Access Pending
          </h1>
          <p className="text-white/60 mb-6">
            Your account is pending approval from an administrator. You'll receive access once your account has been reviewed.
          </p>
          
          <button
            onClick={logout}
            className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
          >
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
} 