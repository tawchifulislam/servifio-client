import type { Metadata } from 'next';
import { Inter, Fraunces, Hind_Siliguri } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});

const hindSiliguri = Hind_Siliguri({
  variable: '--font-hind-siliguri',
  subsets: ['bengali', 'latin'],
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  title: "Servifio - Someone's coming, not just anyone",
  description: 'Book vetted local service providers near you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${hindSiliguri.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
