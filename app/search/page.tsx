import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'RADAR // X5WARFARE',
};

// Next.js 15 yapısına uygun Promise tabanlı searchParams
export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const resolvedParams = await searchParams;
    const rawQuery = resolvedParams.q || '';

    // TÜRKÇE HARF DESTEKLİ NORMALİZASYON SİLAHIMIZ
    // Hem aranan kelimeyi hem de ürün başlıklarını aynı Türkçe formata sokar
    const normalize = (text: string) => {
        if (!text) return '';
        return text.toLocaleLowerCase('tr-TR');
    };

    const query = normalize(rawQuery);
    let products = [];
    let isSuccess = false;

    try {
        // Verileri çekiyoruz (Dinamik arama olduğu için cache tutmuyoruz)
        const res = await fetch('https://x5warfare-backend-production.up.railway.app/api/products', { cache: 'no-store' });
        const result = await res.json();

        if (result.success) {
            isSuccess = true;
            // Aranan kelimeyle eşleşenleri filtrele (Başlık, Marka veya Kategori içinde arar)
            products = result.data.filter((product: any) =>
                normalize(product.title).includes(query) ||
                normalize(product.brand).includes(query) ||
                normalize(product.category).includes(query)
            );
        }
    } catch (error) {
        console.error("Arama veritabanı bağlantı hatası:", error);
    }

    return (
        <main className="min-h-screen bg-pitch text-warfare-red pt-32 pb-20 px-6 md:px-12 lg:px-24">

            {/* BAŞLIK VE RADAR DURUMU */}
            <div className="flex flex-col gap-4 mb-16 border-b border-warfare-red/20 pb-8">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warfare-red rounded-full animate-pulse"></div>
                    <span className="text-[10px] tracking-[0.4em] font-mono opacity-50">DATABASE_RADAR_ACTIVE</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    SEARCH RESULTS
                </h1>

                <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-70">
                    QUERY: <span className="text-white">"{rawQuery.toUpperCase()}"</span> // MATCHES: <span className="text-white">{products.length}</span>
                </p>
            </div>

            {/* SONUÇLAR: BAŞARISIZ (ÜRÜN BULUNAMADI) */}
            {!isSuccess || products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                    <span className="text-6xl opacity-10">Ø</span>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-center">NO RECORDS FOUND</h2>
                    <p className="text-xs tracking-[0.3em] uppercase opacity-50 text-center max-w-md leading-relaxed">
                        The item "{rawQuery}" does not exist in our current classified archives. Please adjust your parameters and retry the radar.
                    </p>
                    <Link href="/categories" className="mt-8 text-[10px] border border-warfare-red px-8 py-3 tracking-[0.3em] uppercase hover:bg-warfare-red hover:text-pitch transition-all duration-500">
                        [ RETURN TO ARCHIVES ]
                    </Link>
                </div>
            ) : (
                /* SONUÇLAR: BAŞARILI (ÜRÜNLER LİSTELENİR) */
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
                    {products.map((product: any) => (
                        <Link
                            key={product._id}
                            href={`/product/${product._id}`}
                            className="group flex flex-col gap-4"
                        >
                            <div className="w-full aspect-[3/4] border border-warfare-red/10 overflow-hidden bg-pitch relative">
                                {product.images && product.images[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.title}
                                        fill
                                        priority={product.index === 0}

                                        /* NÜKLEER SEÇENEK: Next.js'in görseli bozmasını tamamen engeller */
                                        unoptimized={true}

                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-10">NO_IMG</div>
                                )}

                                {/* ID Etiketi */}
                                <div className="absolute top-4 left-4 bg-pitch/80 px-2 py-1 border border-warfare-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[8px] font-mono tracking-[0.3em] text-warfare-red uppercase">
                                        ID: {product._id.substring(0, 6)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center border-b border-warfare-red/20 pb-2">
                                    <span className="text-[10px] tracking-[0.4em] uppercase font-black">{product.brand}</span>
                                    <span className="text-[8px] tracking-widest opacity-50 uppercase">{product.category}</span>
                                </div>
                                <h2 className="text-sm tracking-widest uppercase opacity-80 mt-1 truncate">
                                    {product.title}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}