import React from 'react';
import InfrastructureSidebar from '@/components/InfrastructureSidebar';

export default function InfrastructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-warm">
      <InfrastructureSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div >
  );
}
