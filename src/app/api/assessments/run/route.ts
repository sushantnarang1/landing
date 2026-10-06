import { AssessmentEngine, isAssessmentData } from '@/lib/assessments/engine';
import { K8S_AVAILABILITY_RULES } from '@/lib/assessments/rules/kubernetes-availability';
import { GITOPS_RULES } from '@/lib/assessments/rules/gitops';
import { AUTOSCALING_RULES } from '@/lib/assessments/rules/autoscaling';
import { CAPACITY_RULES } from '@/lib/assessments/rules/capacity';
import { CONTROLLER_RULES } from '@/lib/assessments/rules/controllers';
import { apiJson, isAllowedOrigin, optionsResponse } from '@/lib/api/cors';

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return apiJson(request, { error: 'Origin not allowed' }, 403);
  }

  try {
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return apiJson(request, { error: 'Invalid request body' }, 400);
    }

    const { environment, data } = body as Record<string, unknown>;
    if (typeof environment !== 'string' || !environment || !isAssessmentData(data)) {
      return apiJson(request, { error: 'Missing environment or data' }, 400);
    }

    const engine = new AssessmentEngine();
    K8S_AVAILABILITY_RULES.forEach(r => engine.addRule(r));
    GITOPS_RULES.forEach(r => engine.addRule(r));
    AUTOSCALING_RULES.forEach(r => engine.addRule(r));
    CAPACITY_RULES.forEach(r => engine.addRule(r));
    CONTROLLER_RULES.forEach(r => engine.addRule(r));

    const report = await engine.run(data, environment);
    return apiJson(request, report);

  } catch (error: unknown) {
    console.error('Assessment API Error:', error);
    return apiJson(request, { error: 'Internal server error' }, 500);
  }
}
