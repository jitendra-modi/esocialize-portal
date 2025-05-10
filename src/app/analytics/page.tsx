"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';

const tabs = [
  { key: "sm", label: "SM Report" },
  { key: "user", label: "User Report" },
  { key: "ai", label: "AI Insights" },
];

function TabSwitcher({ active, setActive }: { active: string; setActive: (k: string) => void }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-white/5 rounded-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-8 py-2 text-lg font-medium transition-colors duration-200 focus:outline-none ${
              active === tab.key
                ? "bg-indigo-600 text-white"
                : "bg-transparent text-white/70 hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Enhanced Radar Chart with custom metrics and better visuals
const smMetrics = [
  "Engagement",
  "Audio Tone (Respect)",
  "Audio Tone (Smile/Cheer)",
  "Audio Tone (Speech Clarity)",
  "Audio Tone (Speech Volume)",
  "Use of Gestures",
  "Overall Expressiveness",
  "Equality Treatment",
  "Allowing Users to Speak",
  "User Positive Response",
  "User Non-Positive Response"
];

function EnhancedRadarChart({ values }: { values: number[] }) {
  // values: array of 11 numbers (0-100)
  const size = 260;
  const center = size / 2;
  const radius = 100;
  const angleStep = (2 * Math.PI) / smMetrics.length;
  // Calculate points
  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (v / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  });
  const polygon = points.map(([x, y]) => `${x},${y}`).join(" ");
  // For grid
  const gridLevels = [0.25, 0.5, 0.75, 1];
  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size}>
        {/* Grid */}
        {gridLevels.map((level, idx) => (
          <polygon
            key={level}
            points={Array(smMetrics.length)
              .fill(0)
              .map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = radius * level;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(" ")}
            fill="none"
            stroke="#6366f1"
            strokeOpacity={0.15 + idx * 0.07}
            strokeWidth={1}
          />
        ))}
        {/* Axes */}
        {smMetrics.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="#6366f1"
              strokeOpacity={0.15}
              strokeWidth={1}
            />
          );
        })}
        {/* Data Polygon */}
        <polygon
          points={polygon}
          fill="url(#radarGradient)"
          stroke="#a78bfa"
          strokeWidth={3}
        />
        {/* Data Points */}
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="#a78bfa" stroke="#fff" strokeWidth={2} />
        ))}
        {/* Gradient */}
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      {/* Axis Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {smMetrics.map((label, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const r = radius + 24;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <div
              key={label}
              className="absolute text-xs text-white/80 text-center"
              style={{
                left: x - 60 / 2,
                top: y - 12,
                width: 60,
                pointerEvents: "none"
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Line Chart
function EnhancedLineChart({ values, labels }: { values: number[]; labels: string[] }) {
  // values: array of numbers, labels: x-axis labels
  const width = 320, height = 90, pad = 30;
  const max = Math.max(...values, 100), min = Math.min(...values, 0);
  const points = values.map((v, i) => [
    pad + (i * (width - 2 * pad)) / (values.length - 1),
    height - pad - ((v - min) / (max - min || 1)) * (height - 2 * pad)
  ]);
  const polyline = points.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg width={width} height={height}>
      {/* Grid */}
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#6366f1" strokeOpacity={0.15} strokeWidth={2} />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#6366f1" strokeOpacity={0.15} strokeWidth={2} />
      {/* Polyline */}
      <polyline
        fill="none"
        stroke="#a78bfa"
        strokeWidth={4}
        strokeLinejoin="round"
        points={polyline}
      />
      {/* Points */}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill="#a78bfa" stroke="#fff" strokeWidth={2} />
      ))}
      {/* X-axis labels */}
      {labels.map((label, i) => (
        <text
          key={i}
          x={points[i][0]}
          y={height - pad + 18}
          textAnchor="middle"
          fontSize={12}
          fill="#c7d2fe"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

// Enhanced Bar Chart with minimum fill
function EnhancedBarChartMinFill({ values, labels, color }: { values: number[]; labels: string[]; color: string }) {
  // Ensure the smallest value fills at least 30% of the bar area
  const minFill = 0.3;
  const max = Math.max(...values);
  const min = Math.min(...values);
  return (
    <div className="flex items-end gap-4 h-36 w-full">
      {values.map((v, i) => {
        let percent = (v - min) / (max - min || 1);
        percent = minFill + percent * (1 - minFill); // scale between minFill and 1
        return (
          <div key={i} className="flex flex-col items-center w-16">
            <div
              className={`w-10 rounded-t-lg shadow-lg ${color}`}
              style={{ height: `${percent * 100}%`, minHeight: 8, boxShadow: '0 2px 12px #6366f155' }}
            ></div>
            <span className="mt-2 text-xs text-white/70 text-center">{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

// Enhanced Donut Chart
function EnhancedDonutChart({ percent, color }: { percent: number; color: string }) {
  const r = 32, c = 2 * Math.PI * r, p = percent / 100;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={r} fill="none" stroke="#334155" strokeWidth="14" />
      <circle
        cx="45"
        cy="45"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeDasharray={`${c * p} ${c * (1 - p)}`}
        strokeDashoffset={c * 0.25}
        style={{ filter: 'drop-shadow(0 2px 8px #a78bfa55)' }}
      />
      <text x="45" y="52" textAnchor="middle" fontSize={18} fill="#a78bfa" fontWeight="bold">{percent}%</text>
    </svg>
  );
}

// Utility for random numbers in a range
function rand(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

// --- SM Report Tab Data ---
const smTrend = [rand(75, 90), rand(80, 95), rand(85, 100), rand(80, 100), rand(90, 100)];
const smRadar = Array.from({ length: 11 }, () => rand(65, 100));
const smFeedbackPoll = [rand(7, 10), rand(7, 10), rand(7, 10)];
const smSessionFeedback = [rand(70, 100), rand(70, 100), rand(70, 100), rand(70, 100)];

// --- User Report Tab Data ---
const userSmileCount = rand(15, 40);
const userPEI = rand(7, 10);
const userWarmth = (Math.random() * (5 - 4) + 4).toFixed(1);
const userEmotionalJourney = [rand(50, 80), rand(60, 90), rand(70, 100), rand(80, 100)];

// --- AI Insights Tab Data (fixed, visually distinct values) ---
const aiPEIGender = [8.7, 7.1]; // Female and Male PEI scores
const aiAvgParticipants = 9;
const aiWeekendPercent = 68;
const aiBestSessions = [7.2, 8.1, 9.2]; // Scores for 1st time, 2-4 sessions, 5+ sessions
const aiCityRatings = [10, 10, 8, 7, 7]; // Bangalore, Chennai, Mumbai, Delhi, Hyderabad
const aiAgeRatings = [7, 7, 7, 9]; // Age groups 18-25, 26-35, 36-40, 40+
const aiGroupEngagement = [9, 7, 5]; // Group sizes 5-7, 8-10, 11+
const aiAudioTone = [8, 8, 7, 6]; // Morning, Afternoon, Evening, After 9pm
const aiGenderMix = [10, 9, 8, 7, 6]; // All Female, Female Majority, Mixed, 1+ Males, 80%+ Male

// Donut Chart with label in center
function DonutChartLabeled({ percent, color, label }: { percent: number; color: string; label: string }) {
  const r = 32, c = 2 * Math.PI * r, p = percent / 100;
  return (
    <div className="flex flex-col items-center">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#334155" strokeWidth="14" />
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeDasharray={`${c * p} ${c * (1 - p)}`}
          strokeDashoffset={c * 0.25}
          style={{ filter: 'drop-shadow(0 2px 8px #a78bfa55)' }}
        />
        <text x="45" y="52" textAnchor="middle" fontSize={18} fill={color} fontWeight="bold">{percent}%</text>
      </svg>
      <span className="text-xs text-white/80 mt-1">{label}</span>
    </div>
  );
}

// Radial Progress Chart
function RadialProgress({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 32, c = 2 * Math.PI * r, p = value / 100;
  return (
    <div className="flex flex-col items-center">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#334155" strokeWidth="14" />
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeDasharray={`${c * p} ${c * (1 - p)}`}
          strokeDashoffset={c * 0.25}
          style={{ filter: 'drop-shadow(0 2px 8px #a78bfa55)' }}
        />
        <text x="45" y="52" textAnchor="middle" fontSize={18} fill={color} fontWeight="bold">{value}</text>
      </svg>
      <span className="text-xs text-white/80 mt-1">{label}</span>
    </div>
  );
}

// Multi-segment Donut Chart (for city/gender mix)
function MultiDonutChart({ values, labels, colors, title }: { values: number[]; labels: string[]; colors: string[]; title: string }) {
  const total = values.reduce((a, b) => a + b, 0);
  let acc = 0;
  const r = 32, c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#334155" strokeWidth="14" />
        {values.map((v, i) => {
          const p = v / total;
          const dash = c * p;
          const dashoffset = c * 0.25 - acc;
          acc += dash;
          return (
            <circle
              key={i}
              cx="45"
              cy="45"
              r={r}
              fill="none"
              stroke={colors[i]}
              strokeWidth="14"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={dashoffset}
              style={{ filter: 'drop-shadow(0 2px 8px #a78bfa55)' }}
            />
          );
        })}
        <text x="45" y="52" textAnchor="middle" fontSize={14} fill="#fff" fontWeight="bold">{title}</text>
      </svg>
      <div className="flex flex-wrap justify-center gap-1 mt-1">
        {labels.map((l, i) => (
          <span key={i} className="text-xs" style={{ color: colors[i] }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// Helper for formatter
function formatNumber(v: any) {
  return typeof v === 'number' ? v.toFixed(1) : v;
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("sm");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1a1a2e] py-8 px-2">
      <SiteHeader />
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/app-ui')}
          className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition text-left"
        >
          ← Back to Dashboard
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6"
        >
          <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-lg p-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-white/80 text-sm">AI-Driven Insights & Detailed Reports</p>
          </div>
        </motion.div>
        {/* Tab Switcher */}
        <TabSwitcher active={activeTab} setActive={setActiveTab} />
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "sm" && (
            <motion.div
              key="sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* SM Performance Overview */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>SM Performance Overview</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="col-span-2">
                    <div className="mb-2 text-white/70 text-sm">SMI Score Trend</div>
                    <EnhancedLineChart values={smTrend} labels={["Jan", "Feb", "Mar", "Apr", "May"]} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">Current SMI</div>
                      <div className="text-2xl font-bold flex items-center gap-2">{smTrend[smTrend.length-1]} <span className="text-green-400 text-base font-normal">+{rand(5,15)}% improvement</span></div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">Engagement Rate</div>
                      <div className="text-2xl font-bold">{rand(80, 100)}%</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">Warmth Score</div>
                      <div className="text-2xl font-bold">{(Math.random() * (5 - 4) + 4).toFixed(1)}/5</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">Average PEI</div>
                      <div className="text-2xl font-bold">{rand(70, 100)}</div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-white/70 text-sm mb-2">SMI Metrics Breakdown</div>
                  <div className="flex justify-center">
                    <EnhancedRadarChart values={smRadar} />
                  </div>
                </div>
                {/* Feedback Poll Results */}
                <div className="mb-6">
                  <div className="text-white/70 text-sm mb-2">Feedback Poll Results</div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <span className="text-white/80">How well did the Host perform executing the activity and game with participants?</span>
                      <span className="text-indigo-400 font-bold text-lg">{smFeedbackPoll[0]}/10</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <span className="text-white/80">How confident and engaging was the host with participant?</span>
                      <span className="text-indigo-400 font-bold text-lg">{smFeedbackPoll[1]}/10</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <span className="text-white/80">How will you rate at an overall level the anchoring ability of SM knowing what is required at e-socialize?</span>
                      <span className="text-indigo-400 font-bold text-lg">{smFeedbackPoll[2]}/10</span>
                    </div>
                  </div>
                </div>
                {/* Session Feedback Analysis */}
                <div>
                  <div className="text-white/70 text-sm mb-2">Session Feedback Analysis</div>
                  <EnhancedBarChartMinFill values={smSessionFeedback} labels={["Recognition", "Inclusivity", "Warmth", "Engagement"]} color="bg-indigo-400" />
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "user" && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* User Report */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>Session Experience</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-4 col-span-2">
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">Smile Count</div>
                      <div className="text-2xl font-bold">{userSmileCount}</div>
                      <div className="text-green-400 text-xs">Moments of Joy!</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">PEI Score</div>
                      <div className="text-2xl font-bold">{userPEI}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white">
                      <div className="text-xs mb-1">Warmth Level</div>
                      <div className="text-2xl font-bold">{userWarmth}/5</div>
                      <div className="text-green-400 text-xs">Exceptional Connection!</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="text-white/70 text-sm mb-2">Emotional Journey</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { time: '0min', score: userEmotionalJourney[0] },
                          { time: '10min', score: userEmotionalJourney[1] },
                          { time: '20min', score: userEmotionalJourney[2] },
                          { time: '30min', score: userEmotionalJourney[3] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" tick={{ fill: '#fff', fontSize: 14 }} />
                        <YAxis domain={[0, 100]} tick={{ fill: '#fff', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#a78bfa" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-2">Health Benefits Gained</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                      Reduced stress levels through social connection
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                      Improved social bonding
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                      Enhanced emotional well-being
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* AI Insights */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-6">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span>AI-Driven Session Insights</span>
                </h2>
                <div className="text-white/70 text-sm mb-6">Based on analysis of 100+ e-socialize sessions</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. PEI Score by Gender */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">Average PEI Score by Gender</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { gender: 'Female (5020)', score: aiPEIGender[0] },
                          { gender: 'Male (4105)', score: aiPEIGender[1] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="gender" tick={{ fill: '#a78bfa', fontSize: 14 }} />
                        <YAxis domain={[0, 10]} tick={{ fill: '#fff', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#a78bfa" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 2. Avg Participants */}
                  <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
                    <h3 className="text-base text-white font-semibold mb-4">Avg Participants per Session</h3>
                    <div className="text-4xl font-bold text-indigo-400 mb-1">{aiAvgParticipants}</div>
                  </div>

                  {/* 3. Weekend Sessions */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">Weekend Sessions %</h3>
                    <div className="flex justify-center">
                      <ResponsiveContainer width={220} height={160}>
                        <PieChart>
                          <Pie
                            data={[{ name: 'Weekend', value: aiWeekendPercent }, { name: 'Weekday', value: 100 - aiWeekendPercent }]}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            fill="#a78bfa"
                            label={({ name, value }) => `${name}: ${value}%`}
                            labelLine={false}
                          >
                            <Cell key="weekend" fill="#a78bfa" />
                            <Cell key="weekday" fill="#334155" />
                          </Pie>
                          <Tooltip formatter={(v: any, n: any) => [`${formatNumber(v)}%`, formatNumber(n)]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 4. Best Sessions by Usage/Age */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">Best Sessions (Score &gt; 9) by Usage/Age</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[
                        { label: '1st Time', score: aiBestSessions[0] },
                        { label: '2-4 Sessions', score: aiBestSessions[1] },
                        { label: '5+ Sessions', score: aiBestSessions[2] }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="label" tick={{ fill: '#fff', fontSize: 14 }} />
                        <YAxis domain={[6, 10]} tick={{ fill: '#a78bfa', fontSize: 14 }} />
                        <Tooltip formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#a78bfa" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 5. City Ratings */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">City-wise 10 Ratings</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { city: 'Bangalore', rating: aiCityRatings[0] },
                          { city: 'Chennai', rating: aiCityRatings[1] },
                          { city: 'Mumbai', rating: aiCityRatings[2] },
                          { city: 'Delhi', rating: aiCityRatings[3] },
                          { city: 'Hyderabad', rating: aiCityRatings[4] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="city" tick={{ fill: '#38bdf8', fontSize: 14 }} />
                        <YAxis domain={[0, 10]} tick={{ fill: '#fff', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="rating" fill="#38bdf8" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="rating" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 6. Session Experience by Age */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">Session Experience Score by Age</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { age: '18-25', score: aiAgeRatings[0] },
                          { age: '26-35', score: aiAgeRatings[1] },
                          { age: '36-40', score: aiAgeRatings[2] },
                          { age: '40+', score: aiAgeRatings[3] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="age" tick={{ fill: '#6366f1', fontSize: 14 }} />
                        <YAxis domain={[0, 10]} tick={{ fill: '#fff', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 7. Engagement vs. Group Size */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">Engagement vs. Group Size</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { group: '5-7', score: aiGroupEngagement[0] },
                          { group: '8-10', score: aiGroupEngagement[1] },
                          { group: '11+', score: aiGroupEngagement[2] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="group" tick={{ fill: '#fbbf24', fontSize: 14 }} />
                        <YAxis domain={[0, 10]} tick={{ fill: '#fff', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#fbbf24" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 8. Audio Tone by Time */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">Audio Tone (Respect) by Time of Day</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[
                        { label: 'Morning', score: aiAudioTone[0] },
                        { label: 'Afternoon', score: aiAudioTone[1] },
                        { label: 'Evening', score: aiAudioTone[2] },
                        { label: 'After 9pm', score: aiAudioTone[3] }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="label" tick={{ fill: '#f472b6', fontSize: 14 }} />
                        <YAxis domain={[5, 10]} tick={{ fill: '#f472b6', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#f472b6" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 9. User Engagement by Gender Mix */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-base text-white font-semibold mb-4">User Engagement by Gender Mix</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { mix: 'All Female', score: aiGenderMix[0] },
                          { mix: 'Female Majority', score: aiGenderMix[1] },
                          { mix: 'Mixed', score: aiGenderMix[2] },
                          { mix: '1+ Males', score: aiGenderMix[3] },
                          { mix: '80%+ Male', score: aiGenderMix[4] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="mix" tick={{ fill: '#a78bfa', fontSize: 14 }} />
                        <YAxis domain={[0, 10]} tick={{ fill: '#fff', fontSize: 14 }} />
                        <Tooltip cursor={{ fill: '#6366f122' }} formatter={(v: any) => formatNumber(v)} />
                        <Bar dataKey="score" fill="#a78bfa" radius={[8, 8, 8, 8]}>
                          <LabelList dataKey="score" position="top" fill="#fff" fontSize={16} formatter={(v: any) => formatNumber(v)} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 