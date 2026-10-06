"use client";

import { useLocalBackend } from '@/lib/api/use-local-backend';

export default function LocalBackendStatus() {
  const { isPages, isAvailable } = useLocalBackend();

  if (!isPages) return null;

  return (
    <div
      className={`px-4 py-2 text-center text-sm ${
        isAvailable
          ? 'bg-green-100 text-green-900'
          : 'bg-neutral-100 text-neutral-700'
      }`}
      role="status"
    >
      {isAvailable
        ? 'Local demo backend is connected.'
        : 'Static site is online. Start the local Docker app to enable assessment and contact actions.'}
    </div>
  );
}
