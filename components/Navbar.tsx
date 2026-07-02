'use client';

import React, { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = ['hero', 'projects', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? '0.75rem 1.5rem' : '1.5rem 1.5rem',
          background: scrolled
            ? 'rgba(10, 9, 6, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,150,90,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold tracking-tight transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                color: 'var(--background)',
                boxShadow: '0 0 16px rgba(200,150,90,0.3)',
              }}
            >
              RN
            </div>
            <span className="text-sm font-bold text-foreground hidden sm:block tracking-wide">
              Rahul <span className="serif font-normal opacity-60">Natesan</span>
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                style={{
                  color: activeSection === item.href.replace('#', '')
                    ? 'var(--primary)'
                    : 'var(--muted-foreground)',
                }}
              >
                {item.label}
                {activeSection === item.href.replace('#', '') && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'var(--primary)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/assets/Resume.pdf"
              download="Rahul_Natesan_Resume.pdf"
              className="hidden sm:flex items-center gap-2 kumar-badge rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{ color: 'var(--primary)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--foreground)',
                  transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                }}
              />
              <span
                className="w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--foreground)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--foreground)',
                  transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500"
        style={{
          background: 'rgba(10,9,6,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'scale(1)' : 'scale(1.05)',
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-3xl font-extrabold tracking-tight transition-all duration-300 hover:text-primary"
              style={{
                color: activeSection === item.href.replace('#', '')
                  ? 'var(--primary)'
                  : 'var(--foreground)',
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/assets/Resume.pdf"
            download="Rahul_Natesan_Resume.pdf"
            className="mt-4 kumar-badge rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2"
            style={{ color: 'var(--primary)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
