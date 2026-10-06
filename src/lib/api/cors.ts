import { NextResponse } from 'next/server';

const allowedOrigins = new Set([
  'https://sushantnarang1.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

export function isAllowedOrigin(origin: string | null): origin is string {
  return origin !== null && allowedOrigins.has(origin);
}

export function apiJson(
  request: Request,
  body: unknown,
  status = 200,
): NextResponse {
  const response = NextResponse.json(body, { status });
  response.headers.set('Vary', 'Origin');

  const origin = request.headers.get('origin');
  if (isAllowedOrigin(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    if (request.headers.get('access-control-request-private-network') === 'true') {
      response.headers.set('Access-Control-Allow-Private-Network', 'true');
    }
  }

  return response;
}

export function optionsResponse(request: Request): NextResponse {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return apiJson(request, { error: 'Origin not allowed' }, 403);
  }

  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Vary', 'Origin');
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Max-Age', '600');
  if (request.headers.get('access-control-request-private-network') === 'true') {
    response.headers.set('Access-Control-Allow-Private-Network', 'true');
  }
  return response;
}
