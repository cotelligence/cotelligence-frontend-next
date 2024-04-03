import './globals.css';

import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Orbitron } from 'next/font/google';
import { ReactNode } from 'react';

import Footer from '@/lib/comps/footer';
import Header from '@/lib/comps/header';
import { Providers } from '@/lib/comps/providers';
import { APP_NAME } from '@/lib/constants';

const font = Orbitron({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_NAME,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html
      // className="dark"
      className={clsx(font.className, font.variable)}
      lang="en"
    >
      {/* set data-rk for matching rainbow kit style on popup */}
      <body data-rk="">
        <Providers className="grid grid-cols-1 grid-rows-[max-content,minmax(0,1fr),max-content] min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
