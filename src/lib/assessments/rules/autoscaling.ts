import { AssessmentRule } from '../engine';
import { AssessmentFinding } from '@/types/assessments/models';

export const AUTOSCALING_RULES: AssessmentRule[] = [
  {
    id: 'SCALE-001',
    title: 'CPU Scaling with Missing Requests',
    category: 'Scaling',
    evaluate: (data) => {
      const hpa = data?.hpa;
      const pod = data?.pod;
      if (hpa && hpa.metrics?.includes('cpu') && (!pod || !pod.resources || !pod.resources.requests || !pod.resources.requests.cpu)) {
        return {
          id: 'SCALE-001',
          title: 'CPU Scaling with Missing Requests',
          severity: 'HIGH',
          category: 'Scaling',
          affectedResource: `HPA/${hpa.name}`,
          observedState: 'HPA scales on CPU, but pods have no CPU request defined',
          expectedState: 'All scaling pods must have explicit resource requests',
          evidence: `HPA: ${hpa.name}, Pod CPU Request: undefined`,
          whyItMatters: 'HPA calculates utilization as (Actual / Request). Without a request, utilization is undefined or erratic.',
          impact: 'Unpredictable scaling behavior or failure to scale up.',
          remediation: 'Add resource.requests.cpu to the pod specification.',
          confidence: 100,
          canAutomate: true,
        };
      }
      return null;
    },
  },
  {
    id: 'SCALE-002',
    title: 'Ineffective Scaling Signal',
    category: 'Scaling',
    evaluate: (data) => {
      const hpa = data?.hpa;
      const metrics = data?.metrics;
      if (hpa && hpa.metrics?.includes('cpu') && metrics && metrics.cpuUtilization < 20 && metrics.requestRate > 1000) {
        return {
          id: 'SCALE-002',
          title: 'Ineffective Scaling Signal',
          severity: 'MEDIUM',
          category: 'Scaling',
          affectedResource: `HPA/${hpa.name}`,
          observedState: 'CPU utilization low while request rate is high',
          expectedState: 'Scaling signal should correlate with actual demand',
          evidence: `CPU: ${metrics.cpuUtilization}%, ReqRate: ${metrics.requestRate} req/s`,
          whyItMatters: 'CPU is a poor proxy for demand for I/O bound or event-driven services.',
          impact: 'Under-provisioning during high traffic peaks.',
          remediation: 'Switch to custom metrics (e.g., request rate or queue depth) via KEDA.',
          confidence: 80,
          canAutomate: false,
        };
      }
      return null;
    },
  },
];
