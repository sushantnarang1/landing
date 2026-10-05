import React from 'react';
import { INFRASTRUCTURE_CATALOG } from '@/types/infrastructure/catalog';
import Link from 'next/link';

const CatalogCard = ({ template }: { template: typeof INFRASTRUCTURE_CATALOG[0] }) => (
  <div className="p-6 border border-neutral-200 bg-white hover:border-accent-orange transition-colors rounded-sm group">
    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
      {template.category}
    </div >
    <h3 className="text-lg font-bold mb-2 group-hover:text-accent-orange transition-colors">
      {template.name}
    </h3>
    <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
      {template.description}
    </p>
    <Link 
      href={`/infrastructure/requests/create?templateId=${template.id}`}
      className="text-xs font-bold uppercase tracking-widest text-bg-dark border border-bg-dark px-3 py-2 hover:bg-bg-dark hover:text-text-inverse transition-all"
    >
      Request Resource
    </Link>
  </div >
);

export default function CatalogPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Infrastructure Catalog</h1>
        <p className="text-neutral-500">Provision approved, standardized resources across your environment.</p>
      </div >

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INFRASTRUCTURE_CATALOG.map((t) => (
          <CatalogCard key={t.id} template={t} />
        ))}
      </div >
    </div >
  );
}
