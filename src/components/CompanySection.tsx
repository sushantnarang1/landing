import React from 'react';

const CompanySection: React.FC = () => {
  const metrics = [
    { value: "1000+", label: "APIs migrated to Kubernetes infrastructure" },
    { value: "200+", label: "Microservices supported through modern delivery systems" },
    { value: "400+", label: "Engineering hours per month eliminated through automation" },
  ];

  return (
    <section id="company" className="py-24 px-6 bg-bg-dark text-text-inverse">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-8">THE STORY</h2>
            <div className="space-y-6 text-lg text-text-inverse-muted leading-relaxed">
              <p>
                NarangOS is being built from the belief that understanding infrastructure 
                should not require stitching together twenty different views of reality.
              </p>
              <p>
                We are starting focused: building the data foundation correctly, 
                solving real infrastructure problems, and learning from our engineering engagements.
              </p>
              <p>
                We turn those lessons into the product, ensuring that NarangOS is not 
                just another tool, but a reflection of actual operational experience.
              </p>
            </div >
          </div >

          <div className="flex flex-col justify-center">
            <div className="grid gap-8">
              {metrics.map((m) => (
                <div key={m.value} className="group border-b border-neutral-800 pb-6">
                  <div className="text-5xl font-bold text-accent-orange mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {m.value}
                  </div >
                  <div className="text-sm font-medium text-text-inverse-muted">
                    {m.label}
                  </div >
                </div >
              ))}
            </div >
            <div className="mt-8 text-xs font-mono text-neutral-600 italic">
              * Metrics reflect engineering experience informing the platform.
            </div >
          </div >
        </div >
      </div >
    </section>
  );
};

export default CompanySection;
