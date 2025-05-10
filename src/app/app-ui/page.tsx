"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface QuadrantProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const Quadrant: React.FC<QuadrantProps> = ({ title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.2 }}
    className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
  >
    <h3 className="text-sm sm:text-base font-semibold text-white mb-3">{title}</h3>
    {children}
  </motion.div>
);

const IconBox = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex items-start gap-2 bg-white/5 rounded-lg p-3">
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
      <span className="text-base">{icon}</span>
    </div>
    <div>
      <h4 className="text-white font-semibold text-xs mb-1">{title}</h4>
      <p className="text-white/70 text-xs">{description}</p>
    </div>
  </div>
);

const Metric = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex flex-col items-center bg-white/5 rounded-lg p-2">
    <div className={`text-sm font-bold ${color}`}>{value}</div>
    <div className="text-white/70 text-xs mt-1">{label}</div>
  </div>
);

export default function AppUIPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#1a1a2e] py-4 sm:py-6">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6"
        >
          <button
            onClick={() => router.push('/')}
            className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition text-left"
          >
            ← Back to Home
          </button>
          
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              E-Socialize App UI
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-3xl mx-auto">
              Revolutionizing Virtual Social Interactions with AI
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Virtual Conference Tool */}
          <Quadrant title="Virtual Conference Tool" delay={0}>
            <Link href="/virtual-conference" className="block">
              <div className="space-y-3">
                {/* Top AI Bar */}
                <div className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-xs font-semibold">Live AI Emotion Bar</h4>
                    <span className="text-green-400 text-[10px]">Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-white/70">
                      <span>AI Emotion Analysis</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full w-[85%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                        style={{ transition: 'width 1s ease-in-out' }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-white/50">
                      <span>Low</span>
                      <span>Moderate</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Video Call Grid - Reduced to 60% */}
                <div className="bg-white/10 rounded-lg p-3 relative">
                  <div className="max-w-[60%] mx-auto">
                    {/* Grid of avatars */}
                    <div className="grid grid-cols-3 gap-1 aspect-[4/3]">
                      {Array(9).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className={`
                            relative rounded-lg bg-white/10 overflow-hidden
                            ${i === 4 ? 'ring-1 ring-yellow-400' : ''}
                            hover:ring-1 hover:ring-white/30 transition-all duration-300
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                          {i === 4 && (
                            <div className="absolute top-1 right-1 bg-yellow-400 text-[8px] text-black px-1 py-0.5 rounded-full font-medium">
                              SM
                            </div>
                          )}
                          <div className="absolute bottom-1 left-1 right-1 flex items-center">
                            <div className="w-1 h-1 bg-green-400 rounded-full mr-1" />
                            <span className="text-[8px] text-white/90">User {i + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meeting Controls */}
                  <div className="mt-3 flex justify-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                      <span className="text-xs">🎤</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                      <span className="text-xs">📹</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500/30 transition-colors">
                      <span className="text-xs">📴</span>
                    </div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-2">
                  <IconBox
                    icon="👥"
                    title="Optimal Group Size"
                    description="6-12 participants for intimate interactions"
                  />
                  <IconBox
                    icon="🧩"
                    title="AI Team Split"
                    description="Smart grouping for best dynamics"
                  />
                </div>
              </div>
            </Link>
          </Quadrant>

          {/* Positive Emotions AI Plugin */}
          <Quadrant title="Positive Emotions AI Plugin" delay={0.2}>
            <Link href="/ai-plugin" className="block">
              <div className="space-y-3">
                {/* AI Status Dashboard */}
                <div className="bg-gradient-to-r from-[#2C3E50] to-[#2980B9] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white text-xs font-semibold">AI System Status</h4>
                      <p className="text-white/50 text-[10px] mt-0.5">All systems operational</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-[10px] text-white/70">Core AI</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-[10px] text-white/70">Emotion</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Processing Visualization */}
                  <div className="relative h-24 bg-white/5 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
                    </div>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                        style={{
                          left: `${i * 14 + 2}%`,
                          height: '100%',
                          animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="w-10 h-10 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-lg">📊</span>
                    </div>
                    <h5 className="text-white text-xs font-medium mb-1">Real-time Analysis</h5>
                    <p className="text-white/50 text-[10px]">Instant emotion tracking</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="w-10 h-10 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-lg">💡</span>
                    </div>
                    <h5 className="text-white text-xs font-medium mb-1">Smart Insights</h5>
                    <p className="text-white/50 text-[10px]">AI-driven suggestions</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="w-10 h-10 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-lg">🎯</span>
                    </div>
                    <h5 className="text-white text-xs font-medium mb-1">Targeted Actions</h5>
                    <p className="text-white/50 text-[10px]">Personalized responses</p>
                  </div>
                </div>

                {/* Integration Status */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white text-sm font-semibold mb-3">Platform Integration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                          <span className="text-sm">💻</span>
                        </div>
                        <span className="text-white/70 text-xs">Core Platform</span>
                      </div>
                      <span className="text-green-400 text-xs">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                          <span className="text-sm">🔄</span>
                        </div>
                        <span className="text-white/70 text-xs">API Services</span>
                      </div>
                      <span className="text-green-400 text-xs">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Quadrant>

          {/* AI Training */}
          <Quadrant title="AI-Driven Training for Social Maestros" delay={0.4}>
            <Link href="/social-maestro-training" className="block">
              <div className="space-y-4">
                {/* Training Dashboard */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white text-sm font-semibold">Training Progress</h4>
                      <p className="text-white/50 text-xs mt-1">Current Batch: SM-2024-Q1</p>
                    </div>
                    <div className="bg-white/10 rounded-full px-3 py-1">
                      <span className="text-white/90 text-xs">42 Active Trainees</span>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">Course Completion</span>
                        <span className="text-white/90">75%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">Average Performance</span>
                        <span className="text-white/90">88%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[88%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Modules */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white text-sm font-semibold mb-3">Virtual Practice</h4>
                    <div className="relative h-32 bg-white/5 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-full" />
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-8 h-8 bg-white/20 rounded-full"
                            style={{
                              transform: `rotate(${i * 60}deg) translateY(-24px)`
                            }}
                          >
                            <div className="absolute inset-0 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-2 inset-x-2 h-1 bg-white/10 rounded">
                        <div className="h-full w-2/3 bg-purple-500 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white text-sm font-semibold mb-3">Live Training</h4>
                    <div className="grid grid-cols-2 gap-2 h-32">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="relative bg-white/10 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                          <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                              <span className="text-[10px] text-white/90">SM {i + 1}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-white text-sm font-medium">92%</div>
                    <div className="text-white/50 text-xs">Success Rate</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-white text-sm font-medium">4.8/5</div>
                    <div className="text-white/50 text-xs">Trainee Rating</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🎓</div>
                    <div className="text-white text-sm font-medium">850+</div>
                    <div className="text-white/50 text-xs">Trained</div>
                  </div>
                </div>
              </div>
            </Link>
          </Quadrant>

          {/* Backend Analytics */}
          <Quadrant title="Backend Analytics & Reports" delay={0.6}>
            <Link href="/analytics" className="block">
              <div className="space-y-4">
                {/* Top Stats Bar */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white text-sm font-semibold">Real-time Analytics</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs">Live</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-white/70 mb-1">Active Sessions</div>
                      <div className="text-lg font-bold text-white">247</div>
                      <div className="text-xs text-green-400">+12% ↑</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-white/70 mb-1">Avg. PEI Score</div>
                      <div className="text-lg font-bold text-white">85%</div>
                      <div className="text-xs text-green-400">+5% ↑</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-white/70 mb-1">Active SMs</div>
                      <div className="text-lg font-bold text-white">42</div>
                      <div className="text-xs text-blue-400">Online</div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white text-sm font-semibold mb-3">Session PEI Trends</h4>
                    <div className="relative h-32">
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-lg" />
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500/20" />
                      <div className="absolute bottom-0 left-0 h-32 w-full">
                        <div className="relative h-full">
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute bottom-0 bg-gradient-to-t from-purple-500 to-indigo-500"
                              style={{
                                left: `${i * 15}%`,
                                height: `${50 + Math.random() * 40}%`,
                                width: '4px',
                                borderRadius: '4px',
                                opacity: 0.7
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white text-sm font-semibold mb-3">Engagement Matrix</h4>
                    <div className="grid grid-cols-3 grid-rows-3 gap-1 h-32">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white/5 rounded"
                          style={{
                            opacity: 0.3 + Math.random() * 0.7,
                            background: `linear-gradient(45deg, rgba(168, 85, 247, ${0.2 + Math.random() * 0.8}), rgba(99, 102, 241, ${0.2 + Math.random() * 0.8}))`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-4 gap-2">
                  <Metric label="Smile Rate" value="95%" color="text-green-400" />
                  <Metric label="Engagement" value="80%" color="text-blue-400" />
                  <Metric label="Retention" value="92%" color="text-purple-400" />
                  <Metric label="Growth" value="+15%" color="text-indigo-400" />
                </div>
              </div>
            </Link>
          </Quadrant>
        </div>

        {/* Central Spine */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-6 py-2">
            <span className="text-2xl">❤️</span>
            <span className="text-white/90 font-medium">Deep togetherness, anywhere</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 