import React from 'react';
import Link from 'next/link';

const InfrastructureSidebar: React.FC = () => {
  const menuItems = [
    { label: 'Catalog', href: '/infrastructure/catalog' },
    { label: 'Assessments', href: '/assessments/overview' },
    { label: 'Diagnostics', href: '/assessments/diagnostics' },
  ];

  return (
    <div className="w-64 h-full border-r border-neutral-200 bg-bg-warm flex flex-col py-6 px-4">
      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4 px-2">
        Infrastructure
      </div >
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="block px-2 py-2 text-sm font-medium text-text-secondary hover:bg-neutral-100 hover:text-accent-orange rounded-sm transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div >
  );
};

export default InfrastructureSidebar;
