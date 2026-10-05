import type { AssessmentRule } from '../engine';

export const GITOPS_RULES: AssessmentRule[] = [
  {
    id: 'GITOPS-001',
    title: 'Infrastructure Drift Detected',
    category: 'GitOps',
    evaluate: (data) => {
      const app = data.gitopsApp;
      if (
        app?.status === 'OutOfSync' &&
        typeof app.actualReplicas === 'number' &&
        typeof app.desiredReplicas === 'number'
      ) {
        return {
          id: 'GITOPS-001',
          title: 'GitOps Drift Detected',
          severity: 'HIGH',
          category: 'GitOps',
          affectedResource: `Application/${app.name ?? 'unknown'}`,
          observedState: `Actual replicas: ${app.actualReplicas}, Desired: ${app.desiredReplicas}`,
          expectedState: 'Cluster state should match Git source of truth',
          evidence: `Drift: ${app.actualReplicas - app.desiredReplicas} unexpected replicas`,
          whyItMatters: 'Manual changes to the cluster bypass the audit trail and can be overwritten by auto-sync.',
          impact: 'Configuration inconsistency and potential instability.',
          remediation: 'Sync application from Git or update Git to match the desired state.',
          confidence: 100,
          canAutomate: true,
        };
      }
      return null;
    },
  },
  {
    id: 'GITOPS-002',
    title: 'Self-Healing Disabled',
    category: 'GitOps',
    evaluate: (data) => {
      const app = data.gitopsApp;
      if (app && app.selfHeal === false) {
        return {
          id: 'GITOPS-002',
          title: 'Self-Healing Disabled',
          severity: 'MEDIUM',
          category: 'GitOps',
          affectedResource: `Application/${app.name ?? 'unknown'}`,
          observedState: 'selfHeal: false',
          expectedState: 'selfHeal: true for production workloads',
          evidence: 'Application configuration shows self-healing is disabled.',
          whyItMatters: 'Manual drift will persist until the next manual sync.',
          impact: 'Prolonged period of configuration drift.',
          remediation: 'Enable self-healing in the Argo CD application spec.',
          confidence: 100,
          canAutomate: true,
        };
      }
      return null;
    },
  },
];
