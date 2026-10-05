"use client";
import React, { useState } from 'react';

type DiagnosticStep = {
  id: string;
  label: string;
  description: string;
  status: 'idle' | 'running' | 'passed' | 'failed' | 'warning';
  evidence?: string;
};

type DiagnosticResult = {
  status: 'passed' | 'warning';
  evidence: string;
};

const GoDiagnostics: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [results, setResults] = useState<Record<string, DiagnosticResult>>({});

  const steps: DiagnosticStep[] = [
    { id: 'metrics', label: 'Request Metrics', description: 'Checking for latency spikes and error rates', status: 'idle' },
    { id: 'traces', label: 'Distributed Traces', description: 'Inspecting spans for downstream bottlenecks', status: 'idle' },
    { id: 'pprof-cpu', label: 'CPU Profile', description: 'Analyzing hot paths and runtime overhead', status: 'idle' },
    { id: 'pprof-heap', label: 'Heap Profile', description: 'Checking for memory leaks and allocation pressure', status: 'idle' },
    { id: 'goroutines', label: 'Goroutine Analysis', description: 'Detecting leaks or blocking operations', status: 'idle' },
    { id: 'execution', label: 'Execution Trace', description: 'Scheduler behavior and mutex contention', status: 'idle' },
  ];

  const runDiagnostic = async (idx: number) => {
    setActiveStep(idx);
    const step = steps[idx];
    
    await new Promise(r => setTimeout(r, 1500));
    
    const outcome = idx === 2 ? 'warning' : 'passed';
    const evidence = outcome === 'warning' 
      ? `Detected high mutex contention in sync.Map usage at internal/cache.go:42` 
      : `No significant anomalies detected in ${step.label}`;

    setResults(prev => ({ ...prev, [step.id]: { status: outcome, evidence } }));
    setActiveStep(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-bg-warm border border-neutral-200 rounded-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Application Diagnostics: Go Runtime</h2>
        <p className="text-neutral-500 text-sm">Analyze internal application behavior using pprof and execution tracing.</p>
      </div >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className={`p-4 border border-neutral-200 rounded-sm flex items-center justify-between transition-all ${
                results[step.id] ? 'bg-white' : 'bg-neutral-50'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold">{step.label}</span>
                <span className="text-xs text-neutral-400">{step.description}</span>
              </div >
              <div className="flex items-center gap-3">
                {results[step.id] && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    results[step.id].status === 'passed' ? 'bg-accent-green/10 text-accent-green' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {results[step.id].status.toUpperCase()}
                  </span>
                )}
                <button 
                  onClick={() => runDiagnostic(idx)}
                  disabled={activeStep === idx}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  {activeStep === idx ? '⏳' : '▶️'}
                </button>
              </div >
            </div >
          ))}
        </div >

        <div className="bg-bg-dark text-text-inverse p-6 rounded-sm font-mono text-xs min-h-[400px] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent-orange animate-pulse" />
          <h3 className="text-neutral-400 uppercase tracking-widest mb-4">Diagnostics Console</h3>
          <div className="space-y-4">
            {Object.entries(results).map(([id, res]) => (
              <div key={id} className="animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent-orange">&gt;</span>
                  <span className="font-bold">{id}</span>
                  <span className="text-neutral-500">... analyzed</span>
                </div >
                <div className={`pl-4 ${res.status === 'passed' ? 'text-neutral-400' : 'text-orange-400'}`}>
                  {res.evidence}
                </div >
              </div >
            ))}
            {Object.keys(results).length === 0 && (
              <div className="text-neutral-600 italic">Select a diagnostic tool to begin analysis...</div>
            )}
          </div >
        </div >
      </div >
    </div >
  );
};

export default GoDiagnostics;
