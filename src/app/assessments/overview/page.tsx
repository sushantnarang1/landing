"use client";
import React, { useState } from 'react';
import AssessmentOverview from '@/components/AssessmentOverview';
import { AssessmentReport } from '@/types/assessments/models';
import { apiUrl } from '@/lib/api/client';
import { useLocalBackend } from '@/lib/api/use-local-backend';

export default function AssessmentsOverviewPage() {
  const { isAvailable, isPages } = useLocalBackend();
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const runAssessment = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(apiUrl('/api/assessments/run'), {
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

      if (!response.ok) throw new Error('Assessment failed. Check that the local Docker app is running.');
      const result: AssessmentReport = await response.json();
      setReport(result);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not connect to the local Docker app.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-//tight mb-4">Platform Assessment</h1>
          <p className="text-neutral-500">Evaluate production-readiness, reliability, and operational risk.</p>
        </div >
        <button 
          onClick={runAssessment} 
          disabled={loading || !isAvailable}
          className="bg-bg-dark text-text-inverse px-6 py-3 rounded-sm font-bold hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          {loading
            ? 'Running Assessment...'
            : isPages && !isAvailable
              ? 'Start local Docker app to enable'
              : 'Run New Assessment'}
        </button>
      </div >

      {errorMessage && (
        <p className="mb-6 text-sm text-red-600" role="alert">{errorMessage}</p>
      )}

      {report ? (
        <AssessmentOverview report={report} />
      ) : (
        <div className="aspect-video border-2 border-dashed border-neutral-200 rounded-sm flex flex-col items-center justify-center text-center p-12">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">No Assessment Data</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-8">
            Connect your Kubernetes environment to analyze availability, GitOps maturity, and scaling risks.
          </p>
          <button 
            onClick={runAssessment}
            disabled={loading || !isAvailable}
            className="bg-accent-orange text-bg-warm px-8 py-3 rounded-sm font-bold hover:opacity-90 transition-all"
          >
            {loading
              ? 'Running Assessment...'
              : isPages && !isAvailable
                ? 'Start local Docker app to enable'
                : 'Run Demo Assessment'}
          </button>
        </div >
      )}
    </div >
  );
}
