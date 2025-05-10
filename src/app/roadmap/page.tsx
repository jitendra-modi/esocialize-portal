"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
  PieChart, Pie, Cell, LineChart, Line, Legend, Label
} from 'recharts';
import { useRouter } from 'next/navigation';

// Define interface for metric items
interface MetricItem {
  label: string;
  value: number | string;
}

// Define interface for region/segment items
interface PieItem {
  name: string;
  value: number;
}

// Define interface for quarterly data
interface QuarterData {
  label: string;
  color: string;
  metrics: MetricItem[];
  callout: string;
  region: PieItem[];
  segment: PieItem[];
  newMembers: number;
  smCost: number;
  costPerMember: number;
  overseasMembers: number;
  overseasCost: number;
  corporateMembers: number;
  corporateCost: number;
}

// Define the quarterly data
const quarterlyData: QuarterData[] = [
  {
    label: "Q1",
    color: "#2CB67D", // Teal
    metrics: [
      { label: "Community Members", value: 500 },
      { label: "SM Maestro Pool", value: 50 },
      { label: "S&M Cost", value: "₹40.0 lakhs" },
      { label: "Admin Cost", value: "₹20.0 lakhs" },
    ],
    callout: "Initial ramp—high SM ratio",
    region: [{ name: "India", value: 100 }],
    segment: [
      { name: "College Teens", value: 75 },
      { name: "Women", value: 25 }
    ],
    newMembers: 500,
    smCost: 40.0,
    costPerMember: 8000,
    overseasMembers: 0,
    overseasCost: 0,
    corporateMembers: 0,
    corporateCost: 0
  },
  {
    label: "Q2",
    color: "#1F3A93", // Navy
    metrics: [
      { label: "Community Members", value: 5000 },
      { label: "Overseas Members", value: 200 },
      { label: "SM Maestro Pool", value: 250 },
      { label: "S&M Cost", value: "₹70.0 lakhs" },
      { label: "Admin Cost", value: "₹30.0 lakhs" },
    ],
    callout: "Overseas expansion",
    region: [
      { name: "India", value: 20 },
      { name: "US", value: 80 }
    ],
    segment: [
      { name: "Overseas", value: 4 },
      { name: "Community", value: 96 }
    ],
    newMembers: 4500,
    smCost: 70.0,
    costPerMember: 1556,
    overseasMembers: 200,
    overseasCost: 56.0, // 80% of 70 lakhs
    corporateMembers: 0,
    corporateCost: 0
  },
  {
    label: "Q3",
    color: "#F29D35", // Orange
    metrics: [
      { label: "Community Members", value: 30000 },
      { label: "Overseas Members", value: 1000 },
      { label: "Corporate Users", value: 2000 },
      { label: "SM Maestro Pool", value: 2500 },
      { label: "S&M Cost", value: "₹80.0 lakhs" },
      { label: "Admin Cost", value: "₹40.0 lakhs" },
    ],
    callout: "Corporate push",
    region: [
      { name: "India", value: 20 },
      { name: "US", value: 80 }
    ],
    segment: [
      { name: "Corporate", value: 6.7 },
      { name: "Overseas", value: 3.3 },
      { name: "Community", value: 90 }
    ],
    newMembers: 25000,
    smCost: 80.0,
    costPerMember: 320,
    overseasMembers: 1000,
    overseasCost: 64.0, // 80% of 80 lakhs
    corporateMembers: 2000,
    corporateCost: 16.0 // 20% of 80 lakhs
  },
  {
    label: "Q4",
    color: "#8E44AD", // Purple
    metrics: [
      { label: "Community Members", value: 150000 },
      { label: "Overseas Members", value: 5000 },
      { label: "Corporate Users", value: 10000 },
      { label: "Premium Members", value: 1000 },
      { label: "SM Maestro Pool", value: 7500 },
      { label: "S&M Cost", value: "₹1.10 Cr" },
      { label: "Admin Cost", value: "₹90.0 lakhs" },
    ],
    callout: "Premium launch",
    region: [
      { name: "India", value: 20 },
      { name: "US", value: 80 }
    ],
    segment: [
      { name: "Corporate", value: 6.7 },
      { name: "Premium", value: 0.7 },
      { name: "Overseas", value: 3.3 },
      { name: "Community", value: 89.3 }
    ],
    newMembers: 120000,
    smCost: 110.0,
    costPerMember: 917,
    overseasMembers: 5000,
    overseasCost: 88.0, // 80% of 110 lakhs
    corporateMembers: 10000,
    corporateCost: 22.0 // 20% of 110 lakhs
  },
];

