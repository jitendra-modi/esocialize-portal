"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, LineChart, Line, Legend, LabelList, Cell
} from 'recharts';
import { useRouter } from 'next/navigation';

// Platform data
const platforms = [
  {
    name: 'Facebook',
    color: '#4267B2',
    launch: 'Feb 4 2004',
    founders: 'Mark Zuckerberg, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, Chris Hughes',
    firstMilestone: 'Dec 2004',
    firstMilestoneText: '1 million users',
    firstYear: 'Feb 2004–Feb 2005',
    firstYearHighlight: '1 million users by Dec 2004',
    monthlyGrowth: null,
    yearlyGrowth: 450,
    currentMAU: '3.07B MAU (2025)',
    source: 'BusinessOfApps',
    sourceUrl: 'https://www.businessofapps.com/data/facebook-statistics/',
    icon: 'FB'
  },
  {
    name: 'Twitter/X',
    color: '#1DA1F2',
    launch: 'Mar 21 2006',
    founders: 'Jack Dorsey, Noah Glass, Biz Stone, Evan Williams',
    firstMilestone: '2008',
    firstMilestoneText: '1 million users',
    firstYear: 'Mar 2006–Mar 2007',
    firstYearHighlight: '1 M users by 2008',
    monthlyGrowth: null,
    yearlyGrowth: null,
    currentMAU: '619 M MAU (Jan 2024)',
    source: 'Statista & Wikipedia',
    sourceUrl: '#',
    icon: 'X'
  },
  {
    name: 'YouTube',
    color: '#FF0000',
    launch: 'Feb 14 2005',
    founders: 'Steve Chen, Chad Hurley, Jawed Karim',
    firstMilestone: '2006',
    firstMilestoneText: '20 million MAU',
    firstYear: 'Feb 2005–Feb 2006',
    firstYearHighlight: '20 M MAU by 2006',
    monthlyGrowth: 666,
    yearlyGrowth: null,
    currentMAU: '2.491 B MAU (Jan 2024)',
    source: 'Backlinko & Wikipedia',
    sourceUrl: '#',
    icon: 'YT'
  },
  {
    name: 'Instagram',
    color: '#C13584',
    launch: 'Oct 6 2010',
    founders: 'Kevin Systrom, Mike Krieger',
    firstMilestone: 'Dec 2010',
    firstMilestoneText: '1 million MAU',
    firstYear: 'Oct 2010–Oct 2011',
    firstYearHighlight: '1 M MAU by Dec 2010',
    monthlyGrowth: 1000,
    yearlyGrowth: 1000,
    currentMAU: '2 B MAU (2025)',
    source: 'BusinessOfApps',
    sourceUrl: 'https://www.businessofapps.com/data/instagram-statistics/',
    icon: 'IG'
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    launch: 'Nov 2009',
    founders: 'Jan Koum, Brian Acton',
    firstMilestone: 'Oct 2010',
    firstMilestoneText: '10 million MAU',
    firstYear: 'Nov 2009–Nov 2010',
    firstYearHighlight: '10 M MAU by Oct 2010',
    monthlyGrowth: 400,
    yearlyGrowth: null,
    currentMAU: '2 B MAU (Jan 2024)',
    source: 'Statista',
    sourceUrl: 'https://www.statista.com/statistics/260819/number-of-monthly-active-whatsapp-users/',
    icon: 'WA'
  },
  {
    name: 'WeChat',
    color: '#07C160',
    launch: 'Jan 21 2011',
    founders: 'Allen Zhang (Tencent)',
    firstMilestone: '2012',
    firstMilestoneText: '50 million MAU',
    firstYear: 'Jan 2011–Jan 2012',
    firstYearHighlight: '50 M MAU by 2012',
    monthlyGrowth: 290,
    yearlyGrowth: null,
    currentMAU: '1.336 B MAU (Jan 2024)',
    source: 'BusinessOfApps',
    sourceUrl: 'https://www.businessofapps.com/data/wechat-statistics/',
    icon: 'WC'
  },
  {
    name: 'Clubhouse',
    color: '#F1C40F',
    launch: 'Mar 2020',
    founders: 'Paul Davison, Rohan Seth',
    firstMilestone: 'Feb 2021',
    firstMilestoneText: '10 million weekly active users',
    firstYear: 'Mar 2020–Mar 2021',
    firstYearHighlight: '10 M weekly active users by Feb 2021',
    monthlyGrowth: 500,
    yearlyGrowth: null,
    currentMAU: '10 M weekly active users (Feb 2021)',
    source: 'Backlinko',
    sourceUrl: 'https://backlinko.com/clubhouse-users',
    icon: 'CH'
  },
  {
    name: 'TikTok',
    color: '#000000',
    launch: 'Aug 2018',
    founders: 'Zhang Yiming (ByteDance)',
    firstMilestone: 'Dec 2018',
    firstMilestoneText: '271 million MAU',
    firstYear: 'Aug 2018–Aug 2019',
    firstYearHighlight: '271 M MAU by Dec 2018',
    monthlyGrowth: 393,
    yearlyGrowth: null,
    currentMAU: '1.04 B MAU (May 2024)',
    source: 'Backlinko',
    sourceUrl: 'https://backlinko.com/tiktok-users',
    icon: 'TT'
  },
  {
    name: 'Bluesky',
    color: '#0085FF',
    launch: 'Feb 2023',
    founders: 'Jack Dorsey, Jay Graber',
    firstMilestone: 'Sep 2023',
    firstMilestoneText: '1 million registered users',
    firstYear: 'Feb 2023–Feb 2024',
    firstYearHighlight: '1 M registered users by Sep 2023',
    monthlyGrowth: 800,
    yearlyGrowth: null,
    currentMAU: '35.1 M users (Apr 19 2025)',
    source: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bluesky',
    icon: 'BS'
  },
  {
    name: 'Threads',
    color: '#7719AA',
    launch: 'Jul 5 2023',
    founders: 'Instagram/Meta Team',
    firstMilestone: 'Jul 10 2023',
    firstMilestoneText: '100 million users in 5 days',
    firstYear: 'Jul 2023–Jul 2024',
    firstYearHighlight: '100 M users in 5 days',
    monthlyGrowth: 1000,
    yearlyGrowth: null,
    currentMAU: '320 M MAU (Jan 2025)',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com/2024/11/03/threads-now-has-275m-monthly-active-users/',
    icon: 'TH'
  },
  {
    name: 'ChatGPT',
    color: '#10A37F',
    launch: 'Nov 30 2022',
    founders: 'OpenAI (Sam Altman, team)',
    firstMilestone: 'Dec 5 2022',
    firstMilestoneText: '1 million users in 5 days',
    firstYear: 'Nov 2022–Nov 2023',
    firstYearHighlight: '100 M MAU by Jan 2023',
    monthlyGrowth: 2000,
    yearlyGrowth: 700,
    currentMAU: '400 M weekly users (Feb 2025)',
    source: 'Explodingtopics',
    sourceUrl: 'https://explodingtopics.com/blog/chatgpt-users',
    icon: 'CG'
  },
  {
    name: 'Cursor AI',
    color: '#6366F1',
    launch: 'Mar 2023',
    founders: 'Michael Truell, Sualeh Asif, Arvid Lunnemark, Aman Sanger',
    firstMilestone: 'Dec 2023',
    firstMilestoneText: '50K paying users',
    firstYear: 'Mar 2023–Mar 2024',
    firstYearHighlight: '$100M ARR in 12 months',
    monthlyGrowth: 54,
    yearlyGrowth: 9900,
    currentMAU: '360K users (2025)',
    source: 'Sacra',
    sourceUrl: 'https://sacra.com/c/cursor/',
    icon: 'CR'
  }
];

