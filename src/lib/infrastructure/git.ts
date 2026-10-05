export interface PullRequestMetadata {
  prNumber: string;
  prUrl: string;
  branch: string;
  commitSha: string;
  repository: string;
}

export async function createInfrastructurePR(requestId: string): Promise<PullRequestMetadata> {
  // Mocking GitHub App / API integration
  // In production: 
  // 1. Create branch from main
  // 2. Commit generated .tf files
  // 3. Open PR with plan output in description
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        prNumber: Math.floor(Math.random() * 1000 + 100).toString(),
        prUrl: `https://github.com/narangos/infra-repo/pull/${Math.floor(Math.random() * 1000 + 100)}`,
        branch: `infra/req-${requestId}`,
        commitSha: Math.random().toString(16).substring(2, 10),
        repository: 'narangos/infra-repo',
      });
    }, 2000);
  });
}
