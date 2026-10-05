import React from 'react';
import GoDiagnostics from '@/components/GoDiagnostics';

export default function DiagnosticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Application Diagnostics</h1>
        <p className="text-neutral-500">Deep-dive into application runtime behavior and identify bottlenecks.</p>
      </div >
      <GoDiagnostics />
    </div >
  );
}
