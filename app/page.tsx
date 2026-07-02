'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoSection from '@/components/BentoSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <Navbar />
        <main>
          <HeroSection />
          <BentoSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <footer className="py-8 px-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            © {new Date().getFullYear()} Rahul Natesan · Built with Next.js
          </p>
        </footer>
      </div>
    </>
  );
}
