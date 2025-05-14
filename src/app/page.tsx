"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import MiniCard from '@/components/MiniCard';
import Table from '@/components/Table';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  // If no user is logged in, don't render anything while redirecting
  if (!user) {
    return null;
  }

  const tractionData = {
    headers: ['Platform', 'MAU', 'Engagement', 'Growth'],
    rows: [
      ['Facebook', '3.07B', '45%', '+12%'],
      ['ChatGPT', '400M', '38%', '+700%'],
      ['TikTok', '1.04B', '52%', '+10%'],
    ],
  };

  const roadmap = [
    { quarter: 'Q1', milestones: ['Community Growth to 500', 'Social Maestro Pool: 50', 'S&M Cost: ₹40 lakhs'] },
    { quarter: 'Q2', milestones: ['Community: 5,000', 'Overseas Members: 200', 'SM Pool: 250'] },
    { quarter: 'Q3', milestones: ['Community: 30,000', 'Corporate Users: 2,000', 'SM Pool: 2,500'] },
    { quarter: 'Q4', milestones: ['Community: 150,000', 'Premium Launch', 'Overseas: 5,000'] },
  ];

  // Check if the user has permission for a specific section
  const hasPermission = (sectionId: string) => {
    if (!user) return false;
    
    // Admins and core members can access everything
    if (user.role === 'admin' || user.role === 'core_member') return true;
    
    // Team members can access only what they have permission for
    if (user.role === 'team_member') {
      return !!user.permissions?.[sectionId];
    }
    
    return false;
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#1a1a2e] py-4 sm:py-6">
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="columns-1 sm:columns-2 space-y-4">
            {/* Architecture */}
            {hasPermission('architecture') && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="break-inside-avoid bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 h-fit mb-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">Architecture</h3>
                  <Link href="/architecture" className="block">
                    <div className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                      <h2 className="text-sm font-bold text-white mb-2">4-Layer System</h2>
                      <div className="grid grid-cols-4 gap-1 mb-2">
                            {["L1", "L2", "L3", "L4"].map((layer, i) => (
                          <div key={i} className="bg-white/10 rounded-lg p-1 flex flex-col items-center">
                            <span className="text-white text-xs font-semibold">{layer}</span>
                            <span className="text-white text-[10px] text-center">
                              {i === 0 ? "Emotional" : i === 1 ? "Engagement" : i === 2 ? "Maestro" : "Core"}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white text-xs">L1: Emotional Outcome Layer</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white text-xs">L2: User Engagement Environment</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white text-xs">L3: Social Maestro Facilitation</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white text-xs">L4: Core Operations & AI</p>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-white text-xs font-semibold hover:text-white transition-colors">View Architecture &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}

            {/* E-Socialize App UI */}
            {hasPermission('app-ui') && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="break-inside-avoid bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 h-fit mb-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">E-Socialize App UI</h3>
                  <Link href="/app-ui" className="block group">
                    <div className="bg-gradient-to-r from-[#11998e] to-[#38ef7d] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                      <h2 className="text-sm font-bold text-white group-hover:text-white transition-colors mb-2">UI Components</h2>
                      <p className="text-white text-xs mb-2">Virtual Social Interactions with AI</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Conference Tool</span>
                          <span className="text-white text-[10px] text-center">AI-powered meetings</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Emotion Plugin</span>
                          <span className="text-white text-[10px] text-center">Real-time engagement</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">AI Training</span>
                          <span className="text-white text-[10px] text-center">Skill-building</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Analytics</span>
                          <span className="text-white text-[10px] text-center">Insights & reports</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-white text-xs font-semibold group-hover:text-white transition-colors">View UI &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pitch Deck */}
            {hasPermission('pitch-deck') && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="break-inside-avoid bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 h-fit mb-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">Pitch Deck</h3>
                  <Link href="/pitch-deck" className="block">
                  <div className="bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                      <h2 className="text-sm font-bold text-white mb-2">Interactive Presentation</h2>
                      <p className="text-white text-xs mb-2">Market opportunity, tech & growth strategy details</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Market Data</span>
                          <span className="text-white text-[10px] text-center">Growth insights</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Financials</span>
                          <span className="text-white text-[10px] text-center">Projections</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Technology</span>
                          <span className="text-white text-[10px] text-center">Platform details</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white text-xs font-semibold">Team</span>
                          <span className="text-white text-[10px] text-center">Leadership</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-white text-xs font-semibold hover:text-white transition-colors">View Pitch Deck &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Business Strategy */}
            {hasPermission('business-strategy') && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="break-inside-avoid bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 h-fit mb-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">Business Strategy</h3>
                  <div className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                    <h2 className="text-sm font-bold text-white mb-2">Strategy & Growth</h2>
                    <p className="text-white text-xs mb-2">Creating meaningful social connections through positive experiences</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-white text-xs font-semibold">Vision</span>
                        <span className="text-white text-[10px] text-center">Mission</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-white text-xs font-semibold">Market</span>
                        <span className="text-white text-[10px] text-center">Analysis</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-white text-xs font-semibold">Revenue</span>
                        <span className="text-white text-[10px] text-center">Model</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-white text-xs font-semibold">Growth</span>
                        <span className="text-white text-[10px] text-center">Strategy</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-white text-xs font-semibold hover:text-white transition-colors">View Strategy &rarr;</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Traction Analysis */}
            {hasPermission('traction-analysis') && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="break-inside-avoid bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 h-fit mb-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">Traction Analysis</h3>
                  <Link href="/traction-analysis" className="block">
                    <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white text-xs font-semibold">Platform Growth (2004-2025)</h4>
                          <span className="text-[10px] text-white">Timeline</span>
                        </div>
                        <div className="h-6 bg-white/10 rounded-lg relative overflow-hidden">
                          {[2004, 2010, 2020, 2025].map((year, i) => (
                            <div key={i} className="absolute bottom-0 text-[8px] text-white" style={{ left: `${i * 33}%` }}>
                              {year}
                            </div>
                          ))}
                          <div className="absolute left-[15%] bottom-0 w-1 h-4 bg-blue-400"></div>
                          <div className="absolute left-[40%] bottom-0 w-1 h-3 bg-purple-400"></div>
                          <div className="absolute left-[85%] bottom-0 w-1 h-5 bg-pink-400"></div>
                        </div>
                      </div>

                      <div className="text-xs">
                        <Table headers={tractionData.headers} rows={tractionData.rows} />
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between text-[10px] text-white bg-white/10 p-1.5 rounded">
                        <span>ChatGPT</span>
                        <span>2000% Growth in First Year</span>
                      </div>

                      <div className="mt-2 text-right">
                        <span className="text-white text-xs font-semibold hover:text-white transition-colors">View Analysis &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Roadmap */}
            {hasPermission('roadmap') && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="break-inside-avoid bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 h-fit mb-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">Roadmap</h3>
                  <Link href="/roadmap" className="block">
                    <div className="bg-gradient-to-r from-[#f46b45] to-[#eea849] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                      <div className="mb-2">
                        <div className="w-full h-3 bg-white/10 rounded-full flex items-center justify-between px-2 mb-1">
                          <div className="h-2 w-2 rounded-full bg-green-400"></div>
                          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                          <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                          <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-white px-1">
                          <span>Q1</span>
                          <span>Q2</span>
                          <span>Q3</span>
                          <span>Q4</span>
                        </div>
                      </div>

                      <h2 className="text-sm font-bold text-white mb-2">Year 1 Growth & Metrics</h2>
                      <p className="text-white text-xs mb-2">Scaling Community Size, SM Capacity & Spend Efficiency</p>

                      <div className="space-y-1.5 flex-grow">
                        {roadmap.map(({ quarter, milestones }, index) => (
                          <div key={quarter} className="bg-white/10 rounded-lg p-1.5">
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className={`w-2 h-2 rounded-full ${
                                index === 0 ? 'bg-green-400' : 
                                index === 1 ? 'bg-blue-400' :
                                index === 2 ? 'bg-yellow-400' : 'bg-purple-400'
                              }`}></div>
                              <h4 className="text-white font-semibold text-xs">{quarter}</h4>
                            </div>
                            <ul className="space-y-1">
                              {milestones.map((milestone, idx) => (
                                <li key={idx} className="text-white text-[10px] flex items-center">
                                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-1" />
                                  {milestone}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-2 text-right">
                        <span className="text-white text-xs font-semibold hover:text-white transition-colors">View Roadmap &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Central Spine */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-3 text-center"
            >
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2C3E50] to-[#3498DB] rounded-full px-3 py-1">
                <span className="text-white font-medium text-xs">Deep togetherness, anywhere</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </ProtectedRoute>
  );
}