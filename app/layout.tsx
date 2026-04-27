import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import ScrollToTop from '../components/layout/ScrollToTop'; // Senin özel butonun korundu
import Footer from '../components/layout/Footer';

// X5WARFARE DİJİTAL KİMLİK KARTI (SEO & OPEN GRAPH)
export const metadata: Metadata = {
  metadataBase: new URL('https://x5warfare.com'), // Canlıya çıkınca burayı kendi alan adınla değiştir
  title: {
    template: '%s // X5WARFARE', // Alt sayfalarda otomatik çalışır (örn: OUTERWEAR // X5WARFARE)
    default: 'X5WARFARE // CLASSIFIED ARCHIVE', // Anasayfa başlığı
  },
  description: 'Sınıflandırılmış yüksek segment tech-wear ve taktiksel giyim arşivi. Yetkisiz erişim yasaktır.',
  keywords: ['tech-wear', 'avant-garde', 'taktiksel giyim', 'darkwear', 'x5warfare'],
  openGraph: {
    title: 'X5WARFARE // ARCHIVE',
    description: 'Gizli sektörleri ve koleksiyonları keşfedin.',
    url: '/',
    siteName: 'X5WARFARE',
    images: [
      {
        // WhatsApp ve Twitter'da link paylaşıldığında çıkacak o karanlık kapak fotoğrafı
        url: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1200&auto=format&fit=crop', 
        width: 1200,
        height: 630,
        alt: 'X5WARFARE Archive Terminal',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X5WARFARE // CLASSIFIED ARCHIVE',
    description: 'Sınıflandırılmış yüksek segment tech-wear arşivi.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      {/* SESSİZ LÜKS DOKUNUŞU: 
        bg-pitch ve text-warfare-red genel temayı kurar.
        selection sınıfları, fare ile metin seçildiğinde standart mavi yerine 
        kırmızı arka plan ve siyah yazı olmasını sağlar.
      */}
      <body className="bg-pitch text-warfare-red selection:bg-warfare-red selection:text-pitch antialiased overflow-x-hidden w-full">
        <Header />
        
        <main className="relative w-full">
          {children}
        </main>
        
        <ScrollToTop /> {/* Tüm sayfalarda çalışması için buraya ekledik */}

        <Footer /> 
      </body>
    </html>
  );
}