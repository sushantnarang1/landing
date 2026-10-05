export type PipelineStatus = 'PENDING' | 'PASSED' | 'FAILED';

export interface PipelineStep {
  id: string;
  label: string;
  status: PipelineStatus;
  result?: string;
  error?: string;
}

export interface InfrastructureRequest {
  id: string;
  templateId: string;
  formData: Record<string, any>;
  status: 'REQUESTED' | 'VALIDATING' | 'PLANNING' | 'READY_FOR_PR' | 'PR_CREATED' | 'MERGED' | 'DEPLOYED';
  steps: PipelineStep[];
  createdAt: Date;
}

export const PIPELINE_DEFINITION = [
  { id: 'fmt', label: 'Terraform Format' },
  { id: 'validate', label: 'Terraform Validate' },
  { id: 'security', label: 'Security Analysis' },
  { id: 'policy', label: 'Organization Policy' },
  { id: 'plan', label: 'Terraform Plan' },
];

export async function runPipelineStep(requestId: string, stepId: string): Promise<PipelineStep> {
  // This is a mock of the server-side pipeline execution
  // In a real implementation, this would trigger a worker process
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo
      resolve({
        id: stepId,
        label: PIPELINE_DEFINITION.find(s => s.id === stepId)?.label || 'Unknown',
        status: success ? 'PASSED' : 'FAILED',
        result: success ? 'Step completed successfully' : 'Unexpected configuration error',
        error: success ? undefined : 'Err: Resource limit exceeded in region eastus',
      });
    }, 1500);
  });
}
