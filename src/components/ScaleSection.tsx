import React from 'react';

const ScaleSection: React.FC = () => {
  const scales = [
    {
      role: "Developer",
      scope: "1 cluster",
      desc: "Understand what's happening in a single environment without tool sprawl.",
      icon: "single"
    },
    {
      role: "Startup",
      scope: "Multiple services\nMultiple environments",
      desc: "Identify why production slowed down after a specific deployment.",
      icon: "small-group"
    },
    {
      role: "Company",
      scope: "Multiple clusters\nTeams\nCloud accounts",
      desc: "Standardize visibility across engineering organizations.",
      icon: "group"
    },
    {
      role: "Enterprise",
      scope: "Regions\nClouds\nOrganizations\nThousands of workloads",
      desc: "Correlate infrastructure behavior across a global footprint.",
      icon: "global"
    }
  ];

  return (
    <section id="teams" className="py-24 px-6 bg-bg-warm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            START WITH ONE CLUSTER.<br />
            GROW WITHOUT CHANGING THE MODEL.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            The fundamental philosophy of data-centric intelligence scales conceptually, 
            whether you are a solo developer or a global enterprise.
          </p>
        </div >

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
          {scales.map((s, i) => (
            <div key={s.role} className="bg-bg-warm p-8 flex flex-col h-full">
              <div className="text-xs font-bold text-accent-orange uppercase tracking-widest mb-4">
                {s.role}
              </div >
              <div className="text-xl font-bold mb-4 whitespace-pre-line">
                {s.scope}
              </div >
              <div className="text-sm text-neutral-500 leading-relaxed mb-8 flex-grow">
                {s.desc}
              </div >
              <div className="pt-6 border-t border-neutral-100 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                <span>SCALE_LEVEL_{i + 1}</span>
                <span className="text-neutral-300">→</span>
              </div >
            </div >
          ))}
        </div >
      </div >
    </section>
  );
};

export default ScaleSection;
