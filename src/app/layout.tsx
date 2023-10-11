import './globals.css';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/navbar'; // Navbar 컴포넌트를 import

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <div className='sidebar1'>
          <Sidebar />
        </div>
        <div className='main'>{children}</div>
      </body>
    </html>
  );
}
