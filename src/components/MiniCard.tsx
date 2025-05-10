"use client";

import React from 'react';

interface MiniCardProps {
  title: string;
  children: React.ReactNode;
}

const MiniCard: React.FC<MiniCardProps> = ({ title, children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:border-primary-200 transition-all duration-300">
      <h3 className="text-lg font-semibold text-primary-800 mb-2">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export default MiniCard; 