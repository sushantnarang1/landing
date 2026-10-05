import React from 'react';
import Logo from './ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-bg-warm border-t border-neutral-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-xs text-neutral-400 font-mono">
            © {new Date().getFullYear()} NarangOS. All rights reserved.
          </span>
        </div >
        
        <div className="flex gap-8 text-xs font-medium text-neutral-500">
          <a href="#" className="hover:text-accent-orange transition-colors">Terms</a>
          <a href="#" className="hover:text-accent-orange transition-colors">Privacy</a>
          <a href="#" className="hover:text-accent-orange transition-colors">GitHub</a>
          <a href="#" className="hover:text-accent-orange transition-colors">LinkedIn</a>
        </div >
      </div >
    </footer>
  );
};

export default Footer;
