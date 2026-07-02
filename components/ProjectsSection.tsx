'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlights: string[];
  github?: string;
  live?: string;
  accent: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Real-Time Stock Market Analytics Platform',
    subtitle: 'AWS · Serverless · React · TypeScript',
    description:
      'Cloud-native analytics system using 6 AWS Lambda functions, Amazon SQS, EventBridge, API Gateway WebSockets, RDS MySQL, and S3 — processing live NSE data every minute across 9 stocks.',
    tags: ['AWS Lambda', 'SQS', 'EventBridge', 'React', 'TypeScript', 'WebSockets', 'RDS MySQL'],
    highlights: [
      'Engineered event-driven pipeline generating 7,000+ DB ops/day',
      'Sub-second WebSocket broadcasting with live KPI visualization',
      'Deployed React + TypeScript dashboard on S3 with live candlestick analytics',
    ],
    github: 'https://github.com/RahulNatesan',
    accent: '#C8965A',
    featured: true,
  },
  {
    title: 'AgriConnect Platform',
    subtitle: 'Java Spring Boot · React.js · Microservices',
    description:
      'Scalable RESTful microservices backend using Java Spring Boot with OOAD and Design Patterns for enterprise-grade maintainability. Integrated real-time data feeds and chatbot support for farmers.',
    tags: ['Java', 'Spring Boot', 'React.js', 'Tailwind CSS', 'Microservices', 'REST API'],
    highlights: [
      'Built scalable microservices with OOAD & Design Patterns',
      'Real-time data feeds and chatbot for farmer decision-making',
      'Enterprise-grade maintainability through structured architecture',
    ],
    github: 'https://github.com/RahulNatesan',
    accent: '#E8B87A',
    featured: true,
  },
  {
    title: 'AI Disease Prediction System',
    subtitle: 'Machine Learning · Flask · REST API',
    description:
      'Symptom-based diagnostic system using supervised Machine Learning (ExtraTrees, Naive Bayes, KNN, Neural Networks); achieved 95% accuracy through feature selection and hyperparameter tuning.',
    tags: ['Python', 'Flask', 'Scikit-learn', 'TensorFlow', 'Pandas', 'REST API'],
    highlights: [
      '95% accuracy with ExtraTrees + Neural Networks ensemble',
      'Deployed as Flask REST API with full unit test suite',
      'Feature selection and hyperparameter tuning pipeline',
    ],
    github: 'https://github.com/RahulNatesan',
    accent: '#B87D3A',
  },
  {
    title: 'KuppiSmart — Production SaaS',
    subtitle: 'React.js · Razorpay · GitHub Actions · CI/CD',
    description:
      'Built 10+ responsive pages and a reusable component library. Integrated Razorpay payment gateway serving 500+ transactions, with full CI/CD automation cutting release time by 40%.',
    tags: ['React.js', 'Tailwind CSS', 'Razorpay', 'GitHub Actions', 'CI/CD', 'REST APIs'],
    highlights: [
      'Razorpay integration with 500+ transactions monitored',
      'CI/CD pipeline reduced manual release time by 40%',
      'Reduced layout shift 30% via optimized render paths',
    ],
    github: 'https://github.com/RahulNatesan',
    accent: '#D4A86A',
  },
];

function ProjectCard({ project, index, revealed }: { project: Project; index: number; revealed: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="noise-card border-gradient rounded-2xl overflow-hidden group relative"
      style={{
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${index * 0.15}s`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(40px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.accent}15 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 0.8 : 0.3,
        }}
      />

      <div className="p-6 md:p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            {project.featured && (
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-3 text-xs font-bold uppercase tracking-widest"
                style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30`, color: project.accent }}
              >
                <span className="w-1 h-1 rounded-full" style={{ background: project.accent }} />
                Featured
              </div>
            )}
            <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-1">{project.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:border-primary hover:text-primary text-muted-foreground"
                aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        <ul className="space-y-1.5 mb-5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" style={{ color: project.accent }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded border font-medium"
              style={{ borderColor: `${project.accent}25`, color: project.accent, background: `${project.accent}08` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-4 reveal-up"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
          ref={(el) => {
            if (el) {
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                  el.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.25,1,0.5,1)';
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                  obs.disconnect();
                }
              }, { threshold: 0.1 });
              obs.observe(el);
            }
          }}
        >
          <p className="section-label">Selected Work</p>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-none">
            Things I&apos;ve
            <br />
            <span className="serif font-normal text-muted-foreground opacity-60">Built.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            From AWS serverless architectures to ML-powered diagnostics — each project is built with real-world impact, clean engineering, and scalability in mind.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} revealed={revealed} />
          ))}
        </div>

        <div className="mt-12 text-center"
          style={{ transition: 'opacity 0.9s ease 0.6s', opacity: revealed ? 1 : 0 }}>
          <a href="https://github.com/RahulNatesan" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-border rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            style={{ borderColor: 'rgba(200,150,90,0.2)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
