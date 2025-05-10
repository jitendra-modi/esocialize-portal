"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
        <p className="text-white/80 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
} 