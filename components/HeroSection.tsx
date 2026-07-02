'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animations
    const elements = [nameRef.current, badgeRef.current, subtitleRef.current, ctaRef.current, statsRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = `opacity 1.2s cubic-bezier(0.25,1,0.5,1) ${i * 0.14}s, transform 1.2s cubic-bezier(0.25,1,0.5,1) ${i * 0.14}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150);
    });

    // Image entrance
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
      imageRef.current.style.transform = 'scale(0.92) translateY(20px)';
      setTimeout(() => {
        if (!imageRef.current) return;
        imageRef.current.style.transition = 'opacity 1.4s cubic-bezier(0.25,1,0.5,1), transform 1.4s cubic-bezier(0.25,1,0.5,1)';
        imageRef.current.style.opacity = '1';
        imageRef.current.style.transform = 'scale(1) translateY(0)';
      }, 200);
    }

    // Mouse parallax on bg
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Cinematic background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary" />
        <div ref={bgRef} className="absolute inset-0 transition-transform duration-700 ease-out" style={{ willChange: 'transform' }}>
          <div className="absolute rounded-full opacity-20" style={{ width: '70vw', height: '70vw', top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(200,150,90,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute rounded-full opacity-15" style={{ width: '50vw', height: '50vw', bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(200,150,90,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(to right, rgba(200,150,90,0.4) 1px, transparent 1px)', backgroundSize: '8.33% 100%' }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left column: name + text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Main name heading */}
            <div ref={nameRef} className="mb-6">
              <h1
                className="font-extrabold text-foreground leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', letterSpacing: '-0.04em' }}
              >
                RAHUL
                <br />
                <span className="serif font-normal text-muted-foreground" style={{ opacity: 0.65 }}>
                  Natesan.
                </span>
              </h1>
            </div>

            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-3 kumar-badge rounded-full px-5 py-2.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-gold" />
              <span className="section-label">CS Engineering · VIT Vellore · CGPA 8.86</span>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="mb-10 space-y-3 max-w-xl">
              <p className="text-muted-foreground text-sm uppercase tracking-[0.4em] font-semibold">
                Software Engineer · AI Builder
              </p>
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                Building scalable,{' '}
                <span className="shimmer-text font-bold">AI-powered systems</span>
                {' '}that solve real-world problems.
              </p>
            </div>

            {/* CTA Row */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12">
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-3 font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,150,90,0.4)]"
                style={{ background: 'var(--primary)', color: 'var(--background)' }}
              >
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollToContact}
                className="flex items-center gap-3 border text-foreground font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-500 hover:border-primary hover:text-primary"
                style={{ borderColor: 'rgba(200,150,90,0.3)' }}
              >
                Let&apos;s Connect
              </button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-12">
              {[
                { value: '8.86', label: 'CGPA' },
                { value: '4+', label: 'Major Projects' },
                { value: '3', label: 'Internships' },
                { value: '14+', label: 'Certifications' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-extrabold text-gradient-gold tracking-tight">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: photo only, clean */}
          <div ref={imageRef} className="flex-shrink-0 flex items-center justify-center relative">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(200,150,90,0.22) 0%, transparent 70%)', filter: 'blur(40px)', transform: 'scale(1.4)', zIndex: -1 }}
            />
            {/* Dashed orbit ring */}
            <div
              className="absolute rounded-full border pointer-events-none"
              style={{ borderColor: 'rgba(200,150,90,0.18)', borderStyle: 'dashed', top: '-8%', left: '-8%', width: '116%', height: '116%', animation: 'orbit-spin 14s linear infinite' }}
            />
            {/* Solid accent ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{ top: '-2%', left: '-2%', width: '104%', height: '104%', border: '1px solid rgba(200,150,90,0.08)' }}
            />
            {/* Photo */}
            <div
              className="relative overflow-hidden rounded-full border-2"
              style={{
                width: 'clamp(240px, 30vw, 400px)',
                height: 'clamp(240px, 30vw, 400px)',
                borderColor: 'rgba(200,150,90,0.45)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(200,150,90,0.14)',
              }}
            >
              <Image
                src="/assets/images/image-1782984440545.png"
                alt="Rahul Natesan — CS Engineering Student at VIT Vellore"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,9,6,0.45), transparent)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>

      <style jsx>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
