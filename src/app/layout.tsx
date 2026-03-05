import type { Metadata, Viewport } from 'next';
import { Outfit, Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Repuestos Luigi — Buscador de Repuestos para Motos | Charallave',
  description:
    'Encuentra repuestos para tu moto en Charallave. Bujías, filtros, cadenas, frenos y más. Precios en Bs y USD. Consulta disponibilidad por WhatsApp al instante.',
  keywords: ['repuestos motos', 'Charallave', 'Miranda', 'bujías', 'filtros moto', 'Venezuela'],
  openGraph: {
    title: 'Repuestos Luigi — Buscador de Repuestos',
    description: 'El catálogo digital de repuestos para motos en Charallave. Precios en Bs y USD actualizados.',
    type: 'website',
    locale: 'es_VE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

