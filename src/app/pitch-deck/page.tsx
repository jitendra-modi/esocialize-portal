'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LabelList, Cell, PieChart, Pie, LineChart, Line, Legend, Label
} from 'recharts';

// Scaling utility class - for 20% size reduction
const scalingClass = "scale-80 origin-center"; // scale to 80% = 20% reduction

// Helper for formatting numbers in charts
const numberToStringFormatter = (value: any): string => {
  if (typeof value === 'number') {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    } else {
      return value.toString();
    }
  }
  return String(value);
};

// Arrow icon for navigation and connections
const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Expand/Fullscreen icon
const ExpandIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
  </svg>
);

// Contract/Exit fullscreen icon
const ContractIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MainSlide = () => (
  <div className="w-full h-full relative">
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 rounded-2xl border-2 border-indigo-100 p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-indigo-800">E-Socialize Platform Overview</h2>
        
        <div className="bg-white rounded-lg py-1 px-2 shadow-md flex items-center space-x-2 border border-indigo-100">
          <div className="bg-indigo-100 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm font-bold text-indigo-700">AI-Driven Social Connection</div>
        </div>
      </div>
      
      <div className="flex-1 h-[520px]">
        {/* Main Container */}
        <div className="w-full flex flex-col items-center justify-between h-full">
          <div className="w-full max-w-5xl flex justify-between items-start">
            {/* Main Container - Shrunk and better positioned */}
            <div className="relative w-[75%] h-[210px] bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl flex items-center px-6 border-2 border-indigo-200 shadow-md">
              {/* Guiding Values Overlay Text with Animations */}
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.25, y: 0 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
                  className="transform -rotate-12 text-indigo-600 font-medium text-base absolute top-1/4 left-1/4"
                >
                  Equality
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.25, y: 0 }}
                  transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
                  className="transform rotate-6 text-indigo-600 font-medium text-base absolute top-1/3 right-1/3"
                >
                  Respect
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.25, y: 0 }}
                  transition={{ duration: 1, delay: 3, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
                  className="transform -rotate-3 text-indigo-600 font-medium text-base absolute bottom-1/2 right-1/4"
                >
                  Togetherness
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.25, y: 0 }}
                  transition={{ duration: 1, delay: 4.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
                  className="transform rotate-12 text-indigo-600 font-medium text-base absolute bottom-1/3 left-1/3"
                >
                  Social Acceptance
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.25, y: 0 }}
                  transition={{ duration: 1, delay: 6, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
                  className="transform -rotate-6 text-indigo-600 font-medium text-base absolute bottom-1/4 right-1/4"
                >
                  Non-Judgment
                </motion.div>
              </div>
              
              {/* Left Section: Social Maestro */}
              <div className="relative flex-shrink-0 w-1/3 flex justify-center mr-3">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-white shadow-md border border-indigo-300"
                >
                  <div className="text-center">
                    <div className="font-bold text-base">Social Maestro</div>
                    <div className="text-xs">(SM)</div>
                  </div>
                </motion.div>
                
                {/* Script Panel */}
                <motion.div 
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 6 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -top-6 -right-2 bg-white rounded-lg p-2 shadow-sm border border-gray-200"
                >
                  <div className="text-[10px] font-medium text-gray-700">Script Panel</div>
                  <div className="w-8 h-5 mt-1 bg-gray-100 rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              </div>
              
              {/* Connection Line with Animation */}
              <div className="flex-grow relative mx-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                  className="h-1.5 bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300 rounded-full"
                ></motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Right Section: User Group - Improved connections */}
              <div className="flex-shrink-0 w-1/3 flex justify-center ml-3">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative bg-blue-50 rounded-lg p-2 shadow-md max-w-[140px] border border-blue-100"
                >
                  <div className="text-center mb-1 font-medium text-gray-700 text-xs">User Group (8-10 Participants)</div>
                  <div className="grid grid-cols-3 gap-1 place-items-center">
                    {[...Array(9)].map((_, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="relative w-5 h-5 rounded-full flex items-center justify-center text-xs"
                        style={{ 
                          backgroundColor: [`#f8d8e9`, `#d1e5f8`, `#dcf8d8`, `#f8ebd8`, `#e8d8f8`, `#d8f8f5`, `#f8d8d8`, `#e5f8d8`, `#d8e9f8`][index],
                        }}
                      >
                        {index + 1}
                        
                        {/* Horizontal connections */}
                        {index % 3 < 2 && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "80%" }}
                            transition={{ duration: 0.3, delay: 1.5 + index * 0.05 }}
                            className="absolute top-1/2 right-0 h-0.5 bg-blue-200 transform translate-x-[80%]"
                          ></motion.div>
                        )}
                        
                        {/* Vertical connections */}
                        {index < 6 && (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "80%" }}
                            transition={{ duration: 0.3, delay: 1.8 + index * 0.05 }}
                            className="absolute left-1/2 bottom-0 w-0.5 bg-blue-200 transform translate-y-[80%]"
                          ></motion.div>
                        )}
                        
                        {/* Diagonal connections for center node */}
                        {index === 4 && (
                          <>
                            <motion.div 
                              initial={{ width: 0, height: 0 }}
                              animate={{ width: "70%", height: "70%" }}
                              transition={{ duration: 0.4, delay: 2.2 }}
                              className="absolute bottom-0 right-0 bg-blue-200 transform rotate-45 translate-x-[50%] translate-y-[50%]"
                            ></motion.div>
                            <motion.div 
                              initial={{ width: 0, height: 0 }}
                              animate={{ width: "70%", height: "70%" }}
                              transition={{ duration: 0.4, delay: 2.2 }}
                              className="absolute bottom-0 left-0 bg-blue-200 transform -rotate-45 translate-x-[-50%] translate-y-[50%]"
                            ></motion.div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Emotional Outcome Box - Repositioned to the right and made smaller */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-[20%] max-w-[150px] bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-2 shadow-sm border border-green-300 self-start"
            >
              <h3 className="text-xs font-semibold text-green-700 mb-1 text-center">Emotional Outcomes</h3>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <span className="text-sm mr-1">😊</span>
                  <span className="text-[10px] text-gray-700">Happiness</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-1">🔥</span>
                  <span className="text-[10px] text-gray-700">Feeling of Warmth</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-1">🧠</span>
                  <span className="text-[10px] text-gray-700">Sense of Belonging</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-1">🤝</span>
                  <span className="text-[10px] text-gray-700">Social Acceptance</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-1">🌿</span>
                  <span className="text-[10px] text-gray-700">Improved Emotional State</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* AI Tech Bar - Enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="w-full max-w-5xl h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-around px-4 text-white my-4 shadow-md"
          >
            <div className="text-center text-xs font-semibold">AI Tech</div>
            <div className="h-6 border-r border-blue-300"></div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736L4 13.42V12a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">AI Matching Engine</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
              <span className="text-xs">Live Facilitation Feedback</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Behavior Optimization AI</span>
            </div>
          </motion.div>
          
          {/* Bottom Benefit Cards */}
          <div className="w-full max-w-5xl flex items-start justify-around">
            {/* AI Benefits Visualization */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col items-center max-w-xs"
            >
              <h3 className="text-sm font-semibold text-indigo-700 mb-1 text-center">AI-Powered Benefits</h3>
              <div className="bg-white rounded-lg p-2 shadow-sm border border-indigo-100 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Higher Engagement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Perfect Matching</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Emotional Analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Optimized Scripts</span>
                </div>
              </div>
            </motion.div>
            
            {/* SM Impact Visualization */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex flex-col items-center max-w-xs"
            >
              <h3 className="text-sm font-semibold text-indigo-700 mb-1 text-center">Social Maestro Impact</h3>
              <div className="bg-white rounded-lg p-2 shadow-sm border border-indigo-100 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Guided Interaction</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Seamless Flow</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Expert Facilitation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">Real-time Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SecondSlide = () => {
  // Calculate quarterly revenue (not cumulative)
  const revenueQ1 = 0;
  const revenueQ2 = 24; // 24 lakhs
  const revenueQ3 = 136; // 1.6 Cr - 24 lakhs = 136 lakhs
  const revenueQ4 = 700; // 8.6 Cr - 1.6 Cr = 7 Cr = 700 lakhs

  // Define data for charts
  const userGrowthData = [
    { quarter: 'Q1', users: 500, sm: 50 },
    { quarter: 'Q2', users: 5000, sm: 200 },
    { quarter: 'Q3', users: 30000, sm: 1000 },
    { quarter: 'Q4', users: 150000, sm: 5000 }
  ];

  const subscriptionData = [
    { quarter: 'Q1', overseas: 0, corporate: 0, premium: 0, total: 0 },
    { quarter: 'Q2', overseas: 200, corporate: 0, premium: 0, total: 200 },
    { quarter: 'Q3', overseas: 1000, corporate: 2000, premium: 0, total: 3000 },
    { quarter: 'Q4', overseas: 5000, corporate: 10000, premium: 1000, total: 16000 }
  ];

  const revenueData = [
    { quarter: 'Q1', value: revenueQ1, display: '0' },
    { quarter: 'Q2', value: revenueQ2, display: '24L' },
    { quarter: 'Q3', value: revenueQ3, display: '1.4Cr' },
    { quarter: 'Q4', value: revenueQ4, display: '7.0Cr' }
  ];

  const arpuData = [
    { name: 'Overseas', value: 12000, color: '#10B981' },
    { name: 'Corporate', value: 6000, color: '#F59E0B' },
    { name: 'Premium', value: 2000, color: '#8B5CF6' }
  ];

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full h-full relative">
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 rounded-2xl border-2 border-indigo-100 p-4">
        {/* Market Size Box */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 text-sm">Impact millions of users with no age or geographical limitations</p>
          
          <div className="bg-white rounded-lg py-1 px-3 shadow-md flex items-center space-x-3 border border-indigo-100">
            <div className="text-center">
              <div className="text-xs text-gray-500">Market Size</div>
              <div className="text-base font-bold text-indigo-700">1.2 Billion</div>
            </div>
            
            <div className="h-8 border-r border-gray-200"></div>
            
            <div className="text-center">
              <div className="text-xs text-gray-500">Annual Growth</div>
              <div className="flex items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">16.8%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main grid layout - more compact */}
        <div className="flex-1 grid grid-cols-12 gap-2 h-[520px]">
          {/* Left column - User growth + Paid subscriptions */}
          <div className="col-span-7 grid grid-rows-2 gap-2">
            {/* Users Projected Growth Chart */}
            <div className="bg-white rounded-lg p-2 shadow-md">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-sm text-gray-700">Users Projected Growth</h3>
                <span className="text-xs bg-green-100 text-green-800 py-0.5 px-1 rounded-full">+3000% in 12 months</span>
              </div>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={userGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="quarter" />
                    <YAxis 
                      tickFormatter={numberToStringFormatter}
                      domain={[0, 160000]}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [formatNumber(value), name === "users" ? "Community Users" : "Social Maestros"]} 
                      labelFormatter={(label: string) => `Quarter: ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="users" 
                      name="Community Users" 
                      fill="#3B82F6" 
                      barSize={35}
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList dataKey="users" position="top" fontSize={11} formatter={(value: number) => formatNumber(value)} />
                    </Bar>
                    <Bar 
                      dataKey="sm" 
                      name="Social Maestros" 
                      fill="#4F46E5" 
                      barSize={15}
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList dataKey="sm" position="top" fontSize={11} formatter={(value: number) => formatNumber(value)} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Paid Subscriptions Chart */}
            <div className="bg-white rounded-lg p-2 shadow-md">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-sm text-gray-700">Paid Subscriptions</h3>
                <span className="text-xs bg-purple-100 text-purple-800 py-0.5 px-1 rounded-full">Premium Launch in Q4</span>
              </div>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={subscriptionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="quarter" />
                    <YAxis 
                      tickFormatter={numberToStringFormatter}
                      domain={[0, 16000]}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatNumber(value), "Subscribers"]}
                      labelFormatter={(label: string) => `Quarter: ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="overseas" 
                      name="Overseas" 
                      stackId="a" 
                      fill="#10B981" 
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList dataKey="overseas" position="inside" fill="#fff" fontSize={11} formatter={(value: number) => value > 0 ? formatNumber(value) : ''} />
                    </Bar>
                    <Bar 
                      dataKey="corporate" 
                      name="Corporate" 
                      stackId="a" 
                      fill="#F59E0B" 
                      radius={[0, 0, 0, 0]}
                    >
                      <LabelList dataKey="corporate" position="inside" fill="#fff" fontSize={11} formatter={(value: number) => value > 0 ? formatNumber(value) : ''} />
                    </Bar>
                    <Bar 
                      dataKey="premium" 
                      name="Premium" 
                      stackId="a" 
                      fill="#8B5CF6" 
                      radius={[0, 0, 0, 0]}
                    >
                      <LabelList dataKey="premium" position="inside" fill="#fff" fontSize={11} formatter={(value: number) => value > 0 ? formatNumber(value) : ''} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Right column - Financial metrics */}
          <div className="col-span-5 flex flex-col gap-2">
            {/* ARPU Card */}
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h3 className="font-bold text-sm text-gray-700 mb-1">ARPU by Segment</h3>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={arpuData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis type="number" domain={[0, 15000]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value: number) => [`₹${formatNumber(value)}`, 'ARPU']} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {arpuData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList dataKey="value" position="right" formatter={(value: number) => `₹${formatNumber(value)}`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Revenue Card */}
            <div className="bg-white rounded-lg p-2 shadow-md flex-1">
              <h3 className="font-bold text-sm text-gray-700 mb-1">Quarterly Revenue</h3>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="quarter" />
                    <YAxis 
                      domain={[0, 800]}
                      tickFormatter={(value: number) => value >= 100 ? `${value/100}Cr` : `${value}L`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [
                        `${value === 0 ? '0' : value < 100 ? `₹${value}L` : `₹${value/100}Cr`}`,
                        'Revenue'
                      ]}
                      labelFormatter={(label: string) => `Quarter: ${label}`}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#4F46E5" 
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList dataKey="display" position="top" fontSize={11} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-center text-gray-500 mt-0">
                Quarterly Revenue Growth (not cumulative)
              </div>
            </div>
            
            {/* Customer Metrics & Breakeven Card - Combined */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <h3 className="font-bold text-sm text-gray-700 mb-1">Customer Metrics</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">LTV (Corporate)</span>
                    <span className="text-sm font-bold text-gray-800">₹30,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">LTV (Premium)</span>
                    <span className="text-sm font-bold text-gray-800">₹8,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">Renewal Rate</span>
                    <span className="text-sm font-bold text-green-600">82%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-2 shadow-md flex flex-col justify-center">
                <h3 className="font-bold text-sm text-gray-700 mb-0">Cashflow Breakeven</h3>
                <div className="flex items-center justify-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-indigo-600">12</span>
                      <span className="text-xs text-gray-600 ml-1">months</span>
                    </div>
                    <span className="text-xs text-gray-500">To positive cash flow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimingSlide = () => {
  return (
    <div className="w-full h-full relative">
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 rounded-2xl border-2 border-indigo-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-indigo-800">Why Now? The Perfect Timing</h2>
          
          <div className="bg-white rounded-lg py-1 px-2 shadow-md flex items-center space-x-2 border border-indigo-100">
            <div className="bg-indigo-100 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm font-bold text-indigo-700">Market Inflection Point</div>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-12 gap-2 h-[520px]">
          {/* AI & Emotions Paradox */}
          <div className="col-span-6 bg-white rounded-lg p-2 shadow-md">
            <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
              <span className="bg-purple-100 text-purple-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">1</span>
              AI Advancement Increases Value of Human Emotion
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-[10px] text-indigo-700 font-medium">AI & Automation</div>
                </div>
                <div className="mt-2">
                  <p className="text-[9px] text-gray-600">As AI replaces routine tasks, emotional intelligence becomes the key differentiator for humans</p>
                </div>
                <div className="mt-1 flex items-center justify-end">
                  <div className="text-[9px] text-indigo-600 font-semibold">2023 ChatGPT Users: 180M+</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium">Emotion AI Growth</div>
                </div>
                <div className="mt-2">
                  <p className="text-[9px] text-gray-600">Emotion AI market growing at 15-20% annually, showing the growing importance of emotional understanding</p>
                </div>
                <div className="mt-1 flex items-center justify-end">
                  <div className="text-[9px] text-amber-600 font-semibold">Market Size: $43B by 2027</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div className="text-[10px] text-blue-700 font-medium">LinkedIn Trends</div>
                </div>
                <div className="mt-2">
                  <p className="text-[9px] text-gray-600">70% increase in LinkedIn posts mentioning "emotional intelligence" in professional settings</p>
                </div>
                <div className="mt-1 flex items-center justify-end">
                  <div className="text-[9px] text-blue-600 font-semibold">Key workplace skill in 2023</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <div className="text-[10px] text-green-700 font-medium">EQ Literature Boom</div>
                </div>
                <div className="mt-2">
                  <p className="text-[9px] text-gray-600">Multiple bestsellers on emotional intelligence dominating business book sales</p>
                </div>
                <div className="mt-1 flex items-center justify-end">
                  <div className="text-[9px] text-green-600 font-semibold">5 NYT bestsellers in 2022-23</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Corporate Focus & India's Needs */}
          <div className="col-span-6 flex flex-col gap-2">
            <div className="bg-white rounded-lg p-2 shadow-md flex-1">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-blue-100 text-blue-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">2</span>
                Corporate Leadership Focusing on Emotional Intelligence
              </h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-base font-bold text-blue-700">89%</div>
                  <p className="text-[9px] text-gray-600 mt-1">Of executives believe EQ is critical for leadership</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-base font-bold text-blue-700">42%</div>
                  <p className="text-[9px] text-gray-600 mt-1">Higher productivity in emotionally intelligent teams</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-base font-bold text-blue-700">58%</div>
                  <p className="text-[9px] text-gray-600 mt-1">Of job performance attributed to EQ skills</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-[9px] text-gray-700 italic px-2 py-1 bg-gray-50 rounded-lg">
                  "We're seeing a fundamental shift where corporations are investing heavily in emotional intelligence training. The timing for a platform like E-Socialize couldn't be better."
                  <div className="mt-1 text-right text-gray-500">— Harvard Business Review, 2023</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-2 shadow-md flex-1">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-red-100 text-red-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">3</span>
                India's Social & Emotional Crisis Among Youth
              </h3>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { year: '2018', value: 22 },
                          { year: '2019', value: 28 },
                          { year: '2020', value: 42 },
                          { year: '2021', value: 53 },
                          { year: '2022', value: 62 },
                          { year: '2023', value: 68 }
                        ]}
                        margin={{ top: 15, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 8 }} />
                        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 8 }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Reported Social Issues']} />
                        <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center text-[8px] text-gray-500 mt-1">
                    Rising social issues among Indian youth
                  </div>
                </div>
                <div className="w-1/2">
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <div className="bg-red-100 p-0.5 rounded-full mr-1 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-700 font-medium">68% of Indian teens report feelings of isolation</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 p-0.5 rounded-full mr-1 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-700 font-medium">Social media use linked to 42% increase in anxiety</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 p-0.5 rounded-full mr-1 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-700 font-medium">83% increase in mental health help-seeking behavior</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-100 p-0.5 rounded-full mr-1 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-700 font-medium">College dropout rates up 27% due to emotional issues</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechnologySlide = () => {
  return (
    <div className="w-full h-full relative">
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 rounded-2xl border-2 border-indigo-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-indigo-800">Technology & UI Architecture</h2>
          
          <div className="bg-white rounded-lg py-1 px-2 shadow-md flex items-center space-x-2 border border-indigo-100">
            <div className="bg-blue-100 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm font-bold text-blue-700">Next.js + React</div>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-12 gap-2 h-[520px]">
          {/* Frontend Architecture */}
          <div className="col-span-6 grid grid-rows-2 gap-2">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-blue-100 text-blue-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">1</span>
                Frontend Architecture
              </h3>
              <div className="flex items-center justify-center h-[135px]">
                <div className="grid grid-cols-3 gap-2 w-full">
                  {/* Presentation Layer */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="text-[9px] font-medium text-gray-500">Presentation</div>
                    <div className="w-full bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-200 rounded-md p-1.5 flex flex-col items-center">
                      <div className="text-[10px] font-medium text-blue-700">React Components</div>
                      <div className="mt-1 grid grid-cols-2 gap-0.5 w-full">
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Pages</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">UI Kit</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Layout</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Charts</div>
                      </div>
                      <div className="text-[9px] mt-1 font-medium text-indigo-700">TailwindCSS</div>
                    </div>
                  </div>
                  
                  {/* Logic Layer */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="text-[9px] font-medium text-gray-500">Logic</div>
                    <div className="w-full bg-gradient-to-b from-indigo-50 to-purple-50 border border-indigo-200 rounded-md p-1.5 flex flex-col items-center">
                      <div className="text-[10px] font-medium text-indigo-700">Next.js</div>
                      <div className="mt-1 grid grid-cols-2 gap-0.5 w-full">
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Hooks</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Context</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">APIs</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Routing</div>
                      </div>
                      <div className="text-[9px] mt-1 font-medium text-purple-700">TypeScript</div>
                    </div>
                  </div>
                  
                  {/* Data Layer */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="text-[9px] font-medium text-gray-500">Data</div>
                    <div className="w-full bg-gradient-to-b from-purple-50 to-pink-50 border border-purple-200 rounded-md p-1.5 flex flex-col items-center">
                      <div className="text-[10px] font-medium text-purple-700">SWR / React Query</div>
                      <div className="mt-1 grid grid-cols-2 gap-0.5 w-full">
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Cache</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Fetch</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">States</div>
                        <div className="bg-white px-1 py-0.5 rounded text-[8px] text-center text-gray-700">Sync</div>
                      </div>
                      <div className="text-[9px] mt-1 font-medium text-pink-700">Real-time</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1 text-center">
                <div className="inline-block bg-blue-50 rounded-full px-2 py-0.5 text-[9px] font-medium text-blue-700 border border-blue-100">
                  100% TypeScript | Component-based | Mobile-first Responsive
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-red-100 text-red-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">2</span>
                Authentication & Security
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-1.5 h-[110px]">
                  <div className="flex items-center">
                    <div className="bg-gray-200 p-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-[10px] font-medium text-gray-700 ml-1">Auth Flow</div>
                  </div>
                  
                  <div className="mt-1 space-y-1 text-[9px]">
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">Firebase Authentication</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">JWT Tokens</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">OAuth 2.0 Social Login</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">Refresh Token Rotation</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-1.5 h-[110px]">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-[10px] font-medium text-red-700 ml-1">Security</div>
                  </div>
                  
                  <div className="mt-1 space-y-1 text-[9px]">
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">End-to-end encryption</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">GDPR Compliance</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">XSS & CSRF Protection</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
                      <div className="ml-1 text-gray-700">Regular Security Audits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Backend Architecture & Infrastructure */}
          <div className="col-span-6 grid grid-rows-2 gap-2">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-green-100 text-green-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">3</span>
                Backend Architecture
              </h3>
              
              <div className="h-[135px] flex items-center justify-center">
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <div className="text-[10px] font-medium text-gray-700">API Gateway</div>
                    <div className="text-[10px] font-medium text-gray-700">Microservices</div>
                    <div className="text-[10px] font-medium text-gray-700">Databases</div>
                  </div>
                  
                  <div className="grid grid-cols-11 gap-1">
                    {/* API Gateway */}
                    <div className="col-span-3 bg-green-50 border border-green-200 rounded-lg p-1 flex flex-col items-center">
                      <div className="bg-white rounded-md w-full text-center p-0.5 mb-1">
                        <span className="text-[9px] font-medium text-green-700">Next.js API Routes</span>
                      </div>
                      <div className="text-[8px] text-gray-700 text-center">Authentication</div>
                      <div className="text-[8px] text-gray-700 text-center">Rate Limiting</div>
                      <div className="text-[8px] text-gray-700 text-center">Request Validation</div>
                      <div className="text-[8px] text-gray-700 text-center mt-1">
                        <span className="bg-green-100 px-1 py-0.5 rounded text-green-700">REST</span>
                        {" "}
                        <span className="bg-purple-100 px-1 py-0.5 rounded text-purple-700">GraphQL</span>
                      </div>
                    </div>
                    
                    {/* Connection Lines */}
                    <div className="col-span-1 flex items-center justify-center">
                      <div className="border-t border-dashed border-gray-300 w-full"></div>
                    </div>
                    
                    {/* Microservices */}
                    <div className="col-span-3 space-y-1">
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-1 text-center">
                        <div className="text-[9px] font-medium text-blue-700">User Service</div>
                        <div className="text-[8px] text-gray-700">Node.js / Express</div>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-200 rounded-md p-1 text-center">
                        <div className="text-[9px] font-medium text-indigo-700">Matching Engine</div>
                        <div className="text-[8px] text-gray-700">Python / FastAPI</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-md p-1 text-center">
                        <div className="text-[9px] font-medium text-purple-700">Analytics Service</div>
                        <div className="text-[8px] text-gray-700">Node.js / Express</div>
                      </div>
                    </div>
                    
                    {/* Connection Lines */}
                    <div className="col-span-1 flex items-center justify-center">
                      <div className="border-t border-dashed border-gray-300 w-full"></div>
                    </div>
                    
                    {/* Databases */}
                    <div className="col-span-3 space-y-1">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-1 text-center">
                        <div className="text-[9px] font-medium text-yellow-700">Firebase Firestore</div>
                        <div className="text-[8px] text-gray-700">User Data / Real-time</div>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-md p-1 text-center">
                        <div className="text-[9px] font-medium text-orange-700">PostgreSQL</div>
                        <div className="text-[8px] text-gray-700">Relational Data</div>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-md p-1 text-center">
                        <div className="text-[9px] font-medium text-red-700">Redis</div>
                        <div className="text-[8px] text-gray-700">Caching / Pub-Sub</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-amber-100 text-amber-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">4</span>
                Infrastructure & Deployment
              </h3>
              
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-1.5">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-0.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                      </div>
                      <div className="text-[10px] font-semibold text-gray-700 ml-1">CI/CD Pipeline</div>
                    </div>
                    <div className="text-[9px] text-blue-700 font-medium">Automated Deployments</div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-0.5 text-center">
                    <div className="bg-white py-0.5 rounded text-[8px] text-gray-700">GitHub</div>
                    <div className="bg-white py-0.5 rounded text-[8px] text-gray-700 relative">
                      Actions
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5 w-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-white py-0.5 rounded text-[8px] text-gray-700 relative">
                      Tests
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5 w-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-white py-0.5 rounded text-[8px] text-gray-700 relative">
                      Build
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5 w-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-white py-0.5 rounded text-[8px] text-gray-700">Deploy</div>
                  </div>
                  
                  <div className="mt-1.5 flex justify-between items-center">
                    <div className="bg-blue-50 py-0.5 px-1 rounded text-[8px] text-blue-700">Vercel (Frontend)</div>
                    <div className="bg-green-50 py-0.5 px-1 rounded text-[8px] text-green-700">Firebase (Backend)</div>
                  </div>
                </div>
                
                <div className="col-span-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-1.5">
                  <div className="flex items-center mb-1">
                    <div className="bg-indigo-100 p-0.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-[10px] font-semibold text-indigo-700 ml-1">Performance</div>
                  </div>
                  
                  <div className="space-y-0.5 text-[8px]">
                    <div className="flex justify-between">
                      <div className="text-gray-600">Lighthouse Score</div>
                      <div className="text-indigo-700 font-medium">90+</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">FCP</div>
                      <div className="text-indigo-700 font-medium">&lt;1.2s</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">TTI</div>
                      <div className="text-indigo-700 font-medium">&lt;3.8s</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-600">CDN</div>
                      <div className="text-indigo-700 font-medium">Cloudflare</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompetitiveSlide = () => {
  return (
    <div className="w-full h-full relative">
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 rounded-2xl border-2 border-indigo-100 p-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-indigo-800">Competitive Landscape</h2>
          
          <div className="bg-white rounded-lg py-1 px-2 shadow-md flex items-center space-x-2 border border-indigo-100">
            <div className="bg-red-100 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm font-bold text-red-700">Market Analysis</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 h-[500px] overflow-hidden">
          {/* Competition Map */}
          <div className="bg-white rounded-lg p-2 shadow-md">
            <h3 className="font-bold text-xs text-gray-700 mb-1">E-Socialize Competitive Positioning</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="h-[185px] relative bg-gray-50 rounded-lg p-2 border border-gray-200">
                <div className="text-[10px] font-medium text-gray-500 absolute top-2 left-2">Emotional Intelligence Focus</div>
                <div className="text-[10px] font-medium text-gray-500 absolute bottom-2 left-2">Traditional Social Focus</div>
                <div className="text-[10px] font-medium text-gray-500 absolute top-[50%] -translate-y-[50%] -rotate-90 left-0">Consumer Market</div>
                <div className="text-[10px] font-medium text-gray-500 absolute top-[50%] -translate-y-[50%] rotate-90 right-0">Enterprise Market</div>
                
                {/* Coordinate System */}
                <div className="absolute left-[50%] top-0 bottom-0 border-l border-dashed border-gray-300"></div>
                <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-gray-300"></div>
                
                {/* E-Socialize */}
                <div className="absolute top-[25%] right-[25%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg border-2 border-indigo-400 flex flex-col items-center justify-center shadow-md">
                    <div className="text-[10px] font-bold text-indigo-700">E-Socialize</div>
                    <div className="text-[8px] font-medium text-indigo-600 mt-0.5">2023</div>
                  </div>
                </div>
                
                {/* Facebook */}
                <div className="absolute top-[70%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-300 flex flex-col items-center justify-center">
                    <div className="text-[9px] font-bold text-blue-700">Facebook</div>
                    <div className="text-[8px] font-medium text-blue-600 mt-0.5">2004</div>
                  </div>
                </div>
                
                {/* LinkedIn */}
                <div className="absolute top-[55%] right-[25%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-300 flex flex-col items-center justify-center">
                    <div className="text-[9px] font-bold text-blue-700">LinkedIn</div>
                    <div className="text-[8px] font-medium text-blue-600 mt-0.5">2003</div>
                  </div>
                </div>
                
                {/* BetterUp */}
                <div className="absolute top-[30%] right-[35%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-lg border border-green-300 flex flex-col items-center justify-center">
                    <div className="text-[9px] font-bold text-green-700">BetterUp</div>
                    <div className="text-[8px] font-medium text-green-600 mt-0.5">2013</div>
                  </div>
                </div>
                
                {/* Headspace */}
                <div className="absolute top-[35%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg border border-orange-300 flex flex-col items-center justify-center">
                    <div className="text-[9px] font-bold text-orange-700">Headspace</div>
                    <div className="text-[8px] font-medium text-orange-600 mt-0.5">2010</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg p-2 border border-indigo-100">
                  <h4 className="text-xs font-semibold text-indigo-700 mb-1">Our Unique Value</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[9px] text-gray-700">AI-driven emotional intelligence platform</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[9px] text-gray-700">Balanced consumer/enterprise offering</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[9px] text-gray-700">First-mover in social emotional wellness</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[9px] text-gray-700">Human-technology synergy</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-lg p-2 border border-red-100">
                  <h4 className="text-xs font-semibold text-red-700 mb-1">Competitive Gaps</h4>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-white/80 rounded border border-red-50 p-1">
                      <div className="text-[9px] font-medium text-gray-700 mb-0.5">LinkedIn</div>
                      <p className="text-[8px] text-gray-600">Lacks emotional connection tools</p>
                    </div>
                    <div className="bg-white/80 rounded border border-red-50 p-1">
                      <div className="text-[9px] font-medium text-gray-700 mb-0.5">Facebook</div>
                      <p className="text-[8px] text-gray-600">Superficial interactions only</p>
                    </div>
                    <div className="bg-white/80 rounded border border-red-50 p-1">
                      <div className="text-[9px] font-medium text-gray-700 mb-0.5">BetterUp</div>
                      <p className="text-[8px] text-gray-600">Limited to coaching, high-cost</p>
                    </div>
                    <div className="bg-white/80 rounded border border-red-50 p-1">
                      <div className="text-[9px] font-medium text-gray-700 mb-0.5">Headspace</div>
                      <p className="text-[8px] text-gray-600">Individual focus only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparative Analysis */}
          <div className="bg-white rounded-lg p-2 shadow-md">
            <h3 className="font-bold text-xs text-gray-700 mb-1">Competitive Feature Comparison</h3>
            <div className="overflow-hidden h-[240px]">
              <div className="w-full">
                <table className="w-full text-[8px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-1 text-left font-medium text-gray-600 border-b border-gray-200 w-[25%]">Features</th>
                      <th className="p-1 text-center font-medium text-indigo-600 border-b border-gray-200 w-[18.75%]">
                        <div className="flex justify-center items-center">
                          <div className="w-3 h-3 bg-indigo-100 rounded-full mr-1 flex items-center justify-center">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          </div>
                          E-Socialize
                        </div>
                      </th>
                      <th className="p-1 text-center font-medium text-blue-600 border-b border-gray-200 w-[18.75%]">
                        <div className="flex justify-center items-center">
                          <div className="w-3 h-3 bg-blue-100 rounded-full mr-1 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          LinkedIn
                        </div>
                      </th>
                      <th className="p-1 text-center font-medium text-blue-600 border-b border-gray-200 w-[18.75%]">
                        <div className="flex justify-center items-center">
                          <div className="w-3 h-3 bg-blue-100 rounded-full mr-1 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          Facebook
                        </div>
                      </th>
                      <th className="p-1 text-center font-medium text-green-600 border-b border-gray-200 w-[18.75%]">
                        <div className="flex justify-center items-center">
                          <div className="w-3 h-3 bg-green-100 rounded-full mr-1 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          BetterUp
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">AI-Powered Matching</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Emotional Intelligence Focus</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Corporate Wellness Integration</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Group Social Dynamics</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Real-time Emotional Analytics</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Guided Social Facilitation</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Professional Development</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Human-led Facilitation</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-1 font-medium text-gray-700">Enterprise Adoption Metrics</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                      <td className="p-1 text-center text-red-500">✗</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-medium text-gray-700">Consumer Accessibility</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-green-600">✓</td>
                      <td className="p-1 text-center text-amber-500">Limited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketSlide = () => {
  return (
    <div className="w-full h-full relative">
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 rounded-2xl border-2 border-indigo-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-indigo-800">Market Size & Opportunity</h2>
          
          <div className="bg-white rounded-lg py-1 px-2 shadow-md flex items-center space-x-2 border border-indigo-100">
            <div className="bg-green-100 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm font-bold text-indigo-700">TAM: 1.4B Users</div>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-12 gap-2 h-[520px]">
          {/* India Market */}
          <div className="col-span-6 bg-white rounded-lg p-2 shadow-md">
            <h3 className="font-bold text-xs text-gray-700 mb-2 flex items-center">
              <span className="bg-orange-100 text-orange-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">1</span>
              India Market
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs font-medium text-orange-700">Population by Age</div>
                  <div className="bg-white rounded-full px-1 py-0.5 text-[10px] font-medium text-orange-600 shadow-sm">
                    1.4 Billion
                  </div>
                </div>
                <div className="h-[120px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">642M</div>
                    <div className="text-xs text-gray-600">Prime demographic: 15-44 age group</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs font-medium text-orange-700">Income Segments</div>
                  <div className="bg-white rounded-full px-1 py-0.5 text-[10px] font-medium text-orange-600 shadow-sm">
                    Target: 480M
                  </div>
                </div>
                <div className="h-[120px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">230M</div>
                    <div className="text-xs text-gray-600">Focus: Elite to Aspirer segments</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs font-medium text-orange-700">Key Market Drivers</div>
                  <div className="bg-white rounded-full px-1 py-0.5 text-[10px] font-medium text-orange-600 shadow-sm">
                    Rapid Growth Factors
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mt-0.5 mr-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-medium text-amber-700">Digital Acceleration</div>
                      <p className="text-[9px] text-gray-600">900M+ smartphone users with affordable data</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mt-0.5 mr-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-medium text-amber-700">Young Population</div>
                      <p className="text-[9px] text-gray-600">65% below 35 years, seeking social connections</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mt-0.5 mr-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-medium text-amber-700">Mental Health Focus</div>
                      <p className="text-[9px] text-gray-600">42% YoY growth in wellness app downloads</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mt-0.5 mr-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-medium text-amber-700">Corporate Wellness</div>
                      <p className="text-[9px] text-gray-600">₹15,000 Cr market growing at 20% annually</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* US Market & Corporate Opportunity */}
          <div className="col-span-6 flex flex-col gap-2">
            <div className="bg-white rounded-lg p-2 shadow-md flex-1">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-blue-100 text-blue-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">2</span>
                US Market
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-medium text-blue-700">Addressable Market</div>
                    <div className="bg-white rounded-full px-1 py-0.5 text-[10px] font-medium text-blue-600 shadow-sm">
                      330 Million
                    </div>
                  </div>
                  <div className="h-[90px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">139M</div>
                      <div className="text-[10px] text-gray-600">Target demographic: 18-49 age group</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-medium text-blue-700">Market Opportunity</div>
                    <div className="bg-white rounded-full px-1 py-0.5 text-[10px] font-medium text-blue-600 shadow-sm">
                      $18B by 2026
                    </div>
                  </div>
                  <div className="mt-1">
                    <div className="mb-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="text-[10px] text-gray-600">Mental Wellness</div>
                        <div className="text-[10px] font-medium text-blue-600">$7.9B</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="mb-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="text-[10px] text-gray-600">Social Connection Apps</div>
                        <div className="text-[10px] font-medium text-blue-600">$5.2B</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    <div className="mb-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="text-[10px] text-gray-600">Corporate Wellbeing</div>
                        <div className="text-[10px] font-medium text-blue-600">$4.5B</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="mb-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="text-[10px] text-gray-600">AI-Enhanced Social</div>
                        <div className="text-[10px] font-medium text-blue-600">$1.2B</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-[10px] text-gray-600 mt-1">
                    CAGR: 22.5% (2022-2026)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-2 shadow-md flex-1">
              <h3 className="font-bold text-xs text-gray-700 mb-1 flex items-center">
                <span className="bg-green-100 text-green-700 rounded-full w-4 h-4 inline-flex items-center justify-center mr-1">3</span>
                Corporate Sector Opportunity
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 flex flex-col items-center">
                  <div className="text-[10px] font-medium text-green-700 mb-1 text-center">Fortune 500</div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-green-100">
                    <div className="text-sm font-bold text-green-600">500</div>
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-[9px] text-gray-600">Target companies</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 flex flex-col items-center">
                  <div className="text-[10px] font-medium text-green-700 mb-1 text-center">Fortune 1000</div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-green-100">
                    <div className="text-sm font-bold text-green-600">1K</div>
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-[9px] text-gray-600">Expansion phase</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 flex flex-col items-center">
                  <div className="text-[10px] font-medium text-green-700 mb-1 text-center">Mid-Market</div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-green-100">
                    <div className="text-sm font-bold text-green-600">9K+</div>
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-[9px] text-gray-600">Long-term focus</div>
                  </div>
                </div>
                
                <div className="col-span-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-medium text-green-700">ROI Metrics</div>
                    <div className="bg-white rounded-full px-1 py-0.5 text-[10px] font-medium text-green-600 shadow-sm">
                      Customer Testimonials
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-start">
                      <div className="bg-emerald-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] text-gray-600">42% reduction in employee turnover</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-emerald-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] text-gray-600">28% increase in team productivity</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-emerald-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] text-gray-600">55% better employee wellness metrics</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-emerald-100 p-0.5 rounded-full mt-0.5 mr-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] text-gray-600">$3200 avg savings per employee annually</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SlideNav = ({ currentSlide, totalSlides, onChange }: { currentSlide: number, totalSlides: number, onChange: (slide: number) => void }) => {
  return (
    <div className="w-full flex justify-center gap-1 mt-2">
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button 
          key={i}
          onClick={() => onChange(i + 1)}
          className={`w-6 h-1.5 rounded-full ${currentSlide === i + 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}
        ></button>
      ))}
    </div>
  );
};

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalSlides = 6;

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <MainSlide />;
      case 2:
        return <SecondSlide />;
      case 3:
        return <MarketSlide />;
      case 4:
        return <TimingSlide />;
      case 5:
        return <TechnologySlide />;
      case 6:
        return <CompetitiveSlide />;
      default:
        return <MainSlide />;
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 sticky top-0 z-50">
        <button
          onClick={() => router.push('/')}
          className="bg-white/10 hover:bg-white/20 text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg font-medium backdrop-blur-lg border border-indigo-200 transition text-left"
        >
          ← Back to Home
        </button>
        <h1 className="text-2xl font-bold text-center text-indigo-800">E-Socialize Pitch Deck</h1>
        <div className="w-24"></div> {/* Empty div for flex spacing */}
      </div>
      
      <div 
        ref={containerRef}
        className={`relative flex-1 bg-white rounded-xl overflow-hidden shadow-xl transition-all mx-4 mb-4 ${isFullscreen ? 'p-0' : 'p-1'}`}
        style={{ height: '70vh' }}
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={toggleFullscreen}
            className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
          >
            {isFullscreen ? <ContractIcon /> : <ExpandIcon />}
          </button>
        </div>
        
        <div className="relative h-full overflow-hidden flex items-center justify-center">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20, scale: currentSlide === 1 ? 1 : 0.8 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: currentSlide === 1 ? 1 : 0.8 
            }}
            exit={{ opacity: 0, x: -20, scale: currentSlide === 1 ? 1 : 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`h-full w-full ${currentSlide === 1 ? 'p-6' : 'p-10'}`}
            style={{ transformOrigin: 'center' }}
          >
            <div className={`w-full h-full flex items-center justify-center ${currentSlide !== 1 ? 'px-4' : ''}`}>
              {renderSlide()}
            </div>
          </motion.div>
          
          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlide === 1}
              className={`p-2 rounded-full ${currentSlide === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-100'} transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <SlideNav currentSlide={currentSlide} totalSlides={totalSlides} onChange={setCurrentSlide} />
            
            <button
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides}
              className={`p-2 rounded-full ${currentSlide === totalSlides ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-100'} transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck; 