// Launch timeline data
const timelineData = platforms.map(p => ({
  name: p.name,
  launch: p.launch,
  color: p.color,
  founders: p.founders,
  firstMilestone: p.firstMilestone,
  firstMilestoneText: p.firstMilestoneText,
  icon: p.icon
}));

// Monthly growth data
const monthlyGrowthData = platforms
  .filter(p => p.monthlyGrowth !== null)
  .map(p => ({
    name: p.name,
    growth: p.monthlyGrowth,
    color: p.color
  }));

// Yearly growth data
const yearlyGrowthData = platforms
  .filter(p => p.yearlyGrowth !== null)
  .map(p => ({
    name: p.name,
    growth: p.yearlyGrowth,
    color: p.color
  }));

// Aggregate growth data (simplified)
const aggregateGrowthData = [
  { year: 2004, Facebook: 1, Instagram: 0, Twitter: 0, YouTube: 0, WhatsApp: 0, WeChat: 0, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2005, Facebook: 6, Instagram: 0, Twitter: 0, YouTube: 1, WhatsApp: 0, WeChat: 0, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2006, Facebook: 12, Instagram: 0, Twitter: 1, YouTube: 20, WhatsApp: 0, WeChat: 0, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2008, Facebook: 100, Instagram: 0, Twitter: 6, YouTube: 100, WhatsApp: 0, WeChat: 0, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2010, Facebook: 500, Instagram: 1, Twitter: 30, YouTube: 300, WhatsApp: 10, WeChat: 0, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2012, Facebook: 1000, Instagram: 100, Twitter: 200, YouTube: 800, WhatsApp: 100, WeChat: 50, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2014, Facebook: 1400, Instagram: 300, Twitter: 300, YouTube: 1300, WhatsApp: 500, WeChat: 400, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2016, Facebook: 1800, Instagram: 500, Twitter: 320, YouTube: 1500, WhatsApp: 1000, WeChat: 700, TikTok: 0, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2018, Facebook: 2300, Instagram: 1000, Twitter: 330, YouTube: 1900, WhatsApp: 1500, WeChat: 1000, TikTok: 271, Clubhouse: 0, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2020, Facebook: 2700, Instagram: 1400, Twitter: 350, YouTube: 2100, WhatsApp: 1800, WeChat: 1200, TikTok: 700, Clubhouse: 10, Bluesky: 0, Threads: 0, ChatGPT: 0, Cursor: 0 },
  { year: 2022, Facebook: 2900, Instagram: 1700, Twitter: 450, YouTube: 2300, WhatsApp: 1900, WeChat: 1300, TikTok: 850, Clubhouse: 5, Bluesky: 0, Threads: 0, ChatGPT: 100, Cursor: 0 },
  { year: 2023, Facebook: 3000, Instagram: 1800, Twitter: 550, YouTube: 2400, WhatsApp: 2000, WeChat: 1330, TikTok: 950, Clubhouse: 2, Bluesky: 1, Threads: 100, ChatGPT: 180, Cursor: 5 },
  { year: 2024, Facebook: 3050, Instagram: 1900, Twitter: 619, YouTube: 2491, WhatsApp: 2000, WeChat: 1336, TikTok: 1000, Clubhouse: 1, Bluesky: 20, Threads: 275, ChatGPT: 300, Cursor: 100 },
  { year: 2025, Facebook: 3070, Instagram: 2000, Twitter: 625, YouTube: 2500, WhatsApp: 2000, WeChat: 1340, TikTok: 1040, Clubhouse: 1, Bluesky: 35, Threads: 320, ChatGPT: 400, Cursor: 200 },
];

