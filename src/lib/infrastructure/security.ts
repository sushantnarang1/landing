export interface SecurityFinding {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  title: string;
  description: string;
  resource: string;
  remediation: string;
}

export interface SecurityScanResult {
  requestId: string;
  status: 'PASSED' | 'FAILED';
  findings: SecurityFinding[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export async function scanInfrastructure(requestId: string, terraformCode: string): Promise<SecurityScanResult> {
  // Mocking a security scan (Checkov/tfsec style)
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSecure = Math.random() > 0.2; 
      const findings: SecurityFinding[] = [];
      
      if (!isSecure) {
        findings.push({
          id: 'CKV_AWS_1',
          severity: 'HIGH',
          title: 'S3 Bucket Public Access',
          description: 'S3 bucket allows public read access',
          resource: 'aws_s3_bucket.this',
          remediation: 'Set public_access_block to true',
        });
      }

      resolve({
        requestId,
        status: isSecure ? 'PASSED' : 'FAILED',
        findings,
        summary: {
          critical: 0,
          high: findings.length,
          medium: 0,
          low: 0,
          info: 0,
        },
      });
    }, 1000);
  });
}
