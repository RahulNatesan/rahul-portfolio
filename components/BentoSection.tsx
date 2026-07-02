'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const MagicBento = dynamic(() => import('./MagicBento'), { ssr: false });

export default function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className="mb-12 space-y-3"
          style={{
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.25,1,0.5,1)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <p className="section-label">Skills &amp; Highlights</p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-none">
            What I bring
            <br />
            <span className="serif font-normal text-muted-foreground opacity-60">to the table.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div
          style={{
            transition: 'opacity 1s ease 0.2s, transform 1s cubic-bezier(0.25,1,0.5,1) 0.2s',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={10}
            glowColor="200, 150, 90"
            disableAnimations={false}
          />
        </div>
      </div>
    </section>
  );
}
