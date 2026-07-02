'use client';

import React, { useEffect, useRef, useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setErrorMessage('Contact form is not configured yet. Please email directly.');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Contact from ${formState.name}`,
          from_name: 'Rahul Natesan Portfolio',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(200,150,90,0.08) 0%, transparent 70%)' }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={contentRef} className="reveal-up">

          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <p className="section-label">Get In Touch</p>
            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground leading-none">
              Let&apos;s Build
              <br />
              <span className="serif font-normal opacity-60 text-muted-foreground">Something.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Open to internship opportunities, collaborations, and interesting conversations about AI,
              software engineering, and building impactful products.
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="noise-card border-gradient rounded-2xl p-6">
                <p className="text-xs text-primary uppercase tracking-widest font-bold mb-2">Email</p>
                <a
                  href="mailto:rahul.natesan2023@vitstudent.ac.in"
                  className="text-xl font-bold text-foreground hover:text-primary transition-colors tracking-tight break-all"
                >
                  rahul.natesan2023@vitstudent.ac.in
                </a>
              </div>

              {/* Social links */}
              <div className="noise-card border-gradient rounded-2xl p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4">Find Me Online</p>
                <div className="space-y-3">
                  {[
                    {
                      label: 'GitHub',
                      handle: '@RahulNatesan',
                      href: 'https://github.com/RahulNatesan',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'LinkedIn',
                      handle: 'Rahul Natesan',
                      href: 'https://linkedin.com/in/Rahul-Natesan',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.998 23.227 23.998 22.271V1.729C23.998.774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'LeetCode',
                      handle: '@rahulnatesan',
                      href: 'https://leetcode.com/rahulnatesan',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center border border-border group-hover:border-primary transition-colors flex-shrink-0"
                        style={{ color: 'var(--primary)' }}
                      >
                        {social.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground uppercase tracking-widest">{social.label}</div>
                        <div className="text-xs text-muted-foreground">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(200,150,90,0.12), rgba(200,150,90,0.04))',
                  border: '1px solid rgba(200,150,90,0.25)',
                }}
              >
                <p className="serif italic text-xl text-foreground leading-relaxed">
                  &ldquo;I enjoy building scalable, real-world software that combines clean engineering with artificial intelligence.&rdquo;
                </p>
                <div className="mt-4 w-12 h-px bg-primary opacity-40" />
                <p className="text-xs text-muted-foreground mt-3 font-semibold uppercase tracking-widest">— Rahul Natesan</p>
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              {status === 'success' ? (
                <div className="noise-card border-gradient rounded-2xl p-10 text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(200,150,90,0.15)', border: '1px solid rgba(200,150,90,0.4)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-xs text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="noise-card border-gradient rounded-2xl p-8 space-y-6">

                  {/* Error banner */}
                  {status === 'error' && (
                    <div
                      className="flex items-start gap-3 rounded-xl p-4 text-sm"
                      style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)', color: '#f87171' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      disabled={status === 'loading'}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      disabled={status === 'loading'}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      disabled={status === 'loading'}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about the opportunity or project..."
                      className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none text-sm disabled:opacity-50"
                    />
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'var(--primary)', color: 'var(--background)' }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading') {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(200,150,90,0.3)';
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary)';
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>

                  {!process.env.NEXT_PUBLIC_WEB3FORMS_KEY && (
                    <p className="text-center text-xs text-muted-foreground opacity-60">
                      ⚠ Form not yet configured —{' '}
                      <a href="mailto:rahul.natesan2023@vitstudent.ac.in" className="underline underline-offset-4 hover:text-primary transition-colors">
                        email directly
                      </a>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
