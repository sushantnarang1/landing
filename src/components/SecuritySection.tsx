import React from 'react';

const SecuritySection: React.FC = () => {
  const principles = [
    {
      title: "Read-only by default",
      desc: "Observability should not be a vector for instability. NarangOS treats your infrastructure as immutable source truth.",
    },
    {
      title: "Least privilege",
      desc: "Granular RBAC ensures that visibility is scoped exactly to the engineer's needs and the system's requirements.",
    },
    {
      title: "Human-controlled actions",
      desc: "AI suggests, humans approve. Any infrastructure-changing capability requires explicit, audited human authorization.",
    },
    {
      title: "Auditability",
      desc: "Every query, every correlation, and every approved action is recorded in a tamper-proof audit trail.",
    },
    {
      title: "Environment Isolation",
      desc: "Strong boundaries between production, staging, and development environments are enforced at the data layer.",
    },
    {
      title: "Policy Enforcement",
      desc: "Define security signals and network policies as code; NarangOS monitors the delta between intent and reality.",
    }
  ];

  return (
    <section id="security" className="py-24 px-6 bg-bg-dark text-text-inverse">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              TRUST HAS TO BE<br />
              ENGINEERED IN.
            </h2>
            <p className="text-lg text-text-inverse-muted leading-relaxed mb-12">
              Security is not a feature card—it is an architectural principle. We believe in observing freely but acting carefully.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              {principles.map((p) => (
                <div key={p.title} className="group border-l-2 border-neutral-800 pl-6 py-2 hover:border-accent-orange transition-colors">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-orange transition-colors">{p.title}</h3>
                  <p className="text-text-inverse-muted">{p.desc}</p>
                </div >
              ))}
            </div >
          </div >

          <div className="relative">
            {/* Architecture Visual: Zero Trust/Least Privilege */}
            <div className="aspect-square bg-neutral-900 rounded-sm border border-neutral-800 p-8 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.05)_0%,transparent_70%)]" />
              
              <div className="relative z-10 w-full max-w-sm space-y-8">
                {/* User Layer */}
                <div className="flex items-center justify-between p-4 border border-neutral-700 bg-neutral-800 rounded-sm">
                  <span className="text-xs font-mono text-neutral-400">USER_IDENTITY</span>
                  <span className="text-xs font-bold text-accent-orange">AUTH_OK</span>
                </div >
                
                <div className="flex justify-center">
                  <div className="w-px h-8 bg-neutral-700" />
                </div >

                {/* Policy Engine */}
                <div className="p-6 border-2 border-accent-orange bg-bg-dark text-center rounded-sm relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-orange text-bg-dark text-[10px] font-bold px-2 rounded-full">GATEKEEPER</span>
                  <span className="text-sm font-bold">POLICY ENFORCEMENT ENGINE</span>
                </div >

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-neutral-700" />
                </div >

                {/* Resource Layer */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-neutral-700 bg-neutral-800 rounded-sm text-center">
                    <span className="text-[10px] text-neutral-500 block mb-1">READ_ONLY</span>
                    <span className="text-xs font-mono">K8S_CLUSTER</span>
                  </div >
                  <div className="p-3 border border-neutral-700 bg-neutral-800 rounded-sm text-center">
                    <span className="text-[10px] text-neutral-500 block mb-1">READ_ONLY</span>
                    <span className="text-xs font-mono">CLOUD_API</span>
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    </section>
  );
};

export default SecuritySection;
