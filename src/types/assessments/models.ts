export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface AssessmentFinding {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  affectedResource: string;
  observedState: string;
  expectedState: string;
  evidence: string;
  whyItMatters: string;
  impact: string;
  remediation: string;
  confidence: number; // 0-100
  canAutomate: boolean;
}

export interface AssessmentScore {
  category: string;
  score: number; // 0-100
  weight: number; // e.g., 0.25
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface AssessmentReport {
  environment: string;
  overallScore: number;
  scores: AssessmentScore[];
  findings: AssessmentFinding[];
  timestamp: Date;
}
