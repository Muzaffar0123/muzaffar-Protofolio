import CursorEffect from '../components/CursorEffect';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Muzaffar Ali | Software Engineer & Full Stack Developer',
  description: 'Portfolio of Muzaffar Ali, a software engineer and full stack developer based in Bhimber, AJK.',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}<CursorEffect /></body></html>; }
