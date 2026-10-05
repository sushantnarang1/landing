"use client";
import React, { useState, useEffect } from 'react';

const PacketContextSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { 
      label: "PACKET", 
      value: "172.16.2.41 → 172.16.4.19\nTCP retransmission detected", 
      color: "text-neutral-500" 
    },
    { 
      label: "WORKLOAD", 
      value: "checkout-api", 
      color: "text-neutral-600" 
    },
    { 
      label: "KUBERNETES", 
      value: "Pod: checkout-api-7f8d\nNamespace: production", 
      color: "text-neutral-700" 
    },
    { 
      label: "DEPLOYMENT", 
      value: "checkout-api v2.18", 
      color: "text-neutral-800" 
    },
    { 
      label: "APPLICATION", 
      value: "Checkout", 
      color: "text-text-primary" 
    },
    { 
      label: "AI CONTEXT", 
      value: '"Network degradation began shortly after deployment v2.18."', 
      color: "text-accent-orange" 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-24 px-6 bg-neutral-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            From Packet<br />
            To Context.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            Most tools stop at the symptom. NarangOS traces the signal from the wire to the business logic.
          </p>
          <div className="text-sm font-mono text-neutral-400">
            Reasoning based on evidence, not inference.
          </div >
        </div >

        <div className="bg-bg-dark p-8 rounded-sm shadow-2xl font-mono text-sm relative min-h-[400px]">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-neutral-700" />
            <div className="w-3 h-3 rounded-full bg-neutral-700" />
            <div className="w-3 h-3 rounded-full bg-neutral-700" />
          </div >

          <div className="space-y-8 mt-8">
            {steps.map((s, i) => (
              <div 
                key={i} 
                className={`transition-all duration-500 ${i <= step ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-neutral-500 w-24 shrink-0">{s.label}</span>
                  <div className="w-px h-4 bg-neutral-700" />
                  <span className={`whitespace-pre-line ${s.color}`}>{s.value}</span>
                </div >
              </div >
            ))}
          </div >
        </div >
      </div >
    </section>
  );
};

export default PacketContextSection;
