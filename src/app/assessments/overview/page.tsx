"use client";
import React, { useState } from 'react';
import AssessmentOverview from '@/components/AssessmentOverview';

export default function AssessmentsOverviewPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAssessment = async () => {
    setLoading(true);
    try {
      // Using the new API endpoint
      const response = await fetch('/api/assessments/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environment: 'production',
          data: {
            workload: { 
              name: 'payment-api', 
              replicas: 2, 
              pdb: null, 
              zones: ['us-east-1a'],
              resources: { requests: { cpu: '500m', memory: '512Mi' }, limits: { cpu: '1', memory: '1Gi' } },
              observedMemory: 950,
              limitMemory: 1024,
              observedCPU: 20,
              requestCPU: 500,
            },
            gitopsApp: {
              name: 'payment-api-prod',
              status: 'OutOfSync',
              actualReplicas: 7,
              desiredReplicas: 4,
              selfHeal: false,
            },
            hpa: {
              name: 'payment-api-hpa',
              metrics: ['cpu'],
            },
            metrics: {
              cpuUtilization: 12,
              requestRate: 1200,
            },
            customResource: {
              name: 'db-backup-01',
              status: 'Terminating',
              durationTerminating: 4500,
              finalizer: 'backup.narang.io/finalizer'
            },
            controller: {
              name: 'backup-controller',
              leaderChangesLastHour: 8
            }
          }
        })
      });

      if (!response.ok) throw new Error('Assessment failed');
      const result = await response.json();
      setReport(result);
    } catch (error) {
      console.error('Assessment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Platform Assessment</h1>
          <p className="text-neutral-500">Evaluate production-readiness, reliability, and operational risk.</p>
        </div >
        <button 
          onClick={runAssessment} 
          disabled={loading}
          className="bg-bg-dark text-text-inverse px-6 py-3 rounded-sm font-bold hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          {loading ? 'Running Assessment...' : 'Run New Assessment'}
        </button>
      </div >

      {report ? (
        <AssessmentOverview report={report} />
      ) : (
        <div className="aspect-video border-2 border-dashed border-neutral-200 rounded-sm flex flex-col items-center justify-center text-center p-12">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">No Assessment Data</h3>
          <p className,="text-neutral-500 max-w-md mx-auto mb-8">
            Connect your Kubernetes environment to analyze availability, GitOps maturity, and scaling risks.
          </p>
          <button 
            onClick={runAssessment}
            className="bg-accent-orange text-bg-warm px-8 py-3 rounded-sm font-bold hover:opacity-90 transition-all"
          >
            Run Demo Assessment
          </button>
        </div >
      )}
    </div >
  );
}
