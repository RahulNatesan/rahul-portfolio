import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rahul Natesan — CS Engineer & AI Developer',
  description:
    'Portfolio of Rahul Natesan, a Computer Science Engineering student at VIT Vellore with a CGPA of 8.86. Specializing in AI, full-stack development, and scalable cloud systems.',
  keywords: ['Rahul Natesan', 'Portfolio', 'CS Engineer', 'AI Developer', 'VIT Vellore', 'Next.js', 'React'],
  authors: [{ name: 'Rahul Natesan' }],
  creator: 'Rahul Natesan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Rahul Natesan — CS Engineer & AI Developer',
    description: 'CS Engineering student at VIT Vellore. Building scalable, AI-powered software.',
    siteName: 'Rahul Natesan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Natesan — CS Engineer & AI Developer',
    description: 'CS Engineering student at VIT Vellore. Building scalable, AI-powered software.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
