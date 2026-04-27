import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const res = await fetch(`http://127.0.0.1:5000/api/products/${id}`);
    const result = await res.json();

    if (result.success) {
      return {
        title: result.data.title.toUpperCase(), // Ürün başlığı %s yerine geçer
      };
    }
  } catch (error) {
    return { title: 'PRODUCT NOT FOUND' };
  }

  return { title: 'PRODUCT' };
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {

  const resolvedParams = await params;
  const id = resolvedParams.id;

  const res = await fetch(`http://127.0.0.1:5000/api/products/${id}`, { cache: 'no-store' });
  const result = await res.json();

  if (!result.success) {
    return (
      <main className="min-h-screen bg-pitch text-warfare-red flex items-center justify-center flex-col gap-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">RECORD NOT FOUND</h1>
        <Link href="/categories" className="text-sm border-b border-warfare-red hover:opacity-50 transition-all uppercase">
          Return to Archive
        </Link>
      </main>
    );
  }

  const product = result.data;

  return (
    <main className="min-h-screen bg-pitch text-warfare-red pt-32 pb-20 px-6 md:px-12 lg:px-32">

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start justify-center">

        {/* SOL TARAF: Görsel Galerisi */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10 max-w-xl">
          {product.images.map((img: string, index: number) => (
            <div key={index} className="w-full aspect-[3/4] border border-warfare-red/10 overflow-hidden bg-pitch relative group">
              <Image
                src={img}
                alt={product.title}
                fill
                priority={index === 0}

                /* NÜKLEER SEÇENEK: Next.js'in görseli bozmasını tamamen engeller */
                unoptimized={true}

                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* GİZLİ ARŞİV NOTU (Stealth Mode):
                Arka plan ve çerçeve tamamen silindi. Yazı boyutu küçültüldü (text-[8px]).
                Normalde neredeyse görünmez (text-warfare-red/20), sadece fare ile fotoğrafın
                üzerine gelindiğinde karanlığın içinden hafifçe beliriyor (group-hover:text-warfare-red/50).
              */}
              <span className="absolute bottom-3 right-3 text-[8px] font-mono text-warfare-red/20 uppercase tracking-[0.4em] pointer-events-none group-hover:text-warfare-red/50 transition-colors duration-700 z-10 select-none">
                PH_0{index + 1}
              </span>

            </div>
          ))}
        </div>

        {/* SAĞ TARAF: Arşiv Raporu (Dossier) Görünümü */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex flex-col gap-12 max-w-md">

          {/* DOSYA KİMLİĞİ VE BAŞLIK */}
          <div className="flex flex-col gap-2 relative">
            <div className="text-[10px] tracking-[0.4em] font-mono opacity-50 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-warfare-red/50 animate-pulse"></div>
              DOC_ID: {product._id.substring(0, 8).toUpperCase()}
            </div>

            <h1 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">
              {product.brand}
            </h1>
            <h2 className="text-sm font-bold uppercase opacity-70 tracking-[0.3em] mt-2">
              {product.title}
            </h2>
          </div>

          {/* ARŞİV NOTLARI (Açıklama) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[9px] tracking-[0.4em] uppercase font-black text-warfare-red/50">ARCHIVE_NOTES</span>
              <div className="h-[1px] flex-1 bg-warfare-red/20"></div>
            </div>

            <p className="text-sm leading-relaxed opacity-80 text-justify">
              {product.description}
            </p>
          </div>

          {/* TEKNİK SPESİFİKASYONLAR (HUD Paneli) */}
          {product.details && product.details.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[9px] tracking-[0.4em] uppercase font-black text-warfare-red/50">TECH_SPECS</span>
                <div className="h-[1px] flex-1 bg-warfare-red/20"></div>
              </div>

              <div className="flex flex-col border border-warfare-red/20 bg-warfare-red/[0.02] p-5 gap-4">
                {product.details.map((detail: any, index: number) => (
                  <div key={index} className="flex justify-between items-end border-b border-warfare-red/10 pb-2 last:border-0 last:pb-0">
                    <span className="text-[10px] tracking-widest opacity-60 uppercase">{detail.label}</span>
                    <span className="text-xs font-black uppercase tracking-wider text-right">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAKTİKSEL KATEGORİ BUTONU */}
          <div className="pt-6 border-t border-warfare-red/20">
            <Link
              href={`/categories/${product.category}`}
              className="group flex items-center justify-between w-full px-6 py-4 border border-warfare-red bg-pitch hover:bg-warfare-red transition-all duration-500"
            >
              <span className="text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-pitch transition-colors">
                [ ACCESS SECTOR: {product.category} ]
              </span>
              <svg className="w-4 h-4 text-warfare-red group-hover:text-pitch transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}