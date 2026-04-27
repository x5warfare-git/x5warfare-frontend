// app/categories/[category]/page.tsx
import MasonryGrid from '@/components/archive/MasonryGrid'; // Mevcut bileşenini kullanıyoruz
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = (await params).category;
  
  // 3. Olası bir undefined durumuna karşı güvenlik kalkanı (Fallback)
  const categoryTitle = category ? category.toUpperCase() : 'COLLECTION';

  return {
    title: categoryTitle, // Sonuç: BOTTOMS // X5WARFARE
  };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  // Sadece ilgili kategoriyi çekiyoruz
  const res = await fetch(`http://127.0.0.1:5000/api/products?category=${category}`, { cache: 'no-store' });
  const result = await res.json();
  const products = result.data;

  return (
    <main className="min-h-screen bg-pitch text-warfare-red pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="mb-12 border-b border-warfare-red/30 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {category}
          </h1>
          <p className="text-sm mt-2 opacity-70 italic font-serif">Selected Archive Pieces</p>
        </div>
        
        {/* AKILLI GERİ DÖN BUTONU */}
        <Link 
          href="/categories" 
          className="group flex items-center justify-center border border-warfare-red hover:bg-warfare-red hover:text-pitch transition-all text-warfare-red"
        >
          {/* MASAÜSTÜ: Senin orijinal ayarlarınla metin görünür, mobilde gizlenir */}
          <span className="hidden md:block text-xs px-4 py-2 uppercase">
            [ Back to Collections ]
          </span>

          {/* MOBİL: Sadece ikon görünür, masaüstünde gizlenir */}
          <span className="md:hidden flex items-center justify-center p-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="20" y1="12" x2="4" y2="12"></line>
              <polyline points="10 18 4 12 10 6"></polyline>
            </svg>
          </span>
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((product: any) => (
            <Link key={product._id} href={`/product/${product._id}`} className="group block flex flex-col gap-4">

              {/* SABİT VİZÖR */}
              <div className="relative w-full aspect-[3/4] overflow-hidden border border-warfare-red/10 group-hover:border-warfare-red/40 transition-colors duration-500 bg-pitch">

                {/* BİRİNCİ FOTOĞRAF (Gizli Çizgiler Yok Edildi) */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className={`absolute inset-0 w-full h-full object-cover border-none outline-none shadow-none bg-transparent transition-opacity duration-700 ${product.images.length > 1 ? 'group-hover:opacity-0' : ''}`}
                />

                {/* İKİNCİ FOTOĞRAF (Eğer varsa) */}
                {product.images.length > 1 && (
                  <img
                    src={product.images[1]}
                    alt={`${product.title} alt`}
                    className="absolute inset-0 w-full h-full object-cover border-none outline-none shadow-none bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-105"
                  />
                )}

              </div>

              {/* ÜRÜN BİLGİLERİ */}
              <div className="flex flex-col gap-1 text-center">
                <span className="text-[9px] tracking-[0.2em] uppercase opacity-40 font-bold">{product.brand}</span>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-warfare-red leading-tight">
                  {product.title}
                </h3>
                <div className="w-4 h-[1px] bg-warfare-red/20 mx-auto mt-1"></div>
              </div>

            </Link>
          ))}
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center border border-dashed border-warfare-red/20 text-sm italic opacity-50">
          No items found in this sector yet.
        </div>
      )}
    </main>
  );
}