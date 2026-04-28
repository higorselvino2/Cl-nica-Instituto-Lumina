import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Instituto Lumina Odontologia | Alto Padrão em Estética e Implantes',
  description: 'Referência em Odontologia Estética, Lentes de Contato Dental e Implantes. Atendimento exclusivo com foco em conforto e tecnologia 3D em Santo André - SP.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-lux-bg text-lux-text-p selection:bg-lux-accent/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
