"use client";

import { useEffect, useState } from 'react';
import { apiUrl, isStaticExport } from '@/lib/api/client';

export function useLocalBackend() {
  const [isAvailable, setIsAvailable] = useState(!isStaticExport);

  useEffect(() => {
    if (!isStaticExport) return;
    let active = true;

    const checkBackend = async () => {
      try {
        const response = await fetch(apiUrl('/api/health'), {
          cache: 'no-store',
          signal: AbortSignal.timeout(2000),
        });
        if (active) setIsAvailable(response.ok);
      } catch {
        if (active) setIsAvailable(false);
      }
    };

    void checkBackend();
    const interval = window.setInterval(checkBackend, 5000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return { isPages: isStaticExport, isAvailable };
}
