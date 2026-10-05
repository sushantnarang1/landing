export type CloudProvider = 'azure' | 'aws' | 'gcp' | 'kubernetes';
export type Environment = 'development' | 'staging' | 'production';

export interface ResourceTemplate {
  id: string;
  name: string;
  category: 'COMPUTE' | 'DATA' | 'NETWORKING' | 'MESSAGING' | 'PLATFORM' | 'OBSERVABILITY';
  description: string;
  provider: CloudProvider;
  requiredInputs: ResourceInput[];
}

export interface ResourceInput {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  options?: string[];
  required: boolean;
  defaultValue?: string;
}

export const INFRASTRUCTURE_CATALOG: ResourceTemplate[] = [
  {
    id: 'azure-postgresql',
    name: 'PostgreSQL Database',
    category: 'DATA',
    description: 'Managed PostgreSQL Flexible Server with high availability options.',
    provider: 'azure',
    requiredInputs: [
      { id: 'db_name', label: 'Database Name', type: 'text', required: true },
      { id: 'size', label: 'Size', type: 'select', options: ['Small', 'Medium', 'Large'], required: true, defaultValue: 'Small' },
      { id: 'ha', label: 'High Availability', type: 'boolean', required: false, defaultValue: 'false' },
      { id: 'backup', label: 'Backup Enabled', type: 'boolean', required: true, defaultValue: 'true' },
    ],
  },
  {
    id: 'aws-s3',
    name: 'S3 Bucket',
    category: 'DATA',
    description: 'Secure object storage with versioning and encryption.',
    provider: 'aws',
    requiredInputs: [
      { id: 'bucket_name', label: 'Bucket Name', type: 'text', required: true },
      { id: 'versioning', label: 'Enable Versioning', type: 'boolean', required: true, defaultValue: 'true' },
      { id: 'public_access', label: 'Allow Public Access', type: 'boolean', required: true, defaultValue: 'false' },
    ],
  },
  {
    id: 'k8s-namespace',
    name: 'Kubernetes Namespace',
    category: 'PLATFORM',
    description: 'Isolated namespace with resource quotas and network policies.',
    provider: 'kubernetes',
    requiredInputs: [
      { id: 'namespace_name', label: 'Namespace Name', type: 'text', required: true },
      { id: 'quota_cpu', label: 'CPU Quota', type: 'text', required: true, defaultValue: '4' },
      { id: 'quota_mem', label: 'Memory Quota', type: 'text', required: true, defaultValue: '16Gi' },
    ],
  },
];
