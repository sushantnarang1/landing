"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { runPipelineStep, PIPELINE_DEFINITION, PipelineStatus, PipelineStep } from '@/lib/infrastructure/pipeline';
import { scanInfrastructure } from '@/lib/infrastructure/security';
import { evaluatePolicy } from '@/lib/infrastructure/policy';
import { createInfrastructurePR, PullRequestMetadata } from '@/lib/infrastructure/git';
import { useLocalBackend } from '@/lib/api/use-local-backend';

const PipelineStepRow = ({ label, status, description, error }: { label: string, status: PipelineStatus, description?: string, error?: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-neutral-100">
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      {status === 'PASSED' && <span className="text-[10px] font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded">PASSED</span>}
      {status === 'FAILED' && <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">FAILED</span>}
      {status === 'PENDING' && <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">PENDING</span>}
    </div >
    <div className="text-right">
      {error ? <span className="text-xs text-red-500 font-mono">{error}</span> : <span className="text-xs text-neutral-400 font-mono">{description}</span>}
    </div >
  </div >
);

function RequestViewContent() {
  const searchParams = useSearchParams();
  const { isAvailable, isPages } = useLocalBackend();
  const requestId = searchParams.get('id') ?? 'demo';
  const [steps, setSteps] = useState<Record<string, PipelineStep>>({});
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [prMetadata, setPrMetadata] = useState<PullRequestMetadata | null>(null);
  const [isCreatingPR, setIsCreatingPR] = useState(false);

  useEffect(() => {
    if (!isAvailable) return;

    const runNextStep = async () => {
      if (currentStepIdx >= PIPELINE_DEFINITION.length) {
        setIsComplete(true);
        return;
      }

      const stepDef = PIPELINE_DEFINITION[currentStepIdx];
      let result: PipelineStep;

      if (stepDef.id === 'security') {
        const scan = await scanInfrastructure(requestId, 'mock-tf-code');
        result = {
          id: stepDef.id,
          label: stepDef.label,
          status: scan.status,
          result: `${scan.findings.length} security finding(s)`,
        };
      } else if (stepDef.id === 'policy') {
        const policy = await evaluatePolicy(requestId);
        result = {
          id: stepDef.id,
          label: stepDef.label,
          status: policy.status,
          result: policy.violations.length === 0
            ? 'No policy violations'
            : `${policy.violations.length} policy violation(s)`,
        };
      } else {
        result = await runPipelineStep(requestId, stepDef.id);
      }
      
      const normalizedResult = {
        id: stepDef.id,
        label: stepDef.label,
        status: result.status,
        result: result.result ?? (result.status === 'PASSED' ? 'Step completed successfully' : 'Validation failed'),
        error: result.error ?? (result.status === 'FAILED' ? 'Validation failed' : undefined),
      };

      setSteps(prev => ({ ...prev, [stepDef.id]: normalizedResult }));

      if (result.status === 'FAILED') {
        setIsComplete(true);
      } else {
        setCurrentStepIdx(prev => prev + 1);
      }
    };

    runNextStep();
  }, [currentStepIdx, isAvailable, requestId]);

  const handleCreatePR = async () => {
    setIsCreatingPR(true);
    try {
      const pr = await createInfrastructurePR(requestId);
      setPrMetadata(pr);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingPR(false);
    }
  };

  const allPassed = PIPELINE_DEFINITION.every(s => steps[s.id]?.status === 'PASSED');

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-start mb-12">
        <div>
          <div className="text-xs font-bold text-accent-orange uppercase tracking-widest mb-2">Infrastructure Request #{requestId}</div>
          <h1 className="text-4xl font-bold tracking-tight">PostgreSQL Database</h1>
          <p className="text-neutral-500">checkout-production</p>
        </div >
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium border border-neutral-200 hover:bg-neutral-50 rounded-sm">View Terraform</button>
          <button className="px-4 py-2 text-sm font-medium border border-neutral-200 hover:bg-neutral-50 rounded-sm">View Plan</button>
        </div >
      </div >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="p-6 border border-neutral-200 bg-white rounded-sm shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Validation Pipeline</h3>
            <div className="space-y-1">
              {PIPELINE_DEFINITION.map((s) => (
                <PipelineStepRow 
                  key={s.id} 
                  label={s.label} 
                  status={steps[s.id]?.status || 'PENDING'} 
                  description={steps[s.id]?.result}
                  error={steps[s.id]?.error}
                />
              ))}
            </div >
          </div >

          <div className="p-6 border border-neutral-200 bg-white rounded-sm shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Resource Summary</h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Cloud Provider</span>
                <span className="font-medium">Azure</span>
              </div >
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Environment</span>
                <span className="font-medium">Production</span>
              </div >
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Resource Type</span>
                <span className="font-medium">Azure PostgreSQL Flexible Server</span>
              </div >
              <div className="flex justify-between py-2">
                <span className="text-neutral-500">Risk Level</span>
                <span className={`font-bold ${allPassed ? 'text-accent-green' : 'text-red-500'}`}>
                  {allPassed ? 'LOW' : 'HIGH / UNKNOWN'}
                </span>
              </div >
            </div >
          </div >
        </div >

        <div className="space-y-6">
          <div className="p-6 border border-neutral-200 bg-bg-dark text-text-inverse rounded-sm shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Action</h3>
            {prMetadata ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p className="text-sm opacity-80">Pull Request successfully created.</p>
                <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-xs font-mono">
                  <div className="text-neutral-500 mb-1">PR #{prMetadata.prNumber}</div>
                  <div className="truncate text-accent-orange">{prMetadata.prUrl}</div>
                </div >
                <a 
                  href={prMetadata.prUrl} 
                  target="_blank" 
                  className="block text-center w-full py-3 bg-white text-bg-dark font-bold rounded-sm hover:bg-neutral-100 transition-all"
                >
                  VIEW IN GITHUB
                </a>
              </div >
            ) : allPassed ? (
              <>
                <p className="text-sm mb-6 opacity-80">All validation steps passed. You can now create a Pull Request for review.</p>
                <button 
                  onClick={handleCreatePR}
                  disabled={isCreatingPR}
                  className="w-full py-3 bg-accent-orange text-bg-warm font-bold rounded-sm hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isCreatingPR ? 'Creating PR...' : 'CREATE PULL REQUEST'}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm mb-6 opacity-80">
                  {isPages && !isAvailable
                    ? "Start the local Docker app to enable this demo."
                    : isComplete 
                    ? "Pipeline failed. Resolve plan errors before creating a Pull Request." 
                    : "Pipeline is executing. Please wait for validation to complete."}
                </p>
                <button disabled className="w-full py-3 bg-neutral-800 text-neutral-500 font-bold rounded-sm cursor-not-allowed">
                  CREATE PULL REQUEST
                </button>
              </>
            )}
          </div >
          
          <div className="p-4 border border-neutral-200 bg-neutral-50 rounded-sm text-[10px] font-mono text-neutral-400">
            T-PLAN_ID: {steps['plan']?.id || 'PENDING'}<br />
            S-SCAN_ID: {steps['security']?.id || 'PENDING'}<br />
            P-POLICY: policy_v2.4
          </div >
        </div >
      </div >
    </div >
  );
}

export default function RequestViewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-400">Loading request...</div>}>
      <RequestViewContent />
    </Suspense>
  );
}
