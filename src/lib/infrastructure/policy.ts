export interface PolicyResult {
  requestId: string;
  status: 'PASSED' | 'FAILED';
  violations: PolicyViolation[];
}

export interface PolicyViolation {
  policyId: string;
  title: string;
  description: string;
  severity: 'ERROR' | 'WARNING';
}

export async function evaluatePolicy(requestId: string): Promise<PolicyResult> {
  // Mocking OPA/Rego policy evaluation
  return new Promise((resolve) => {
    setTimeout(() => {
      const isCompliant = Math.random() > 0.1;
      const violations: PolicyViolation[] = [];

      if (!isCompliant) {
        violations.push({
          policyId: 'POL_AZ_01',
          title: 'Disallowed Region',
          description: 'Resources cannot be deployed to "westus" for this project.',
          severity: 'ERROR',
        });
      }

      resolve({
        requestId,
        status: isCompliant ? 'PASSED' : 'FAILED',
        violations,
      });
    }, 1000);
  });
}
