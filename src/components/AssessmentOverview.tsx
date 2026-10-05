import React, { useState } from 'react';
import { AssessmentReport, AssessmentFinding } from '@/types/assessments/models';

const ScoreCircle = ({ label, score, color = 'text-text-primary' }: { label: string, score: number, color?: string }) => (
  <div className="flex flex-col items-center p-4 border border-neutral-200 rounded-sm bg-white">
    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{label}</span>
    <span className={`text-3xl font-bold ${color}`}>{score}</span>
  </div >
);

const AssessmentOverview: React.FC<{ report: AssessmentReport }> = ({ report }) => {
  const [remediating, setRemediating] = useState<string | null>(null);
  const [prUrl, setPrUrl] = useState<string | null>(null);

  const handleRemediate = async (finding: AssessmentFinding) => {
    setRemediating(finding.id);
    try {
      // Simplified UI-only demo flow
      await new Promise(r => setTimeout(r, 1000));
      setPrUrl(`https://github.com/narangos/infra-repo/pull/${Math.floor(Math.random() * 1000)}`);
    } catch (e) {
      console.error('Remediation failed', e);
    } finally {
      setRemediating(null);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 p-8 bg-bg-dark text-text-inverse rounded-sm shadow-xl flex flex-col justify-center items-center text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Overall Score</span>
          <span className="text-7xl font-bold text-accent-orange mb-4">{report.overallScore}</span>
          <span className="text-sm text-neutral-500 font-mono">Environment: {report.environment}</span>
        </div >
        
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {report.scores.map(s => (
            <ScoreCircle key={s.category} label={s.category} score={s.score} />
          ))}
        </div >
      </div >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-neutral-200 bg-white rounded-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Critical Findings</span>
          <span className="text-4xl font-bold text-red-600">{report.findings.filter(f => f.severity === 'CRITICAL').length}</span>
        </div >
        <div className="p-6 border border-neutral-200 bg-white rounded-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">High Risk</span>
          <span className="text-4xl font-bold text-orange-500">{report.findings.filter(f => f.severity === 'HIGH').length}</span>
        </div >
        <div className="p-6 border border-neutral-200 bg-white rounded-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Medium Risk</span>
          <span className="text-4xl font-bold text-neutral-600">{report.findings.filter(f => f.severity === 'MEDIUM').length}</span>
        </div >
      </div >

      <div className="p-6 border border-neutral-200 bg-white rounded-sm">
        <h3 className="text-lg font-bold mb-6">Critical Recommendations</h3>
        <div className="space-y-4">
          {report.findings
            .filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH')
            .slice(0, 3)
            .map(f => (
              <div key={f.id} className="flex items-start gap-4 p-4 bg-neutral-50 border-l-4 border-accent-orange rounded-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-neutral-200 rounded">{f.severity}</span>
                    <span className="text-sm font-bold">{f.title}</span>
                  </div >
                  <p className="text-xs text-neutral-500 mb-2">{f.remediation}</p>
                </div >
                <button 
                  onClick={() => handleRemediate(f)}
                  disabled={remediating === f.id}
                  className="text-xs font-bold uppercase tracking-widest text-accent-orange hover:underline disabled:opacity-50"
                >
                  {remediating === f.id ? 'Generating...' : 'Fix with NarangOS'}
                </button>
              </div >
            ))}
        </div >
      </div >

      {prUrl && (
        <div className="p-4 bg-accent-green/10 border border-accent-green text-accent-green text-sm font-medium rounded-sm flex justify-between items-center animate-in fade-in slide-in-from-top-2">
          <span>Remediation Pull Request created successfully!</span>
          <a href={prUrl} target="_blank" className="underline font-bold">View PR on GitHub</a>
        </div >
      )}
    </div >
  );
};

export default AssessmentOverview;
