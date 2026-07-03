'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Experience {
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  highlights: string[];
  color: string;
  tech: string[];
}

interface Research {
  title: string;
  description: string;
  tags: string[];
}

const experiences: Experience[] = [
  {
    role: 'Software Engineering Intern',
    company: 'Apexon (Infostretch Corporation India Pvt. Ltd.)',
    location: 'Hyderabad, India',
    type: 'Internship',
    period: 'May 2026 – Jul 2026',
    highlights: [
      'Architected cloud-native real-time stock market analytics system on AWS using 6 Lambda functions, SQS, EventBridge, API Gateway WebSockets, RDS MySQL, and S3',
      'Engineered fully serverless ingestion-to-dashboard pipeline generating 7,000+ database ops/day across 9 NSE stocks',
      'Developed WebSocket broadcasting layer with sub-second delivery latency and deployed React + TypeScript dashboard on S3',
    ],
    tech: ['AWS Lambda', 'Amazon SQS', 'EventBridge', 'API Gateway', 'RDS MySQL', 'S3', 'React', 'TypeScript'],
    color: '#C8965A',
  },
  {
    role: 'Software Developer Intern',
    company: 'KuppiSmart Solutions',
    location: 'Remote',
    type: 'Internship',
    period: 'May 2025 – Jul 2025',
    highlights: [
      'Built 10+ responsive pages and a reusable component library using React.js and Tailwind CSS; reduced layout shift by 30%',
      'Integrated Razorpay payment gateway via secure REST APIs serving 500+ transactions across 2-week agile sprints',
      'Automated CI/CD pipeline using GitHub Actions; cut manual release time by 40% across a 5-member engineering team',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Razorpay', 'REST APIs', 'GitHub Actions', 'CI/CD'],
    color: '#E8B87A',
  },
  {
    role: 'Data Science Intern',
    company: 'Teachnook in association with IIT Roorkee',
    location: 'Remote',
    type: 'Internship',
    period: 'June 2024',
    highlights: [
      'Data preprocessing and feature engineering in Python for ML model development',
      'Built and evaluated ML classification models achieving strong predictive accuracy',
      'Delivered data analysis reports and visualizations for stakeholders',
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Data Analysis', 'ML'],
    color: '#B87D3A',
  },
];

const research: Research[] = [
  {
    title: 'AI in Sports & Training',
    description: 'Survey analysis on AI applications in Cricket, Football, and F1. Statistical interpretation with data visualization.',
    tags: ['AI', 'Sports Analytics', 'Survey Research'],
  },
  {
    title: 'Healthcare AI — Limb Disorders',
    description: 'Intelligent monitoring systems for lower limb rehabilitation using AI. Focused on medical applications and real-time tracking.',
    tags: ['Healthcare AI', 'Rehabilitation', 'Monitoring Systems'],
  },
  {
    title: 'ML-Augmented Dynamic Programming',
    description: "ML enhancements to Dijkstra's algorithm using K-ary Heap optimization for tactical decision systems.",
    tags: ['ML', 'Algorithms', 'Optimization', 'Graph Theory'],
  },
];

const certifications = [
  { name: 'AI Agents & Agentic AI', issuer: 'Vanderbilt University via Coursera', date: 'Jul 2025' },
  { name: 'Python Essentials 1 & 2', issuer: 'Cisco Networking Academy', date: 'Jul 2025' },
  { name: 'Data Science', issuer: 'Teachnook / IIT Roorkee', date: 'Jun 2024' },
  { name: 'MySQL', issuer: 'Self-certified', date: 'Apr 2024' },
];

function TrajectoryLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateMeasurements = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHeight(rect.height);
      
      const windowHeight = window.innerHeight;
      const scrollDistance = rect.height + windowHeight / 2;
      const scrolled = windowHeight - rect.top;
      
      let ratio = scrolled / scrollDistance;
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      
      setProgress(ratio);
    }
  }, []);

  useEffect(() => {
    updateMeasurements();
    window.addEventListener('scroll', updateMeasurements, { passive: true });
    window.addEventListener('resize', updateMeasurements);
    
    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(() => updateMeasurements());
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', updateMeasurements);
      window.removeEventListener('resize', updateMeasurements);
      if (observer) observer.disconnect();
    };
  }, [updateMeasurements]);

  const startY = 20;
  const endY = Math.max(startY, height - 20); // avoid negative length
  const lineLength = endY - startY;
  const offset = lineLength * (1 - progress);

  return (
    <div ref={containerRef} className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
      <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1={startY} x2="24" y2={endY} stroke="rgba(200,150,90,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />
        <line x1="24" y1={startY} x2="24" y2={endY} stroke="url(#trajectoryGrad)" strokeWidth="2" strokeLinecap="round"
          style={{ strokeDasharray: lineLength, strokeDashoffset: isNaN(offset) ? 0 : offset, transition: 'stroke-dashoffset 0.1s ease-out' }} />
        
        <circle cx="24" cy={endY} r="4" fill="var(--primary)" style={{ opacity: progress > 0.95 ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <circle cx="24" cy={endY} r="8" fill="none" stroke="var(--primary)" strokeWidth="1" style={{ opacity: progress > 0.95 ? 0.4 : 0, transition: 'opacity 0.3s ease' }} />
        <circle cx="24" cy={startY} r="3" fill="var(--primary)" opacity={progress > 0 ? 0.8 : 0.2} style={{ transition: 'opacity 0.3s ease' }} />
        
        <defs>
          <linearGradient id="trajectoryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8965A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E8B87A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C8965A" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function InternshipCard({ exp, index, revealed }: { exp: Experience; index: number; revealed: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="noise-card border-gradient rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${index * 0.2}s`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateX(0)' : 'translateX(-30px)',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: exp.color }}>{exp.type}</span>
              <span className="text-xs text-muted-foreground font-semibold border border-border rounded-full px-2.5 py-0.5 ml-auto">{exp.period}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">{exp.role}</h3>
            <p className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{exp.location}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-300"
            style={{ borderColor: expanded ? exp.color : undefined, background: expanded ? `${exp.color}15` : undefined }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ color: expanded ? exp.color : 'var(--muted-foreground)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.25,1,0.5,1), color 0.3s ease' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {exp.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded border font-medium"
              style={{ borderColor: `${exp.color}30`, color: exp.color, background: `${exp.color}08` }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ maxHeight: expanded ? '400px' : '0px', overflow: 'hidden', transition: 'max-height 0.6s cubic-bezier(0.25,1,0.5,1)' }}>
        <div className="px-6 pb-6 pt-0" style={{ borderTop: `1px solid ${exp.color}20` }}>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3 pt-4">Key Contributions</p>
          <ul className="space-y-2.5">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" style={{ color: exp.color }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const internshipRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const [internshipsRevealed, setInternshipsRevealed] = useState(false);
  const [rightRevealed, setRightRevealed] = useState(false);
  const [researchRevealed, setResearchRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === internshipRef.current) setInternshipsRevealed(true);
            if (entry.target === rightRef.current) setRightRevealed(true);
            if (entry.target === researchRef.current) setResearchRevealed(true);
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08 }
    );
    [internshipRef.current, rightRef.current, researchRef.current].forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-4 reveal-up"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
          ref={(el) => {
            if (el) {
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                  el.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.25,1,0.5,1)';
                  el.style.opacity = '1'; el.style.transform = 'translateY(0)';
                  obs.disconnect();
                }
              }, { threshold: 0.1 });
              obs.observe(el);
            }
          }}
        >
          <p className="section-label">Experience & Research</p>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-none">
            Real World<br />
            <span className="serif font-normal text-muted-foreground opacity-60">Impact.</span>
          </h2>
        </div>

        {/* Internships */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Internship Experience</p>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(200,150,90,0.3), transparent)' }} />
            <span className="text-xs font-bold text-primary">3 Roles</span>
          </div>
          <div ref={internshipRef} className="relative">
            <TrajectoryLine />
            <div className="lg:pl-16 space-y-4">
              {experiences.map((exp, idx) => (
                <InternshipCard key={exp.company} exp={exp} index={idx} revealed={internshipsRevealed} />
              ))}
            </div>
          </div>
        </div>

        {/* Education + DSA + Certifications */}
        <div ref={rightRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20"
          style={{ transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.25,1,0.5,1)', opacity: rightRevealed ? 1 : 0, transform: rightRevealed ? 'translateY(0)' : 'translateY(30px)' }}>
          {/* VIT Card */}
          <div className="noise-card border-gradient rounded-2xl p-6 relative overflow-hidden lg:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--primary), transparent)', transform: 'translate(30%, -30%)', filter: 'blur(20px)' }} />
            <div className="relative z-10">
              <div className="kumar-badge inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-gold" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Currently Enrolled</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">VIT Vellore</h3>
              <p className="text-sm text-muted-foreground mb-1">B.Tech Computer Science Engineering</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed opacity-70">DSA · OOP · Design Patterns · OS · CN · DBMS · AI · Cloud Architecture</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-gradient-gold">8.86</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">CGPA</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">Jul 2023 – Aug 2027</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Expected Graduation</div>
                </div>
              </div>
            </div>
          </div>

          {/* DSA Journey */}
          <div className="noise-card border-gradient rounded-2xl p-6 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-sm font-bold text-foreground">Skills</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Languages</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Java', 'Python', 'C++', 'JavaScript', 'SQL'].map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Frameworks</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Node.js', 'Spring Boot', 'FastAPI', 'Express.js'].map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Cloud & DevOps</p>
                <div className="flex flex-wrap gap-1.5">
                  {['AWS Lambda', 'S3', 'RDS', 'Docker', 'GitHub Actions'].map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="noise-card border-gradient rounded-2xl p-5 lg:col-span-1">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Certifications</p>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 opacity-70" />
                  <div>
                    <p className="text-xs font-bold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Languages: <span className="text-foreground font-medium">English · Hindi · Tamil · Marathi · German (A2)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Research */}
        <div ref={researchRef}
          style={{ transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.25,1,0.5,1)', opacity: researchRevealed ? 1 : 0, transform: researchRevealed ? 'translateY(0)' : 'translateY(30px)' }}>
          <div className="flex items-center gap-4 mb-8">
            <p className="section-label">Research</p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {research.map((r, idx) => (
              <div key={r.title} className="noise-card border-gradient rounded-2xl p-6 group"
                style={{ transition: `opacity 0.7s ease ${idx * 0.15}s, transform 0.7s cubic-bezier(0.25,1,0.5,1) ${idx * 0.15}s`, opacity: researchRevealed ? 1 : 0, transform: researchRevealed ? 'translateY(0)' : 'translateY(20px)' }}>
                <span className="serif italic text-4xl font-normal opacity-10 text-primary block mb-4">0{idx + 1}</span>
                <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
