import React from 'react';

const ProblemSection: React.FC = () => {
  return (
    <section id="product" className="py-24 px-6 bg-bg-dark text-text-inverse">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              YOUR INFRASTRUCTURE KNOWS MORE<br />
              THAN YOUR DASHBOARD DOES.
            </h2>
            <div className="space-y-6 text-lg text-text-inverse-muted leading-relaxed">
              <p>
                Modern systems produce huge amounts of operational information. 
                But that information is fragmented.
              </p>
              <div className="grid grid-cols-2 gap-4 py-4">
                {[
                  { label: 'Metrics', desc: 'Tell one story' },
                  { label: 'Logs', desc: 'Tell another' },
                  { label: 'Traces', desc: 'Show another' },
                  { label: 'Network', desc: 'Reveals another' },
                ].map((item) => (
                  <div key={item.label} className="p-4 border border-neutral-700 rounded-sm">
                    <span className="block font-bold text-text-inverse">{item.label}</span>
                    <span className="text-sm opacity-60">{item.desc}</span>
                  </div>
                ))}
              </div>
              <p>
                Engineers are left connecting the dots manually. <br />
                <span className="text-accent-orange">NarangOS is designed to connect them.</span>
              </p>
            </div>
          </div>

          <div className="relative aspect-square flex items-center justify-center">
            {/* Visual: Fragmented signals converging */}
            <div className="relative w-full h-full max-w-md">
              {/* Convergence Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-orange/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-accent-orange rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-accent-orange rounded-full animate-ping" />
              </div>

              {/* Orbiting Signals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 w-full h-px bg-neutral-700 origin-left"
                  style={{ 
                    transform: `rotate(${deg}deg) translateX(0) translate(-50%, -50%)`,
                    width: '150px'
                  }}
                >
                  <div className="absolute right-0 -top-1 w-2 h-2 bg-neutral-500 rounded-full" />
                </div>
              ))}
              
              {/* Floating Labels */}
              <div className="absolute top-10 left-10 text-xs font-mono text-neutral-500">METRICS_STREAM</div>
              <div className="absolute top-20 right-10 text-xs font-mono text-neutral-500">LOG_EVENT_0x4F</div>
              <div className="absolute bottom-10 left-20 text-xs font-mono text-neutral-500">TCP_RETX_DETECTED</div>
              <div className="absolute bottom-20 right-20 text-xs font-mono text-neutral-500">K8S_POD_RESTART</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
