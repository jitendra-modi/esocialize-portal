"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  icon: string;
  isActive: boolean;
  layerNumber: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, icon, isActive, layerNumber }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`
      relative flex items-center group mb-8 cursor-pointer
      ${isActive ? 'scale-100' : 'opacity-75 hover:opacity-100 scale-95'}
      transition-all duration-500
    `}
    onClick={() => {
      const index = Number(layerNumber.replace('L', '')) - 1;
      const element = document.getElementById(`layer-${index}`);
      element?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    {/* Layer number badge */}
    <div className={`
      absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 text-sm
      flex items-center justify-center rounded-full
      ${isActive ? 'bg-white text-indigo-950' : 'bg-white/20 text-white'}
      font-bold transition-all duration-500
    `}>
      {layerNumber}
    </div>

    {/* Vertical line connector */}
    <div className="absolute left-6 h-full w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    
    {/* Content */}
    <div className={`
      relative z-10 ml-6 bg-white/10 backdrop-blur-lg rounded-xl p-3
      border border-white/10 transition-all duration-500 w-full
      ${isActive ? 'bg-white/20 border-white/30 shadow-2xl shadow-white/10' : 'hover:bg-white/15'}
    `}>
      <div className="flex items-center gap-2">
        <div className={`
          w-7 h-7 rounded-lg flex items-center justify-center
          bg-gradient-to-br from-indigo-500 to-purple-600 text-lg
          ${isActive ? 'scale-110 shadow-lg shadow-indigo-500/50' : ''}
          transition-all duration-500
        `}>
          <span className="text-base">{icon}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold text-xs">{title}</h4>
          <p className="text-white/60 text-xs">{subtitle}</p>
        </div>
      </div>
    </div>

    {/* Horizontal connector line for desktop */}
    <div className={`
      absolute left-full top-1/2 w-8 h-0.5 hidden lg:block
      ${isActive 
        ? 'bg-gradient-to-r from-white via-white to-transparent animate-pulse' 
        : 'bg-gradient-to-r from-white/20 to-transparent'}
      transition-all duration-500
    `} />

    {/* Animated dots when active */}
    {isActive && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute left-full top-1/2 -translate-y-1/2 flex gap-1 hidden lg:flex"
      >
        <div className="w-1 h-1 rounded-full bg-white" />
        <div className="w-1 h-1 rounded-full bg-white/80" />
        <div className="w-1 h-1 rounded-full bg-white/60" />
      </motion.div>
    )}
  </motion.div>
);

interface ArchitectureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const ArchitectureCard: React.FC<ArchitectureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    className="bg-white/5 backdrop-blur-lg rounded-xl p-3 hover:bg-white/10 transition-all duration-300 border border-white/10"
  >
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-2 shadow-lg">
      <span className="text-base">{icon}</span>
    </div>
    <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
    <p className="text-white/70 text-xs">{description}</p>
  </motion.div>
);

interface ArchitectureLayerProps {
  title: string;
  description: string;
  items: Array<{ icon: string; title: string; description: string }>;
  gradient: string;
  delay?: number;
}

const ArchitectureLayer: React.FC<ArchitectureLayerProps> = ({ title, description, items, gradient, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: delay * 0.2 }}
    className={`rounded-2xl p-4 ${gradient} mb-6`}
  >
    <div className="max-w-4xl">
      <h2 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h2>
      <p className="text-white/80 mb-4 text-xs sm:text-sm">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <ArchitectureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            delay={index + 1}
          />
        ))}
      </div>
    </div>
  </motion.section>
);

