"use client";
import React, { useState, useEffect } from 'react';
import { useLocalBackend } from '@/lib/api/use-local-backend';

const AIInteractionSection: React.FC = () => {
  const { isAvailable, isPages } = useLocalBackend();
  const [query, setQuery] = useState("Why did checkout latency increase?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const analysisSteps = [
    "Analyzing packets...",
    "Correlating network behavior...",
    "Checking Kubernetes pod events...",
    "Reviewing recent deployments...",
    "Scanning metrics & traces..."
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setInterval(() => {
        setCurrentStep((s) => {
          if (s < analysisSteps.length - 1) return s + 1;
          setIsAnalyzing(false);
          setShowResult(true);
          return s;
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [analysisSteps.length, isAnalyzing]);

  const handleRun = () => {
    setShowResult(false);
    setIsAnalyzing(true);
    setCurrentStep(0);
  };

  return (
    <section className="py-24 px-6 bg-bg-warm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            ASK YOUR INFRASTRUCTURE.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Instead of hunting through dashboards, get evidence-backed answers derived directly from the data layer.
          </p>
        </div >

        <div className="max-w-3xl mx-auto bg-bg-dark rounded-sm shadow-2xl overflow-hidden border border-neutral-800">
          {/* Terminal Header */}
          <div className="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-700" />
              <div className="w-3 h-3 rounded-full bg-neutral-700" />
              <div className="w-3 h-3 rounded-full bg-neutral-700" />
            </div >
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">NarangOS Terminal v0.1.0-beta</span>
            <div className="w-8" />
          </div >

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm min-h-[400px] flex flex-col">
            <div className="flex gap-3 mb-6">
              <span className="text-accent-orange">&gt;</span>
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-text-inverse w-full"
              />
              <button 
                onClick={handleRun}
                disabled={!isAvailable}
                className="text-xs bg-neutral-800 text-neutral-300 px-3 py-1 rounded hover:bg-neutral-700 transition-colors disabled:opacity-50"
              >
                {isPages && !isAvailable ? 'Start Docker to enable' : 'Run'}
              </button>
            </div >

            {isAnalyzing && (
              <div className="space-y-2">
                {analysisSteps.slice(0, currentStep + 1).map((step, i) => (
                  <div key={i} className="flex gap-3 text-neutral-400">
                    <span className="text-neutral-600">[{new Date().toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                    <span>{step}</span>
                  </div >
                ))}
                <div className="flex gap-3 text-accent-orange animate-pulse">
                  <span>_</span>
                </div >
              </div >
            )}

            {showResult && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="p-4 bg-neutral-900 border-l-2 border-accent-orange text-text-inverse">
                  <p className="mb-4">
                    Checkout latency increased <span className="text-accent-orange font-bold">31%</span> beginning at 14:32.
                  </p>
                  <p className="text-sm text-neutral-400 mb-4">
                    Three correlated events occurred within the preceding 12 minutes:
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-300 mb-6">
                    <li>1. checkout-api v2.18 deployed</li>
                    <li>2. payment-service network policy changed</li>
                    <li>3. TCP retransmissions between checkout-api and payment-service increased significantly</li>
                  </ul>
                  <p className="font-semibold text-text-inverse">
                    The network policy change has the strongest correlation.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs font-bold px-2 py-1 bg-accent-orange/10 text-accent-orange rounded">Confidence: 87%</span>
                    <button className="text-xs text-accent-orange underline hover:text-white transition-colors">View evidence →</button>
                  </div >
                </div >
              </div >
            )}

            {!isAnalyzing && !showResult && (
              <div className="text-neutral-600 italic">
                Enter a query to analyze your infrastructure...
              </div >
            )}
          </div >
        </div >
      </div >
    </section>
  );
};

export default AIInteractionSection;
