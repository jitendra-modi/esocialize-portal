"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';

const trainingScores = [
  { label: "Speaking Confidence", value: 72 },
  { label: "Inclusivity Score", value: 85 },
  { label: "Overall PEI Score", value: 81 },
];

const peerParticipants = [
  { name: "SM1", role: "Lead Trainer", speaking: true },
  { name: "SM2", role: "Senior Facilitator", speaking: false },
  { name: "SM3", role: "Trainee", speaking: false },
  { name: "SM4", role: "Trainee", speaking: false },
];

export default function SocialMaestroTrainingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#1a1a2e] py-8 px-2">
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
          className="bg-white/5 rounded-2xl p-6 border border-pink-400/10"
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-200 mb-2">
              AI-Driven Training for Social Maestros
            </h1>
            <p className="text-lg text-white/80">
              Advanced training systems to develop exceptional Social Maestros
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Virtual Practice Room */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 rounded-2xl p-6 border border-pink-400/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">👩‍💼</span>
                  <h2 className="text-pink-200 text-lg font-semibold">Virtual Practice Room</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1 text-base">How It Works</h3>
                    <p className="text-white/70 text-sm">
                      SMs practice in a simulated environment with AI participants. The system evaluates speaking, inclusion, and emotional intelligence, providing actionable feedback for improvement.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1 text-base">Performance Factors</h3>
                    <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                      <li>Speaking confidence and clarity</li>
                      <li>Inclusion of all participants</li>
                      <li>Handling difficult situations</li>
                      <li>Emotional intelligence</li>
                      <li>Time management skills</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              {/* Training Session Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 rounded-2xl p-6 border border-pink-400/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white/90 font-semibold text-base">Training Session Metrics</h3>
                  <span className="text-xs text-pink-300 bg-pink-400/10 px-3 py-1 rounded-full">Live</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    {trainingScores.map((score) => (
                      <div key={score.label} className="flex flex-col items-center">
                        <span className="text-white/80 text-sm mb-1">{score.label}</span>
                        <div className="w-full h-3 bg-pink-900/30 rounded-full overflow-hidden mb-1">
                          <div
                            className="h-full bg-gradient-to-r from-pink-400 to-pink-300 rounded-full transition-all duration-700"
                            style={{ width: `${score.value}%` }}
                          ></div>
                        </div>
                        <span className="text-pink-200 text-xs font-semibold">{score.value}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="flex-1 bg-pink-900/20 rounded-xl p-4 flex flex-col items-center border border-pink-400/10">
                      <span className="text-pink-200 text-2xl mb-1">🤖</span>
                      <span className="text-white/80 text-sm font-semibold mb-1">AI Participants</span>
                      <span className="text-white/60 text-xs">Simulated group for real-world scenarios</span>
                    </div>
                    <div className="flex-1 bg-pink-900/20 rounded-xl p-4 flex flex-col items-center border border-pink-400/10">
                      <span className="text-pink-200 text-2xl mb-1">🗣️</span>
                      <span className="text-white/80 text-sm font-semibold mb-1">SM Trainee</span>
                      <span className="text-white/60 text-xs">Practicing leadership & facilitation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Peer Practice */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 rounded-2xl p-6 border border-pink-400/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧑‍🤝‍🧑</span>
                  <h2 className="text-pink-200 text-lg font-semibold">Peer Practice</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1 text-base">Peer Evaluation</h3>
                    <p className="text-white/70 text-sm">
                      Join a live practice session with fellow Social Maestros where you'll take turns facilitating while others observe and provide constructive feedback on your performance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1 text-base">Evaluation Criteria</h3>
                    <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                      <li>Virtual session facilitation mastery</li>
                      <li>Engagement and conversation flow</li>
                      <li>Group dynamics and participant inclusion</li>
                      <li>Handling challenging situations</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              {/* Peer Practice Session Grid & Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 rounded-2xl p-6 border border-pink-400/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white/90 font-semibold text-base">Peer Practice Session</h3>
                  <span className="text-xs text-pink-300 bg-pink-400/10 px-3 py-1 rounded-full">4 Participants</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {peerParticipants.map((p, i) => (
                    <div
                      key={p.name}
                      className={`relative bg-pink-900/20 rounded-xl flex flex-col items-center justify-center h-24 border border-pink-400/10 ${p.speaking ? "ring-2 ring-pink-400" : ""}`}
                    >
                      {p.speaking && (
                        <span className="absolute top-2 right-2 text-xs bg-pink-400/80 text-white px-2 py-0.5 rounded-full">Speaking</span>
                      )}
                      <span className="text-white text-lg font-semibold">{p.name}</span>
                      <span className="text-pink-200 text-xs mt-1">{p.role}</span>
                    </div>
                  ))}
                </div>
                {/* Facilitation Skill Improvement Bar */}
                <div className="w-full mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-pink-200 text-xs font-semibold">70%</span>
                    <span className="text-pink-200 text-xs font-semibold">90%</span>
                  </div>
                  <div className="w-full h-3 bg-pink-900/30 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-pink-300 rounded-full"
                      style={{ width: `80%` }}
                    ></div>
                  </div>
                  <div className="text-white/70 text-xs text-center">
                    "Significant improvement in handling group dynamics and ensuring equal participation"
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 