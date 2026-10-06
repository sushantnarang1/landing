import { apiJson, isAllowedOrigin, optionsResponse } from '@/lib/api/cors';

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export function GET(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && !isAllowedOrigin(origin)) {
    return apiJson(request, { error: 'Origin not allowed' }, 403);
  }

  return apiJson(request, { status: 'ok' });
}
