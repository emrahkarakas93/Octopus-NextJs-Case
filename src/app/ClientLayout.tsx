"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* login sayfasında header gizle */}
      {pathname !== '/login' && <Header />}
      <main>{children}</main>
    </>
  );
}
