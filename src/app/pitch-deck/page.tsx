"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// Define the slides in the presentation
const slides = [
  {
    id: 1,
    title: "The Vision",
    content: "Provide Social acceptance and improve quality of life",
    component: "VisionSlide"
  },
  // Additional slides would be added here
];

// Vision Slide Component
const VisionSlide = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Main content area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {/* Left side: Social Acceptance Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Provide Social acceptance <br/> and improve quality of life
          </h2>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4">
            <p className="text-white/90 text-lg">
              "One act of positivity sparks nine more—goodness amplifies."
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
            <p className="text-base text-white/80 font-semibold mb-2">Mathematical Representation:</p>
            <p className="text-xl">Pᵢ = α(M) × 9G</p>
            <p className="text-sm text-white/70 mt-2">
              Where: Pᵢ = Positivity experienced by participant i
              <br/>α(M) = Moderator-defined positivity amplification
              <br/>G = 1 unit of goodness given
              <br/>9G = Goodness received from 9 peers
            </p>
          </div>
        </div>
        
        {/* Right side: Wonderverse Visualization */}
        <div className="flex flex-col space-y-4">
          <div className="bg-[#1E1E3F]/60 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3">E-Socialize Wonderverse</h3>
            
            <div className="relative bg-[#1E1E3F]/80 rounded-lg p-4 mb-3">
              <h4 className="text-white text-center mb-2">Simulated Environment</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-white">Equality</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-white">Respect</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-white">Togetherness</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-white">Social Acceptance</span>
                </div>
              </div>
              <div className="mt-2 text-center bg-white/10 rounded-lg p-2">
                <span className="text-white">Non-Judgment</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#1E1E3F]/80 rounded-lg p-3">
                <h4 className="text-white text-sm font-semibold mb-2">Simulation Control</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs">Positivity</span>
                    <div className="w-8 h-4 bg-white/20 rounded-full relative">
                      <div className="absolute right-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs">Respect</span>
                    <div className="w-8 h-4 bg-white/20 rounded-full relative">
                      <div className="absolute right-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs">Engagement</span>
                    <div className="w-8 h-4 bg-white/20 rounded-full relative">
                      <div className="absolute right-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1E1E3F]/80 rounded-lg p-3">
                <h4 className="text-white text-sm font-semibold mb-2">Social Maestro</h4>
                <div className="bg-white/10 rounded-lg p-2 text-center mb-2">
                  <span className="text-white text-xs">Mediator</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-white text-xs">Scripts</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 bg-[#1E1E3F]/80 rounded-lg p-3">
              <h4 className="text-white text-sm font-semibold mb-2">Output</h4>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <span className="text-white text-xs">Positivity, Fulfillment, Connection, Joy</span>
              </div>
              <p className="text-white/70 text-xs text-center mt-1">Unlike real world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const router = useRouter();
  
  // Function to render the current slide component
  const renderSlideComponent = () => {
    const slide = slides.find(s => s.id === currentSlide);
    
    switch(slide?.component) {
      case "VisionSlide":
        return <VisionSlide />;
      default:
        return <div>Slide not found</div>;
    }
  };
  
  // Navigation functions
  const goToNextSlide = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#1a1a2e] pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-4">
          <Link 
            href="/"
            className="flex items-center text-white bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-all duration-300"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <div className="text-white text-sm">
            Slide {currentSlide} of {slides.length}
          </div>
        </div>
        
        {/* Main Presentation Area */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E3F]/30 backdrop-blur-xl rounded-xl border border-white/10 h-[calc(100vh-8rem)] overflow-hidden shadow-2xl"
        >
          {/* Slide Title */}
          <div className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] py-3 px-6 rounded-t-xl">
            <h1 className="text-2xl font-bold text-white">
              {slides.find(s => s.id === currentSlide)?.title || "The Vision"}
            </h1>
          </div>
          
          {/* Slide Content */}
          <div className="h-[calc(100%-3.5rem)]">
            {renderSlideComponent()}
          </div>
        </motion.div>
        
        {/* Navigation Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={goToPrevSlide}
            disabled={currentSlide === 1}
            className={`flex items-center text-white rounded-full px-4 py-2 transition-all duration-300 ${
              currentSlide === 1 
                ? 'bg-white/5 cursor-not-allowed' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Previous</span>
          </button>
          
          <button
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length}
            className={`flex items-center text-white rounded-full px-4 py-2 transition-all duration-300 ${
              currentSlide === slides.length 
                ? 'bg-white/5 cursor-not-allowed' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <span className="text-sm">Next</span>
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
} 