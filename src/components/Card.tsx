"use client";

import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
}

const Card: React.FC<CardProps> = ({ title, children, buttonText, buttonLink }) => {
  return (
    <div className="bg-white shadow-card rounded-2xl p-6 flex flex-col gap-4 hover:shadow-card-hover transition-all duration-300 border border-gray-100">
      <h2 className="text-xl font-bold text-primary-800">{title}</h2>
      <div className="flex-1">{children}</div>
      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-center font-medium shadow-sm hover:shadow-md"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
};

export default Card; 