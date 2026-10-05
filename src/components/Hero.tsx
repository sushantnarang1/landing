import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-text-primary mb-8">
            UNDERSTAND<br />
            WHAT YOUR SYSTEM<br />
            IS ACTUALLY DOING.
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed mb-10">
            Infrastructure produces enormous amounts of data. 
            NarangOS is building the intelligence layer that connects it — 
            from packets and workloads to applications and cloud infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-accent-orange text-bg-warm px-8 py-4 rounded font-semibold text-lg hover:opacity-90 transition-all">
              Explore NarangOS
            </button>
            <button className="border border-neutral-300 text-text-primary px-8 py-4 rounded font-semibold text-lg hover:bg-neutral-100 transition-all">
              Join Early Access
            </button>
          </div>
        </div>
      </div>
      
      {/* Placeholder for the carefully designed product visual */}
      <div className="mt-20 relative w-full max-w-6xl mx-auto aspect-video bg-neutral-100 rounded-xl border border-neutral-200 shadow-2xl flex items-center justify-center group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 opacity-50" />
        <div className="relative z-10 text-neutral-400 font-mono text-sm">
          [ Product Visualization: Data Connectivity Layer ]
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-accent-orange animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
