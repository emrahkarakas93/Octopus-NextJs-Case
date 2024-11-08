import './globals.css';
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Octopus',
  description: 'NextJS Case',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
