import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import ProviderWrapper from './ProviderWrapper';
import { ReactNode } from 'react';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex app with Next.js'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProviderWrapper>
          <>{children}</>
        </ProviderWrapper>
      </body>
    </html>
  );
}
