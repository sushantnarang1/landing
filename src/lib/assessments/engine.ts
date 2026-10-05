import { AssessmentFinding, AssessmentScore, AssessmentReport } from '@/types/assessments/models';

export interface AssessmentRule {
  id: string;
  title: string;
  category: string;
  evaluate: (data: AssessmentData) => AssessmentFinding | null;
}

export interface AssessmentData {
  workload?: {
    name?: string;
    replicas?: number;
    pdb?: boolean | null;
    zones?: string[];
    resources?: { requests?: { cpu?: string } };
  };
  pod?: {
    name?: string;
    observedMemory?: number;
    limitMemory?: number;
    observedCPU?: number;
    requestCPU?: number;
    resources?: { requests?: { cpu?: string } };
  };
  gitopsApp?: {
    name?: string;
    status?: string;
    actualReplicas?: number;
    desiredReplicas?: number;
    selfHeal?: boolean;
  };
  hpa?: { name?: string; metrics?: string[] };
  metrics?: { cpuUtilization?: number; requestRate?: number };
  customResource?: {
    name?: string;
    status?: string;
    durationTerminating?: number;
    finalizer?: string;
  };
  controller?: { name?: string; leaderChangesLastHour?: number };
}

export function isAssessmentData(value: unknown): value is AssessmentData {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export class AssessmentEngine {
  private rules: AssessmentRule[] = [];

  addRule(rule: AssessmentRule) {
    this.rules.push(rule);
  }

  async run(data: AssessmentData, environment: string): Promise<AssessmentReport> {
    const findings: AssessmentFinding[] = [];
    
    for (const rule of this.rules) {
      const finding = rule.evaluate(data);
      if (finding) {
        findings.push(finding);
      }
    }

    // Calculate scores based on weights (simplified for demo)
    const categories = ['Availability', 'GitOps', 'Scaling', 'Capacity', 'Security'];
    const scores: AssessmentScore[] = categories.map(cat => {
      const catFindings = findings.filter(f => f.category === cat);
      const deduction = catFindings.reduce((acc, f) => {
        if (f.severity === 'CRITICAL') return acc + 30;
        if (f.severity === 'HIGH') return acc + 15;
        if (f.severity === 'MEDIUM') return acc + 5;
        return acc + 1;
      }, 0);
      
      return {
        category: cat,
        score: Math.max(0, 100 - deduction),
        weight: 0.15, // Simplified equal weight
        findingsCount: {
          critical: catFindings.filter(f => f.severity === 'CRITICAL').length,
          high: catFindings.filter(f => f.severity === 'HIGH').length,
          medium: catFindings.filter(f => f.severity === 'MEDIUM').length,
          low: catFindings.filter(f => f.severity === 'LOW').length,
        }
      };
    });

    const avgScore = Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);

    return {
      environment,
      overallScore: avgScore,
      scores,
      findings,
      timestamp: new Date(),
    };
  }
}
