"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';

export default function AIPluginPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#181c2e] py-8 px-2">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.push('/app-ui')}
          className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition text-left"
        >
          ← Back to Dashboard
        </button>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 rounded-2xl p-6 border border-blue-400/10"
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">
              VC AI Plugin
            </h1>
            <p className="text-lg text-white/80">
              All AI capabilities in the VC is because of this Plugin
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Engagement Suggestions */}
            <div className="bg-white/5 rounded-2xl p-6 border border-blue-400/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔗</span>
                <h2 className="text-blue-200 text-lg font-semibold">Engagement Suggestions</h2>
              </div>
              <p className="text-white/80 text-sm mb-4">
                The VC AI Plugin provides real-time suggestions to improve engagement during video conferences. It analyzes participant interaction patterns, identifies disengaged users, and recommends specific actions to re-engage them.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-blue-400/10">
                <h3 className="text-white/90 font-semibold text-sm mb-2">Features</h3>
                <ul className="list-disc pl-5 text-blue-100 text-sm space-y-1">
                  <li>Real-time meeting quality assessment</li>
                  <li>Participant engagement scoring</li>
                  <li>Dynamic suggestions for Social Maestros</li>
                </ul>
              </div>
            </div>
            {/* Behavioral Nudges */}
            <div className="bg-white/5 rounded-2xl p-6 border border-blue-400/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔗</span>
                <h2 className="text-blue-200 text-lg font-semibold">Behavioral Nudges</h2>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Using advanced AI, the plugin provides subtle behavioral nudges to both participants and Social Maestros. These nudges are designed to create more inclusive and positive meeting experiences.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-blue-400/10">
                <h3 className="text-white/90 font-semibold text-sm mb-2">Features</h3>
                <ul className="list-disc pl-5 text-blue-100 text-sm space-y-1">
                  <li>Personalized nudge timing based on attention patterns</li>
                  <li>Context-aware suggestions that fit conversation flow</li>
                  <li>Emotion-sensitive prompting to maintain positive tone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Platform Integration */}
          <div className="bg-white/5 rounded-2xl p-6 border border-blue-400/10 mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">↗️</span>
              <h2 className="text-blue-200 text-lg font-semibold">Platform Integration</h2>
            </div>
            <p className="text-white/80 text-sm mb-6">
              The VC AI Plugin is designed to work seamlessly with all major video conferencing platforms, providing enhanced capabilities regardless of which tool your team uses.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center border border-blue-400/10">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-2">Z</div>
                <div className="text-white/90 font-semibold mb-1">Zoom</div>
                <div className="text-white/60 text-xs text-center">Fully compatible with all Zoom meeting types</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center border border-blue-400/10">
                <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white text-2xl font-bold mb-2">T</div>
                <div className="text-white/90 font-semibold mb-1">Teams</div>
                <div className="text-white/60 text-xs text-center">Seamless integration with Microsoft Teams</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center border border-blue-400/10">
                <div className="w-12 h-12 rounded-full bg-cyan-700 flex items-center justify-center text-white text-2xl font-bold mb-2">C</div>
                <div className="text-white/90 font-semibold mb-1">Custom VC Tools</div>
                <div className="text-white/60 text-xs text-center">API available for integration with custom platforms</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 