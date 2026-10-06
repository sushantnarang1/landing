export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

export function apiUrl(path: string): string {
  if (isStaticExport) {
    return `http://127.0.0.1:3000${path}`;
  }

  return path;
}
