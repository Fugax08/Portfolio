import React, { useState } from 'react';
import { profile } from '../config/profile';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', page: 'home' },
    { id: 'projects', label: 'Projects', page: 'projects' },
    { id: 'about', label: 'About', page: 'about' },
    { id: 'stack', label: 'Stack', page: 'stack' },
    { id: 'admin', label: 'Admin', page: 'admin' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            LDF
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-cyan-400'
                    : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.page)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-cyan-400 bg-slate-800/50'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/30'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              GitHub →
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
