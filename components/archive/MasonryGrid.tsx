import ProductCard from './ProductCard';

type FormatType = 'tall' | 'square' | 'wide';

// Gerçek veritabanımızdan gelecek olan veri yapısı
type Product = {
  _id: string; // MongoDB ID'leri her zaman _id olarak gelir
  title: string;
  brand: string;
  images: string[];
  format: FormatType;
};

// Fonksiyonumuzu "async" yaparak veritabanından veri çekebilmesini sağlıyoruz
export default async function MasonryGrid() {
  
  // API'ımızdan gerçek verileri çekiyoruz (cache: 'no-store' ile hep güncel kalmasını sağlıyoruz)
  // localhost yerine 127.0.0.1 yazıyoruz
  const res = await fetch('https://x5warfare-backend-production.up.railway.app/api/products', { cache: 'no-store' });
  const result = await res.json();
  const products: Product[] = result.data; // Buluttan gelen ürün listemiz!

  return (
    <section className="w-full min-h-screen px-6 md:px-12 lg:px-24 py-32 bg-pitch">
      
      <div className="flex justify-between items-end border-b border-bone/20 pb-8 mb-20">
        <h2 className="text-3xl md:text-5xl font-black tracking-widest text-bone">THE ARCHIVE</h2>
        <span className="text-xs tracking-widest text-muted cursor-pointer hover:text-bone transition-colors">
          FILTER [+]
        </span>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-12 lg:gap-24">
        {/* Artık sahte veri değil, buluttan gelen gerçek ürünleri dönüyoruz */}
        {products.map((product) => (
          <div key={product._id} className="break-inside-avoid mb-24 lg:mb-32">
            {/* ProductCard bileşenimizin istediği formata dönüştürerek veriyoruz */}
            <ProductCard product={{
              id: product._id,
              title: product.title,
              brand: product.brand,
              image: product.images[0], // İlk fotoğrafı kapak yapıyoruz
              format: product.format
            }} />
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-muted tracking-widest text-sm py-20">
          [ ARŞİV ŞU ANDA BOŞ ]
        </div>
      )}

      <div className="w-full flex justify-center mt-20">
        <button className="text-xs tracking-widest border-b border-bone pb-1 hover:opacity-50 transition-opacity text-bone">
          LOAD MORE
        </button>
      </div>

    </section>
  );
}