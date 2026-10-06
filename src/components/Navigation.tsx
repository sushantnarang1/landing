import React from 'react';
import Logo from './ui/Logo';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-bg-warm/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link href="#product" className="hover:text-accent-orange transition-colors">Product</Link>
          <Link href="/infrastructure/catalog" className="hover:text-accent-orange transition-colors">Infrastructure</Link>
          <Link href="/assessments/overview" className="hover:text-accent-orange transition-colors">Assessments</Link>
          <Link href="#security" className="hover:text-accent-orange transition-colors">Security</Link>
          <Link href="/contact" className="hover:text-accent-orange transition-colors">Contact</Link>
        </div>

        <div className="flex items-center">
          <Link href="/contact" className="bg-bg-dark text-text-inverse px-4 py-2 rounded text-sm font-medium hover:bg-neutral-800 transition-all">
            Early Access
          </Link>
        </div >
      </div >
    </nav>
  );
};

export default Navigation;