export default function ArchitecturePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const timelineItems = [
    { 
      layerNumber: "L1",
      icon: "📊", 
      title: "AI Generated User Report", 
      subtitle: "Emotional Analysis & Insights" 
    },
    { 
      layerNumber: "L2",
      icon: "📈", 
      title: "AI Bar and Emotion Tracker", 
      subtitle: "Real-time Emotion Monitoring" 
    },
    { 
      layerNumber: "L3",
      icon: "🎯", 
      title: "SM AI Controls and Report", 
      subtitle: "Social Maestro Management" 
    },
    { 
      layerNumber: "L4",
      icon: "⚡", 
      title: "AI Core Infrastructure", 
      subtitle: "Platform Foundation" 
    }
  ];

  const layers = [
    {
      title: "Emotional Outcome for the User",
      description: "Creating meaningful and positive emotional experiences for our users",
      gradient: "bg-gradient-to-r from-[#2C3E50] to-[#3498DB]",
      items: [
        {
          icon: "✨",
          title: "Feeling of Goodness & Warmth",
          description: "Enhanced positive emotions through carefully crafted interactions"
        },
        {
          icon: "❤️",
          title: "Happiness",
          description: "Elevated mood states through engaging social experiences"
        },
        {
          icon: "✨",
          title: "Good Emotions",
          description: "Overall wellbeing improvement through positive social connections"
        }
      ]
    },
    {
      title: "User Engagement Environment",
      description: "Building meaningful connections in a supportive digital space",
      gradient: "bg-gradient-to-r from-[#2C3E50] to-[#2980B9]",
      items: [
        {
          icon: "💬",
          title: "Positive Group Dynamics",
          description: "Fostering collaborative interaction and mutual support"
        },
        {
          icon: "❤️",
          title: "Emotionally Engaging Sessions",
          description: "Creating deep, meaningful connections between users"
        },
        {
          icon: "⬆️",
          title: "Active Participation",
          description: "Encouraging involved engagement through interactive features"
        }
      ]
    },
    {
      title: "Social Maestro Facilitation Layer",
      description: "Expert guidance and facilitation for optimal social experiences",
      gradient: "bg-gradient-to-r from-[#2C3E50] to-[#27AE60]",
      items: [
        {
          icon: "⬆️",
          title: "Trained & Groomed SMs",
          description: "Expert facilitators trained in social interaction"
        },
        {
          icon: "💬",
          title: "Script Powered Facilitation",
          description: "Structured engagement protocols for consistency"
        },
        {
          icon: "📊",
          title: "Live Feedback Loop",
          description: "Real-time adjustments based on user responses"
        },
        {
          icon: "🖥️",
          title: "Virtual Environment",
          description: "Immersive digital spaces for meaningful interaction"
        }
      ]
    },
    {
      title: "E-Socialize Core Operations",
      description: "Powered by advanced AI technology for optimal user matching and experience",
      gradient: "bg-gradient-to-r from-[#2C3E50] to-[#8E44AD]",
      items: [
        {
          icon: "📊",
          title: "AI Matching Engine",
          description: "Smart algorithms for perfect user-group matching"
        },
        {
          icon: "⬆️",
          title: "Social Maestro Selection",
          description: "AI-powered facilitator matching system"
        },
        {
          icon: "🖥️",
          title: "Custom Virtual Interface",
          description: "Adaptive environment tailored to each session"
        },
        {
          icon: "💻",
          title: "AI Training System",
          description: "Continuous improvement of facilitator skills"
        }
      ]
    }
  ];

  // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced scroll handling with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.layer-section');
      
      // Find the section currently in view
      let currentSection = 0;
      let closestDistance = Number.MAX_VALUE;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const centerPoint = window.innerHeight / 2;
        const distance = Math.abs(rect.top + rect.height / 2 - centerPoint);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          currentSection = index;
        }
      });
      
      // Update active section
      setActiveSection(currentSection);
      
      // Add highlight class to the corresponding layer
      sections.forEach((s, i) => {
        if (i === currentSection) {
          s.classList.add('active-layer');
        } else {
          s.classList.remove('active-layer');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e] py-4 sm:py-6">
      <div className="w-full px-3 sm:px-4">
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-white/10 transition text-left"
          >
            ← Back to Home
          </button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4 sm:mb-6"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              E-Socialize Architecture
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-3xl mx-auto">
              A comprehensive emotion-driven social platform powered by advanced AI integration
            </p>
          </motion.div>

          {/* Responsive Layout */}
          <div className={`${isMobile ? 'flex flex-col' : 'relative flex justify-center gap-4'}`}>
            {/* Mobile Timeline at top */}
            {isMobile && (
              <div className="mb-4 bg-white/5 p-3 rounded-xl backdrop-blur mx-auto max-w-full overflow-x-auto">
                <h3 className="text-white mb-2 font-medium text-sm text-center">Architecture Layers</h3>
                <div className="flex justify-center gap-2 pb-2 scrollbar-hide">
                  {timelineItems.map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => {
                        const element = document.getElementById(`layer-${index}`);
                        element?.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(index);
                      }}
                      className={`
                        flex-shrink-0 flex items-center gap-2 p-2 rounded-lg cursor-pointer
                        border border-white/10 transition-all duration-300
                        ${activeSection === index ? 'bg-white/20 border-white/30 scale-105' : 'bg-white/5 hover:bg-white/10'}
                      `}
                    >
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${activeSection === index ? 'bg-white text-indigo-950' : 'bg-white/10 text-white'}
                        transition-all duration-300
                      `}>
                        {item.layerNumber}
                      </div>
                      <div className="text-white text-xs">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop Timeline - Fixed with auto height */}
            {!isMobile && (
              <div className="w-[200px] h-auto flex-shrink-0">
                <div className="fixed top-1/2 -translate-y-1/2 left-16 pt-4 overflow-visible">
                  <div className="space-y-8 pr-4">
                    {timelineItems.map((item, index) => (
                      <TimelineItem
                        key={index}
                        {...item}
                        isActive={index === activeSection}
                        layerNumber={item.layerNumber}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content - Adjust margin based on viewport */}
            <div className={`flex-1 mx-auto flex flex-col items-center w-full max-w-3xl ${!isMobile ? 'ml-[160px]' : ''} bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10`}>
              <div className="space-y-5 w-full">
                {layers.map((layer, index) => (
                  <motion.div
                    key={index}
                    id={`layer-${index}`}
                    className={`layer-section transition-all duration-500 w-full
                      ${index === activeSection ? 'scale-100 shadow-lg' : 'opacity-75 scale-95 hover:opacity-90 hover:scale-97'}
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: index === activeSection ? 1 : 0.75, 
                      y: 0,
                      scale: index === activeSection ? 1 : 0.95
                    }}
                    whileHover={{ 
                      scale: index === activeSection ? 1 : 0.97,
                      opacity: index === activeSection ? 1 : 0.9
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveSection(index)}
                  >
                    <ArchitectureLayer
                      {...layer}
                      delay={index + 1}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 