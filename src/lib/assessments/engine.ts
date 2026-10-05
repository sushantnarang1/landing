import { AssessmentFinding, AssessmentScore, AssessmentReport } from '@/types/assessments/models';

export interface AssessmentRule {
  id: string;
  title: string;
  category: string;
  evaluate: (data: any) => AssessmentFinding | null;
}

export class AssessmentEngine {
  private rules: AssessmentRule[] = [];

  addRule(rule: AssessmentRule) {
    this.rules.push(rule);
  }

  async run(data: any, environment: string): Promise<AssessmentReport> {
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

    const overallScore = Math.round(
      scores.reduce((acc, s) => acc + (s.score * s.weight), 0) * (1 / (scores.length * 0.15)) // Normalizing
    );
    // Simple average for demo
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