export default function TractionAnalysisPage() {
  const router = useRouter();
  const [visiblePlatforms, setVisiblePlatforms] = useState(platforms.map(p => p.name));
  const [showSourcePanel, setShowSourcePanel] = useState(false);

  const togglePlatform = (platform: string) => {
    if (visiblePlatforms.includes(platform)) {
      setVisiblePlatforms(visiblePlatforms.filter(p => p !== platform));
    } else {
      setVisiblePlatforms([...visiblePlatforms, platform]);
    }
  };

  const formatMAU = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}B`;
    }
    return `${value}M`;
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition"
        >
          ← Back to Home
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6"
        >
          <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-lg p-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Traction Analysis</h1>
            <p className="text-white/80 text-sm">Platform growth, engagement, and user milestones across major social platforms.</p>
          </div>
          {/* 1. HEADER & METADATA OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <div className="text-center mb-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                Social Platforms: Launch to Now
              </h1>
              <p className="text-xs sm:text-sm text-white/80 max-w-3xl mx-auto">
                Launch Dates, First‑Year Explosions & Modern MAU Milestones
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-800">Data Sources</h2>
                <button 
                  onClick={() => setShowSourcePanel(!showSourcePanel)}
                  className="text-blue-600 text-xs hover:text-blue-800 transition-colors"
                >
                  {showSourcePanel ? 'Hide Sources' : 'Show Details'}
                </button>
              </div>
              
              {showSourcePanel && (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="px-2 py-1.5 text-left text-xs font-medium text-white">Platform</th>
                        <th className="px-2 py-1.5 text-left text-xs font-medium text-white">Source Entity</th>
                        <th className="px-2 py-1.5 text-left text-xs font-medium text-white">Source URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platforms.map((platform, idx) => (
                        <tr key={idx} className="border-b border-white/10">
                          <td className="px-2 py-1.5 text-xs text-white">{platform.name}</td>
                          <td className="px-2 py-1.5 text-xs text-white">{platform.source}</td>
                          <td className="px-2 py-1.5 text-xs text-blue-600">
                            <a href={platform.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {platform.sourceUrl !== '#' ? 'View Source' : 'Multiple Sources'}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>

          {/* Platform visibility toggles */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Show/Hide Platforms</h2>
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((platform, idx) => (
                <button
                  key={idx}
                  onClick={() => togglePlatform(platform.name)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    visiblePlatforms.includes(platform.name) 
                      ? "text-white" 
                      : "bg-gray-100 text-gray-500"
                  }`}
                  style={{ 
                    backgroundColor: visiblePlatforms.includes(platform.name) 
                      ? platform.color 
                      : undefined 
                  }}
                >
                  {platform.icon} {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. LAUNCH DATE TIMELINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 sm:mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Launch Date Timeline (2004-2023)</h2>
              
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute w-0.5 bg-gray-200 h-full top-0 left-1/2 transform -translate-x-1/2"></div>
                
                <div className="flex flex-col space-y-6 sm:space-y-8">
                  {/* Group platforms by launch year */}
                  {visiblePlatforms
                    .map(name => platforms.find(p => p.name === name))
                    .filter(platform => platform !== undefined)
                    .sort((a, b) => new Date(a!.launch).getTime() - new Date(b!.launch).getTime())
                    .map((platform, index) => {
                      if (!platform) return null;
                      
                      const launchDate = new Date(platform.launch);
                      const launchYear = launchDate.getFullYear();
                      const isEven = index % 2 === 0;
                      
                      return (
                        <div key={platform.name} className="relative">
                          {/* Year marker */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1.5">
                            <div className="h-3 w-3 rounded-full bg-white border-2 border-gray-300"></div>
                          </div>
                          
                          {/* Content box */}
                          <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                            {/* Year label - always in the middle */}
                            <div className="w-16 text-center">
                              <div className="text-gray-600 font-semibold text-xs">{launchYear}</div>
                              <div className="text-[10px] text-gray-500">
                                {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(launchDate)} {launchDate.getDate()}
                              </div>
                            </div>
                            
                            {/* Platform card */}
                            <div 
                              className={`w-1/2 p-2 rounded-lg shadow-sm border-l-2 transform transition-transform duration-300 hover:scale-105 ${isEven ? 'ml-4' : 'mr-4'}`}
                              style={{ borderLeftColor: platform.color, backgroundColor: `${platform.color}10` }}
                            >
                              <div className="flex items-center mb-1">
                                <div 
                                  className="h-5 w-5 rounded-full flex items-center justify-center text-white text-xs font-bold mr-1.5"
                                  style={{ backgroundColor: platform.color }}
                                >
                                  {platform.icon}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-800 text-xs">{platform.name}</h3>
                                  <p className="text-[10px] text-gray-600">{platform.launch}</p>
                                </div>
                              </div>
                              
                              <div className="mt-1">
                                <p className="text-xs text-gray-700">
                                  <span className="font-semibold">Founders:</span> {platform.founders}
                                </p>
                                <div className="mt-1 bg-yellow-50 border border-yellow-200 rounded px-1.5 py-0.5 text-[10px] text-yellow-800">
                                  <span className="font-semibold">First Milestone:</span> {platform.firstMilestoneText} ({platform.firstMilestone})
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. FIRST-YEAR EXPLOSION KPI CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">First-Year Explosion</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visiblePlatforms.map(platformName => {
                  const platform = platforms.find(p => p.name === platformName);
                  if (!platform) return null;
                  
                  return (
                    <motion.div
                      key={platform.name}
                      className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                      style={{ borderColor: platform.color }}
                      whileHover={{ y: -3 }}
                    >
                      <div 
                        className="p-2 rounded-t-lg text-white"
                        style={{ backgroundColor: platform.color }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{platform.icon}</span>
                          <div>
                            <h3 className="font-bold text-xs">{platform.name}</h3>
                            <p className="text-[10px] opacity-90">First 12 Months</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <p className="text-xs text-gray-600 mb-1.5">{platform.firstYear}</p>
                        <div className="bg-yellow-50 border-l-2 border-yellow-400 p-1.5 rounded">
                          <p className="text-yellow-800 font-medium text-xs">
                            {platform.firstYearHighlight}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* 4. SPIKY GROWTH CHARTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 sm:mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Growth Spikes</h2>
              
              {/* Monthly Growth */}
              <div className="mb-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Monthly % Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={monthlyGrowthData.filter(d => visiblePlatforms.includes(d.name))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        tick={{ fontSize: 10 }}
                        height={60}
                      />
                      <YAxis 
                        label={{ 
                          value: 'Growth %', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle', fontSize: 10 }
                        }} 
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Monthly Growth']}
                        labelFormatter={(value) => `Platform: ${value}`}
                        contentStyle={{ fontSize: 10 }}
                      />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="growth" name="Monthly Growth %" radius={[4, 4, 0, 0]}>
                        {monthlyGrowthData
                          .filter(d => visiblePlatforms.includes(d.name))
                          .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="growth" position="top" formatter={(value: any) => `${value}%`} style={{ fontSize: 10 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Yearly Growth */}
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Yearly % Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={yearlyGrowthData.filter(d => visiblePlatforms.includes(d.name))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        tick={{ fontSize: 10 }}
                        height={60}
                      />
                      <YAxis 
                        label={{ 
                          value: 'Growth %', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle', fontSize: 10 }
                        }} 
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Yearly Growth']}
                        labelFormatter={(value) => `Platform: ${value}`}
                        contentStyle={{ fontSize: 10 }}
                      />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="growth" name="Yearly Growth %" radius={[4, 4, 0, 0]}>
                        {yearlyGrowthData
                          .filter(d => visiblePlatforms.includes(d.name))
                          .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="growth" position="top" formatter={(value: any) => `${value}%`} style={{ fontSize: 10 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. AGGREGATE GROWTH AREA CHART */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Cumulative Platform Growth (2004-2025)</h2>
              
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={aggregateGrowthData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis 
                      label={{ 
                        value: 'Monthly Active Users (Millions)', 
                        angle: -90, 
                        position: 'insideLeft', 
                        style: { textAnchor: 'middle', fontSize: 10 }
                      }}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} Million`, 'MAU']}
                      labelFormatter={(value) => `Year: ${value}`}
                      contentStyle={{ fontSize: 10 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    
                    {platforms
                      .filter(platform => visiblePlatforms.includes(platform.name))
                      .map((platform, index) => (
                        <Area 
                          key={platform.name}
                          type="monotone" 
                          dataKey={platform.name} 
                          stackId="1"
                          stroke={platform.color} 
                          fill={platform.color} 
                          fillOpacity={0.6}
                        />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-2 text-[10px] text-gray-500">
                <p className="italic">Note: Chart shows Monthly Active Users growth in millions. Some data points are approximated from available historical data.</p>
              </div>
            </div>
          </motion.div>

          {/* 6. MODERN MAU MILESTONES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Current MAU Milestones</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visiblePlatforms.map(platformName => {
                  const platform = platforms.find(p => p.name === platformName);
                  if (!platform) return null;
                  
                  return (
                    <motion.div
                      key={platform.name}
                      className="flex items-center p-2.5 bg-white rounded-lg border shadow-sm"
                      style={{ borderColor: platform.color }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center text-white text-base mr-3 flex-shrink-0"
                        style={{ backgroundColor: platform.color }}
                      >
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">{platform.name}</h3>
                        <p className="text-sm font-bold" style={{ color: platform.color }}>
                          {platform.currentMAU}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* 7. KEY INSIGHTS FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-4"
          >
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Key Insights</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-2 border-l-2 border-blue-500">
                  <p className="text-blue-800 text-xs">
                    <span className="font-bold text-blue-700">Facebook's 3 billion+ MAU</span> keeps it dominant in the social platform space
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-2 border-l-2 border-purple-500">
                  <p className="text-purple-800 text-xs">
                    <span className="font-bold text-purple-700">Instagram doubled MAU to 2 billion</span> in under 14 years
                  </p>
                </div>
                
                <div className="bg-black rounded-lg p-2 border-l-2" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                  <p className="text-gray-800 text-xs">
                    <span className="font-bold text-gray-900">TikTok hit 1 billion MAU by May 2024</span>—a rate faster than any predecessor
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-2 border-l-2 border-indigo-500">
                  <p className="text-indigo-800 text-xs">
                    <span className="font-bold text-indigo-700">Threads attracted 100 million users in 5 days;</span> retention is key
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-2 border-l-2 border-green-500">
                  <p className="text-green-800 text-xs">
                    <span className="font-bold text-green-700">ChatGPT reached 400M weekly users</span> by February 2025
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-2 border-l-2 border-indigo-500">
                  <p className="text-indigo-800 text-xs">
                    <span className="font-bold text-indigo-700">Cursor AI grew 9,900% year-over-year</span> to reach $100M ARR in just 12 months
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 