import { AssessmentRule } from '../engine';
import { AssessmentFinding } from '@/types/assessments/models';

export const CONTROLLER_RULES: AssessmentRule[] = [
  {
    id: 'CTRL-001',
    title: 'Resource Stuck in Terminating State',
    category: 'Controllers',
    evaluate: (data) => {
      const resource = data.customResource;
      if (resource && resource.status === 'Terminating' && resource.durationTerminating > 3600) {
        return {
          id: 'CTRL-001',
          title: 'Resource stuck in Terminating state',
          severity: 'HIGH',
          category: 'Controllers',
          affectedResource: `CR/${resource.name}`,
          observedState: `Status: Terminating for ${resource.durationTerminating}s`,
          expectedState: 'Resources should be cleaned up and removed promptly',
          evidence: `Finalizer present: ${resource.finalizer}`,
          whyItMatters: 'Indicates a broken controller or a finalizer that cannot be completed, preventing resource cleanup.',
          impact: 'Orphaned cloud resources and cluttered cluster state.',
          remediation: 'Investigate the controller logs for the specific finalizer and manually clean up if necessary.',
          confidence: 100,
          canAutomate: false,
        };
      }
      return null;
    },
  },
  {
    id: 'CTRL-002',
    title: 'Controller Leader Election Flapping',
    category: 'Controllers',
    evaluate: (data) => {
      const ctrl = data.controller;
      if (ctrl && ctrl.leaderChangesLastHour > 5) {
        return {
          id: 'CTRL-002',
          title: 'Controller leader election flapping',
          severity: 'MEDIUM',
          category: 'Controllers',
          affectedResource: `Controller/${ctrl.name}`,
          observedState: `${ctrl.leaderChangesLastHour} leader changes in 60m`,
          expectedState: 'Stable leader election for consistent reconciliation',
          evidence: `Event log shows frequent lease acquisitions`,
          whyItMatters: 'Frequent leadership changes cause reconciliation gaps and potential duplicate operations.',
          impact: 'Increased latency in reaching desired state.',
          remediation: 'Review controller resource limits and network latency to the lease object.',
          confidence: 90,
          canAutomate: false,
        };
      }
      return null;
    },
  },
];
