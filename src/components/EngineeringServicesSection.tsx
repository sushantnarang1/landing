import React from 'react';

const EngineeringServicesSection: React.FC = () => {
  const capabilities = [
    "Kubernetes", "AKS", "Azure", "AWS", "Platform Engineering", 
    "Cluster Architecture", "Cloud Migration", "Terraform", "CI/CD", 
    "GitOps", "Observability", "Cilium", "eBPF", "Network Visibility", 
    "AI Infrastructure", "Infrastructure Automation"
  ];

  const offerings = [
    { title: "Infrastructure Assessment", desc: "Deep-dive audit of current state, bottlenecks, and security gaps." },
    { title: "Engineering Consultation", desc: "Strategic guidance on platform design and scaling." },
    { title: "Implementation Engagement", desc: "Hands-on delivery of high-performance infrastructure." },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">NEED HELP TODAY?</h2>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
              The infrastructure expertise behind NarangOS is available now. We help organizations build 
              the technical foundations required for a data-centric intelligence layer.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {offerings.map((o) => (
                <div key={o.title} className="p-4 border border-neutral-200 bg-white rounded-sm">
                  <h3 className="font-bold text-sm mb-2">{o.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{o.desc}</p>
                </div >
              ))}
            </div >
            
            <button className="bg-bg-dark text-text-inverse px-6 py-3 rounded text-sm font-medium hover:bg-neutral-800 transition-all">
              Request Engagement
            </button>
          </div >

          <div className="bg-white border border-neutral-200 p-8 rounded-sm shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <span key={c} className="px-3 py-1 border border-neutral-200 text-xs font-mono text-neutral-600 rounded-full hover:border-accent-orange hover:text-accent-orange transition-colors cursor-default">
                  {c}
                </span>
              ))}
            </div >
          </div >
        </div >
      </div >
    </section>
  );
};

export default EngineeringServicesSection;
