import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'THREAD | Editorial Marketplace for Independent Creators',
  description: 'The editorial marketplace for independent creators and high-concept streetwear. Small batches, handmade soul, raw aesthetics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} font-body bg-background-light text-slate-900 antialiased pt-[76px]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
