import { AssessmentRule } from '../engine';
import { AssessmentFinding } from '@/types/assessments/models';

export const K8S_AVAILABILITY_RULES: AssessmentRule[] = [
  {
    id: 'K8S-AVAIL-001',
    title: 'Missing PodDisruptionBudget',
    category: 'Availability',
    evaluate: (data) => {
      const workload = data.workload;
      if (!workload.pdb) {
        return {
          id: 'K8S-AVAIL-001',
          title: 'Critical workload lacks disruption protection',
          severity: 'HIGH',
          category: 'Availability',
          affectedResource: `Deployment/${workload.name}`,
          observedState: 'No PodDisruptionBudget configured',
          expectedState: 'PDB configured to protect minimum available replicas',
          evidence: `Replicas: ${workload.replicas}, PDBs: 0`,
          whyItMatters: 'Without a PDB, maintenance operations (like node drains) can evict all replicas simultaneously.',
          impact: 'Temporary total unavailability of the service during maintenance.',
          remediation: 'Create a PodDisruptionBudget with minAvailable: 1',
          confidence: 100,
          canAutomate: true,
        };
      }
      return null;
    },
  },
  {
    id: 'K8S-AVAIL-002',
    title: 'Single-AZ Concentration',
    category: 'Availability',
    evaluate: (data) => {
      const workload = data.workload;
      if (workload.zones && workload.zones.length === 1) {
        return {
          id: 'K8S-AVAIL-002',
          title: 'All replicas located in single Availability Zone',
          severity: 'CRITICAL',
          category: 'Availability',
          affectedResource: `Deployment/${workload.name}`,
          observedState: `All pods located in ${workload.zones[0]}`,
          expectedState: 'Pods distributed across multiple AZs',
          evidence: `Zonal Distribution: { ${workload.zones[0]}: ${workload.replicas} }`,
          whyItMatters: 'A single zone outage will result in total service failure.',
          impact: 'Complete outage of the affected workload during AZ failure.',
          remediation: 'Implement topologySpreadConstraints to ensure multi-AZ distribution.',
          confidence: 100,
          canAutomate: false,
        };
      }
      return null;
    },
  },
];
