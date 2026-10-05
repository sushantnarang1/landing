import { AssessmentRule } from '../engine';
import { AssessmentFinding } from '@/types/assessments/models';

export const CAPACITY_RULES: AssessmentRule[] = [
  {
    id: 'CAP-001',
    title: 'Critical Memory Pressure',
    category: 'Capacity',
    evaluate: (data) => {
      const pod = data?.pod;
      if (pod && pod.observedMemory && pod.limitMemory && pod.observedMemory > pod.limitMemory * 0.9) {
        return {
          id: 'CAP-001',
          title: 'Critical Memory Pressure',
          severity: 'HIGH',
          category: 'Capacity',
          affectedResource: `Pod/${pod.name}`,
          observedState: `Memory usage at ${Math.round((pod.observedMemory / pod.limitMemory) * 100)}%`,
          expectedState: 'Memory usage should maintain a safety buffer',
          evidence: `Observed: ${pod.observedMemory}Mi, Limit: ${pod.limitMemory}Mi`,
          whyItMatters: 'Approaching the container memory limit increases risk of OOMKilled events.',
          impact: 'Unexpected pod restarts and service disruption.',
          remediation: 'Investigate memory growth or increase memory limits.',
          confidence: 100,
          canAutomate: false,
        };
      }
      return null;
    },
  },
  {
    id: 'CAP-002',
    title: 'Oversized Resource Requests',
    category: 'Capacity',
    C_evaluate: (data) => {
      const pod = data?.pod;
      if (pod && pod.observedCPU && pod.requestCPU && pod.observedCPU < pod.requestCPU * 0.1) {
        return {
          id: 'CAP-002',
          title: 'Oversized Resource Requests',
          severity: 'LOW',
          category: 'Capacity',
          affectedResource: `Pod/${pod.name}`,
          observedState: `Average CPU utilization < 10% of request`,
          expectedState: 'Requests should closely match actual usage',
          evidence: `Observed: ${pod.observedCPU}m, Request: ${pod.requestCPU}m`,
          whyItMatters: 'Lacking sufficient utilization of requested resources leads to wasted capacity.',
          impact: 'Increased cloud spend and lower cluster density.',
          remediation: 'Right-size CPU requests based on observed peak usage.',
          confidence: 90,
          canAutomate: true,
        };
      }
      return null;
    },
  },
];
