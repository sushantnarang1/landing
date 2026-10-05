import { NextResponse } from 'next/server';
import { AssessmentEngine } from '@/lib/assessments/engine';
import { K8S_AVAILABILITY_RULES } from '@/lib/assessments/rules/kubernetes-availability';
import { GITOPS_RULES } from '@/lib/assessments/rules/gitops';
import { AUTOSCALING_RULES } from '@/lib/assessments/rules/autoscaling';
import { CAPACITY_RULES } from '@/lib/assessments/rules/capacity';
import { CONTROLLER_RULES } from '@/lib/assessments/rules/controllers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { environment, data } = body;

    if (!environment || !data) {
      return NextResponse.json({ error: 'Missing environment or data' }, { status: 400 });
    }

    const engine = new AssessmentEngine();
    K8S_AVAILABILITY_RULES.forEach(r => engine.addRule(r));
    GITOPS_RULES.forEach(r => engine.addRule(r));
    AUTOSCALING_RULES.forEach(r => engine.addRule(r));
    CAPACITY_RULES.forEach(r => engine.addRule(r));
    CONTROLLER_RULES.forEach(r => engine.addRule(r));

    const report = await engine.run(data, environment);
    return NextResponse.json(report, { status: 200 });

  } catch (error: any) {
    console.error('Assessment API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
