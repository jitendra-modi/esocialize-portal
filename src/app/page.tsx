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

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  const tractionData = {
    headers: ['Platform', 'MAU', 'Engagement', 'Growth'],
    rows: [
      ['Facebook', '3.07B', '45%', '+12%'],
      ['ChatGPT', '400M', '38%', '+700%'],
      ['TikTok', '1.04B', '52%', '+10%'],
    ],
  };

  const roadmap = [
    { quarter: 'Q1', milestones: ['Platform Launch', 'User Testing', 'Initial Marketing'] },
    { quarter: 'Q2', milestones: ['Feature Expansion', 'Partnerships', 'User Growth'] },
    { quarter: 'Q3', milestones: ['Monetization', 'Scale Infrastructure', 'New Markets'] },
    { quarter: 'Q4', milestones: ['Premium Features', 'Enterprise Solutions', 'Year Review'] },
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
          <div className="flex justify-between items-center mb-4">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                  E-Socialize by Positive Emotions Lab
                </h1>
                <p className="text-xs sm:text-sm text-white/80 max-w-3xl mx-auto">
                  Empowering Social Connections Through Positive Experiences
                </p>
              </motion.div>
            </AnimatePresence>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleSignOut}
              className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              Sign Out
            </motion.button>
          </div>
          
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
                      <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-2">
                        <div className="p-2 text-center">
                          <div className="flex justify-center space-x-1 mb-1">
                            {["L1", "L2", "L3", "L4"].map((layer, i) => (
                              <div key={i} className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">
                                {layer}
                              </div>
                            ))}
                          </div>
                          <p className="text-white font-medium text-xs">4-Layer System</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white/90 text-xs">L1: Emotional Outcome Layer</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white/90 text-xs">L2: User Engagement Environment</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white/90 text-xs">L3: Social Maestro Facilitation</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-1.5">
                          <p className="text-white/90 text-xs">L4: Core Operations & AI</p>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-white/80 text-xs font-semibold hover:text-white transition-colors">View Architecture &rarr;</span>
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
                      <p className="text-white/80 text-xs mb-2">Virtual Social Interactions with AI</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white/90 text-xs font-semibold">Conference Tool</span>
                          <span className="text-white/60 text-[10px] text-center">AI-powered meetings</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white/90 text-xs font-semibold">Emotion Plugin</span>
                          <span className="text-white/60 text-[10px] text-center">Real-time engagement</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white/90 text-xs font-semibold">AI Training</span>
                          <span className="text-white/60 text-[10px] text-center">Skill-building</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                          <span className="text-white/90 text-xs font-semibold">Analytics</span>
                          <span className="text-white/60 text-[10px] text-center">Insights & reports</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors">View UI &rarr;</span>
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
                  <div className="bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] rounded-lg p-3 hover:opacity-90 transition-all duration-300 h-fit">
                    <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-2">
                      <div className="text-center">
                        <p className="text-white font-medium text-xs">Interactive Presentation</p>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed text-xs flex-grow mb-2">Access our comprehensive pitch deck with market opportunity, technology, and growth strategy details.</p>
                    <a href="/pitch-deck.pdf" className="inline-block bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded text-xs font-medium transition-all duration-300 text-center w-full">
                      View Pitch Deck
                    </a>
                  </div>
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
                    <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-2">
                      <div className="text-center">
                        <p className="text-white font-medium text-xs">Strategy & Growth</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white/10 rounded-lg p-2">
                        <h4 className="text-white font-semibold text-xs mb-1">Vision & Mission</h4>
                        <p className="text-white/70 text-xs">Creating meaningful social connections through positive emotional experiences.</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2">
                        <h4 className="text-white font-semibold text-xs mb-1">Market Analysis</h4>
                        <p className="text-white/70 text-xs">Targeting the growing social media market with a focus on emotional well-being.</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2">
                        <h4 className="text-white font-semibold text-xs mb-1">Revenue Model</h4>
                        <p className="text-white/70 text-xs">Freemium model with premium features and enterprise solutions.</p>
                      </div>
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
                          <h4 className="text-white/90 text-xs font-semibold">Platform Growth (2004-2025)</h4>
                          <span className="text-[10px] text-white/60">Timeline</span>
                        </div>
                        <div className="h-6 bg-white/10 rounded-lg relative overflow-hidden">
                          {[2004, 2010, 2020, 2025].map((year, i) => (
                            <div key={i} className="absolute bottom-0 text-[8px] text-white/60" style={{ left: `${i * 33}%` }}>
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
                      
                      <div className="mt-2 flex items-center justify-between text-[10px] text-white/60 bg-white/10 p-1.5 rounded">
                        <span>ChatGPT</span>
                        <span>2000% Growth in First Year</span>
                      </div>

                      <div className="mt-2 text-right">
                        <span className="text-white/80 text-xs font-semibold hover:text-white transition-colors">View Analysis &rarr;</span>
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
                        <div className="flex justify-between text-[8px] text-white/70 px-1">
                          <span>Q1</span>
                          <span>Q2</span>
                          <span>Q3</span>
                          <span>Q4</span>
                        </div>
                      </div>

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
                                <li key={idx} className="text-white/70 text-[10px] flex items-center">
                                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-1" />
                                  {milestone}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-2 text-right">
                        <span className="text-white/80 text-xs font-semibold hover:text-white transition-colors">View Roadmap &rarr;</span>
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
                <span className="text-white/90 font-medium text-xs">Deep togetherness, anywhere</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </ProtectedRoute>
  );
}