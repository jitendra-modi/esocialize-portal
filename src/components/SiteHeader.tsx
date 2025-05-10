import React from 'react';
import { useAuth } from '@/context/AuthContext';

const fallbackAvatar = (
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
    <span>👤</span>
  </div>
);

export default function SiteHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="w-full sticky top-0 z-30 bg-white/10 backdrop-blur-lg border-b border-white/10 shadow-lg px-4 py-3 flex items-center justify-between mb-6">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">E-Socialize Management System</h1>
        <p className="text-sm text-white/70 font-medium">Creating meaningful social connections through positive emotional experiences.</p>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-10 h-10 rounded-full border-2 border-white/30 shadow-md object-cover bg-white/10"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          ) : fallbackAvatar}
          <button
            onClick={logout}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm font-semibold shadow-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
} 