'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'name' | 'bar' | 'exit'>('logo');

  useEffect(() => {
    // Phase 1: Logo appears
    const t1 = setTimeout(() => setPhase('name'), 600);
    // Phase 2: Name appears
    const t2 = setTimeout(() => setPhase('bar'), 1200);
    // Phase 3: Loading bar fills
    const t3 = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 18 + 4;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 700);
          }, 300);
        }
        setProgress(Math.min(p, 100));
      }, 80);
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'var(--background)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,150,90,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Logo / Photo */}
      <div
        style={{
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
          opacity: phase === 'logo' || phase === 'name' || phase === 'bar' ? 1 : 0,
          transform: phase === 'logo' ? 'scale(0.7) translateY(10px)' : 'scale(1) translateY(0)',
        }}
        className="mb-8 relative"
      >
        <div
          className="w-20 h-20 rounded-full overflow-hidden border-2"
          style={{ borderColor: 'rgba(200,150,90,0.5)', boxShadow: '0 0 40px rgba(200,150,90,0.25)' }}
        >
          <Image
            src="/assets/images/image-1782984440545.png"
            alt="Rahul Natesan"
            width={80}
            height={80}
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Orbiting ring */}
        <div
          className="absolute rounded-full border animate-spin"
          style={{
            borderColor: 'rgba(200,150,90,0.3)',
            borderTopColor: 'var(--primary)',
            top: '-15%',
            left: '-15%',
            width: '130%',
            height: '130%',
          }}
        />
      </div>

      {/* Name */}
      <div
        style={{
          transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.25,1,0.5,1)',
          opacity: phase === 'name' || phase === 'bar' ? 1 : 0,
          transform: phase === 'name' || phase === 'bar' ? 'translateY(0)' : 'translateY(10px)',
        }}
        className="text-center mb-10"
      >
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          RAHUL <span className="serif font-normal opacity-60 text-muted-foreground">Natesan</span>
        </h1>
        <p className="section-label mt-2">CS Engineer · VIT Vellore</p>
      </div>

      {/* Loading bar */}
      <div
        style={{
          transition: 'opacity 0.6s ease',
          opacity: phase === 'bar' ? 1 : 0,
          width: 'clamp(200px, 30vw, 320px)',
        }}
      >
        {/* Track */}
        <div
          className="rounded-full overflow-hidden"
          style={{
            height: '2px',
            background: 'rgba(200,150,90,0.15)',
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--accent))',
              transition: 'width 0.12s ease',
              boxShadow: '0 0 8px rgba(200,150,90,0.5)',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Loading</p>
          <p className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
