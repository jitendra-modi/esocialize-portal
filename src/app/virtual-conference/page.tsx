"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function VirtualConferencePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#1a1a2e] py-8 px-2">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => router.push('/app-ui')}
          className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition text-left"
        >
          ← Back to Dashboard
        </button>
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl text-white font-bold mb-2">Social Maestro Conference Interface</h1>
          <p className="text-white/70 text-sm">Interactive prototype showing virtual conference facilitation tools</p>
        </div>
        
        {/* Prototype Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 flex justify-center items-center"
        >
          <div className="w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden mx-auto">
            <iframe
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FisiyM7JowGwLSrBiECLj5d%2FE-Socialize-Prototype%3Fpage-id%3D0%253A1%26node-id%3D77-575%26viewport%3D-1337%252C-3660%252C0.56%26t%3DFvYeAsQEj5xDfFvA-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D77%253A575%26show-proto-sidebar%3D1"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 