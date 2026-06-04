import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vedubox Start - KOBİ\'ler İçin Dijital Akademi',
  description: '5 dakikada şirket akademiniz hazır! Çalışan eğitimi, İSG, KVKK, oryantasyon ve hazır eğitimler.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>" />
      </head>
      <body className="antialiased min-h-screen bg-background text-on-background transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