// Chart data
const communityGrowthData = [
  { quarter: "Q1", community: 500, sm: 50 },
  { quarter: "Q2", community: 5000, sm: 250 },
  { quarter: "Q3", community: 30000, sm: 2500 },
  { quarter: "Q4", community: 150000, sm: 7500 },
];

const costBreakdownData = [
  { quarter: "Q1", sm: 40, admin: 20, color: "#2CB67D" },
  { quarter: "Q2", sm: 70, admin: 30, color: "#1F3A93" },
  { quarter: "Q3", sm: 80, admin: 40, color: "#F29D35" },
  { quarter: "Q4", sm: 110, admin: 90, color: "#8E44AD" },
];

// Color sets for charts
const pieColors = ["#2CB67D", "#1F3A93", "#F29D35", "#8E44AD", "#3498DB", "#E74C3C"];

export default function RoadmapPage() {
  const router = useRouter();
  // State for filter toggles
  const [showCommunity, setShowCommunity] = useState(true);
  const [showSMPool, setShowSMPool] = useState(true);
  const [showCosts, setShowCosts] = useState(true);
  // State for the quarter tab in geography section
  const [activeQuarter, setActiveQuarter] = useState(0);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Helper function to safely convert any value to a number
  const ensureNumber = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] px-2 sm:px-4">
      <div className="w-full mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition text-left"
        >
          ← Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6"
        >
          <div className="bg-gradient-to-r from-[#f46b45] to-[#eea849] rounded-lg p-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Roadmap</h1>
            <p className="text-white/80 text-sm">E-Socialize First year Q1–Q4 Roadmap & Metrics. Scaling Community Size, SM Capacity & Spend Efficiency.</p>
          </div>

          <div className="flex justify-end mb-8">
            <button className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 font-semibold shadow-md hover:bg-gray-50 transition">
              Download
            </button>
          </div>

          {/* 1. HEADER & KPI OVERVIEW */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-4 text-white">
                E-Socialize First year Q1–Q4 Roadmap & Metrics
              </h1>
              <p className="text-base text-white/80">
                Scaling Community Size, SM Capacity & Spend Efficiency
              </p>
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {quarterlyData.map((q, idx) => (
              <motion.div
                key={q.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-5 border-l-4"
                style={{ borderColor: q.color }}
              >
                <h2 className="text-base font-semibold mb-3" style={{ color: q.color }}>{q.label}</h2>
                <ul className="space-y-2">
                  {q.metrics.map((m, i) => (
                    <li key={i} className="text-gray-800 flex justify-between items-center text-sm">
                      <span>{m.label}</span>
                      <span className="font-semibold">
                        {typeof m.value === 'number' ? formatNumber(m.value) : m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Filter Toggles */}
          <div className="flex gap-4 justify-end mb-4">
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showCommunity ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setShowCommunity(!showCommunity)}
            >
              Community
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showSMPool ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setShowSMPool(!showSMPool)}
            >
              SM Pool
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showCosts ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setShowCosts(!showCosts)}
            >
              Costs
            </button>
          </div>

          {/* 2. TIME-SERIES LINE + ANNOTATED GROWTH */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-base font-semibold text-gray-800 mb-6">Community Growth & SM Pool Size</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={communityGrowthData} margin={{ left: 30, right: 50, top: 40, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="quarter" tick={{ fill: '#333', fontSize: 12 }} />
                    <YAxis 
                      yAxisId="left" 
                      tick={{ fill: '#333', fontSize: 12 }} 
                      domain={[0, 160000]}
                      hide={!showCommunity}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tick={{ fill: '#333', fontSize: 12 }} 
                      domain={[0, 8000]}
                      hide={!showSMPool}
                    />
                    <Tooltip formatter={(v: any) => formatNumber(ensureNumber(v))} />
                    <Legend />
                    {showCommunity && (
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="community" 
                        name="Community" 
                        stroke="#4B5563" 
                        strokeWidth={3} 
                        dot={{ r: 6, fill: '#fff', stroke: '#4B5563', strokeWidth: 2 }}
                        label={({ x, y, value }) => (
                          <text x={x} y={y-20} fill="#4B5563" fontSize={12} textAnchor="middle">
                            {formatNumber(value)}
                          </text>
                        )}
                      />
                    )}
                    {showSMPool && (
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="sm" 
                        name="SM Pool" 
                        stroke="#8E44AD" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 6, fill: '#fff', stroke: '#8E44AD', strokeWidth: 2 }}
                        label={({ x, y, value }) => (
                          <text x={x} y={y+20} fill="#8E44AD" fontSize={12} textAnchor="middle">
                            {formatNumber(value)}
                          </text>
                        )}
                      />
                    )}
                    {/* Callout Bubbles */}
                    {quarterlyData.map((q, i) => (
                      <text 
                        key={i} 
                        x={70 + i * 195} // Adjust positioning for better spacing
                        y={30} 
                        fill={q.color} 
                        fontSize={12} 
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {q.callout}
                      </text>
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">Q1→Q2 Community: +900%</span>
                <span className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">Q2→Q3 Community: +500%</span>
                <span className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">Q3→Q4 Community: +400%</span>
                <span className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs font-medium">Q1→Q2 SM: +400%</span>
                <span className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs font-medium">Q2→Q3 SM: +900%</span>
                <span className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs font-medium">Q3→Q4 SM: +200%</span>
              </div>
            </div>
          </div>

          {/* 3. SESSION CAPACITY & UTILIZATION WIDGET */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-base font-semibold text-gray-800 mb-6">Session Capacity & Utilization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-base text-gray-600 mb-2">Max Monthly Sessions @100% DAU:</p>
                  <p className="text-sm text-gray-500 mb-3">15 sessions × 500 members ÷ 10 SM = 750 sessions</p>
                  <p className="text-2xl font-bold text-blue-600">750 sessions</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-base text-gray-600 mb-2">Projected Sessions @20% DAU:</p>
                  <p className="text-sm text-gray-500 mb-3">750 × 0.20 = 150 sessions</p>
                  <p className="text-2xl font-bold text-purple-600">150 sessions</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6 italic">Controlling SM idle time helps manage pool-growth rate.</p>
            </div>
          </div>

          {/* 4. COST BREAKDOWN: STACKED BARS */}
          {showCosts && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Cost Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costBreakdownData} margin={{ left: 20, right: 20, top: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="quarter" tick={{ fill: '#333', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#333', fontSize: 12 }}>
                    <Label value="₹ in lakhs" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#666' }} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value: any) => [`₹${value} L ${ensureNumber(value) >= 100 ? `= ₹${ensureNumber(value)/100} Cr` : ''}`, 'Amount']}
                  />
                  <Legend />
                  <Bar dataKey="sm" name="S&M Cost" fill="#3B82F6" radius={[8, 8, 0, 0]}>
                    <LabelList dataKey="sm" position="top" fill="#3B82F6" fontSize={12} formatter={(v: any) => `₹${v}L`} />
                  </Bar>
                  <Bar dataKey="admin" name="Admin Cost" fill="#8B5CF6" radius={[8, 8, 0, 0]}>
                    <LabelList dataKey="admin" position="top" fill="#8B5CF6" fontSize={12} formatter={(v: any) => `₹${v}L`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* 5. GEOGRAPHY & SEGMENT FOCUS */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-base font-semibold text-gray-800 mb-6">Geography & Segment Focus (Marketing Spend)</h3>
              <div className="flex flex-wrap gap-6 mb-8 justify-center">
                {quarterlyData.map((q, idx) => (
                  <button
                    key={idx}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                      activeQuarter === idx ? `text-white` : "bg-gray-100 text-gray-600"
                    }`}
                    style={{ backgroundColor: activeQuarter === idx ? q.color : undefined }}
                    onClick={() => setActiveQuarter(idx)}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="flex flex-col items-center">
                  <h4 className="text-base font-semibold text-gray-700 mb-6">Region (Marketing Spend)</h4>
                  <div className="h-96 w-full max-w-md">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        <Pie
                          data={quarterlyData[activeQuarter].region}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={4}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ strokeWidth: 1 }}
                          fontSize={11}
                        >
                          {quarterlyData[activeQuarter].region.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${value}% of marketing spend`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-base font-semibold text-gray-700 mb-6">Segment (Marketing Spend)</h4>
                  <div className="h-96 w-full max-w-md">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        <Pie
                          data={quarterlyData[activeQuarter].segment}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={4}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ strokeWidth: 1 }}
                          fontSize={11}
                        >
                          {quarterlyData[activeQuarter].segment.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${value}% of marketing spend`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. ROI & EFFICIENCY ANALYSIS PANEL */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-base font-semibold text-gray-800 mb-6">ROI & Efficiency Analysis</h3>
              
              {/* Overseas ROI Analysis */}
              <div className="mb-10">
                <h4 className="text-base font-medium text-gray-700 mb-4">Overseas ROI & Efficiency Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quarter</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Overseas Members</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S&M Cost (₹L)</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cost per Member (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quarterlyData.map((q, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="px-4 py-3 text-sm text-gray-800">{q.label}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{formatNumber(q.overseasMembers)}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{q.overseasCost.toFixed(1)}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {q.overseasMembers > 0 
                              ? `₹${formatNumber(Math.round(q.overseasCost * 100000 / q.overseasMembers))}` 
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Q3 improved efficiency: Cost per overseas member dropped to ₹6,400.</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Q4 further optimization: Cost reduced to ₹1,760 per overseas member.</span>
                  </p>
                </div>
              </div>
              
              {/* Corporate ROI Analysis */}
              <div>
                <h4 className="text-base font-medium text-gray-700 mb-4">Corporate ROI & Efficiency Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quarter</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Corporate Members</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S&M Cost (₹L)</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cost per Member (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quarterlyData.map((q, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="px-4 py-3 text-sm text-gray-800">{q.label}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{formatNumber(q.corporateMembers)}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{q.corporateCost.toFixed(1)}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {q.corporateMembers > 0 
                              ? `₹${formatNumber(Math.round(q.corporateCost * 100000 / q.corporateMembers))}` 
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Corporate entry in Q3: Initial cost of ₹800 per member.</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Stable corporate base: Maintained 10,000 members with cost of ₹220 per member.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Year Projections Table */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-base font-semibold text-gray-800 mb-6">3-Year Revenue & Expense Projections</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Year 1 (INR)</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Year 2 (INR)</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Year 3 (INR)</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Growth (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-semibold bg-blue-50">
                      <td colSpan={5} className="px-4 py-3 text-blue-800">Income</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Overseas Indians</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">6 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">20 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">60 Cr</td>
                      <td className="px-4 py-3 text-sm text-green-600 text-right font-medium">300%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Corporate Plan</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">2 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">15 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">50 Cr</td>
                      <td className="px-4 py-3 text-sm text-green-600 text-right font-medium">450%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Premium Subscription</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">60 lakh</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">3 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">12 Cr</td>
                      <td className="px-4 py-3 text-sm text-green-600 text-right font-medium">450%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Ads</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">10 lakh</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">50 lakh</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">2 Cr</td>
                      <td className="px-4 py-3 text-sm text-green-600 text-right font-medium">450%</td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">Total Revenue</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800 text-right">8.7 Cr</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800 text-right">38.5 Cr</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800 text-right">124 Cr</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-600 text-right">400%</td>
                    </tr>
                    <tr className="font-semibold bg-orange-50">
                      <td colSpan={5} className="px-4 py-3 text-orange-800">Expenses</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Sales & marketing</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(40%) 3.2 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(50%) 15 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(60%) 90 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Tech and Automation</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(40%) 3.2 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(40%) 12 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(35%) 52.5 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Overall Administration</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(10%) 80 Lakh</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(5%) 1.5 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(3%) 4.5 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-800">Product development</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(10%) 80 Lakh</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(5%) 1.5 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right">(2%) 3 Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 