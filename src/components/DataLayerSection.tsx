import React from 'react';

const DataLayerSection: React.FC = () => {
  const signals = [
    "PACKETS", "NETWORK", "PROCESSES", "LOGS", 
    "METRICS", "TRACES", "KUBERNETES", "CLOUD", 
    "DEPLOYMENTS", "IDENTITY"
  ];

  return (
    <section id="technology" className="py-24 px-6 bg-bg-warm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-16">
          The Intelligence Layer
        </h2>

        <div className="relative flex flex-col items-center gap-12">
          {/* Input Signals */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
            {signals.map((sig) => (
              <div 
                key={sig} 
                className="px-4 py-3 border border-neutral-200 text-xs font-mono text-center text-neutral-500 hover:border-accent-orange hover:text-accent-orange transition-colors cursor-default"
              >
                {sig}
              </div>
            ))}
          </div >

          {/* Down Arrow */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-neutral-300" />
            <div className="w-2 h-2 bg-neutral-300 rotate-45" />
          </div >

          {/* The Data Layer */}
          <div className="relative w-full max-w-md p-8 border-2 border-bg-dark bg-bg-dark text-text-inverse rounded-sm text-center group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bg-warm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-accent-orange transition-colors">
              Core Architecture
            </div >
            <h3 className="text-2xl font-bold tracking-tighter">NARANG DATA LAYER</h3>
            <p className="text-sm text-text-inverse-muted mt-2 font-mono">Contextual Signal Correlation Engine</p>
          </div >

          {/* Down Arrow */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-neutral-300" />
            <div className="w-2 h-2 bg-neutral-300 rotate-45" />
          </div >

          {/* Output Stages */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <div className="p-4 border border-neutral-200 text-center font-medium">CONTEXT</div>
            <div className="p-4 border border-neutral-200 text-center font-bold bg-neutral-100">AI REASONING</div>
            <div className="p-4 border border-neutral-200 text-center text-accent-orange font-bold">HUMAN</div>
          </div >
        </div >
      </div >
    </section>
  );
};

export default DataLayerSection;
