import React, { useState } from 'react';
import Button from './Button';

/**
 * Navbar Component
 * @param {Object} props
 * @param {string} props.currentPage
 * @param {(page: string) => void} props.onNavigate
 */
export default function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#e6e0d3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] rounded-xl px-1 py-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:bg-[#26533c] transition-colors">
              🌿
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg text-[#1b3b2b] tracking-tight block">
                TouchGrass<span className="text-[#3b7c58] ml-1 text-sm sm:text-base font-medium">AI</span>
              </span>
              <span className="text-[10px] text-[#6d7b72] tracking-wider uppercase hidden sm:block">
                Open-Source Outdoor Missions
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-[#1b3b2b]/10 text-[#1b3b2b] font-semibold'
                  : 'text-[#48574d] hover:text-[#1b3b2b] hover:bg-[#1b3b2b]/5'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNav('generate')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'generate'
                  ? 'bg-[#1b3b2b]/10 text-[#1b3b2b] font-semibold'
                  : 'text-[#48574d] hover:text-[#1b3b2b] hover:bg-[#1b3b2b]/5'
              }`}
            >
              Create Mission
            </button>
            
            <div className="h-5 w-px bg-[#e0d9cb] mx-2" aria-hidden="true" />

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNav('generate')}
            >
              Start Adventure
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#1b3b2b] bg-[#f0ebdE] hover:bg-[#e6e0d2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e6e0d3] bg-[#fbf9f5] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium ${
              currentPage === 'home'
                ? 'bg-[#1b3b2b] text-white'
                : 'text-[#2e3c33] hover:bg-[#f0ece1]'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNav('generate')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium ${
              currentPage === 'generate'
                ? 'bg-[#1b3b2b] text-white'
                : 'text-[#2e3c33] hover:bg-[#f0ece1]'
            }`}
          >
            Create Mission
          </button>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => handleNav('generate')}
            >
              Start Adventure
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
