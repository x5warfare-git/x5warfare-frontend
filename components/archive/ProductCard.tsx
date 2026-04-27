import Link from 'next/link';

interface ProductProps {
  product: {
    id: string;
    title: string;
    brand: string;
    image: string;
    format: 'tall' | 'square' | 'wide'; // Masonry grid'deki boyutunu belirleyecek
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Link href={`/product/${product.id}`} className="group relative flex flex-col gap-3 cursor-pointer">
      {/* Görsel Alanı */}
      <div className="relative w-full overflow-hidden bg-bone/5 rounded-tl-[2rem] rounded-br-[2rem]">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />
        {/* Lüks detay: Üzerine gelince beliren ince bir çerçeve veya kararma efekti */}
        <div className="absolute inset-0 bg-pitch/0 group-hover:bg-pitch/10 transition-colors duration-500"></div>
      </div>

      {/* Ürün Künyesi */}
      <div className="flex justify-between items-start text-bone mt-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-black">{product.brand}</span>
          <span className="text-xs tracking-wider opacity-70 mt-1">{product.title}</span>
        </div>
        {/* Şık bir ok işareti, detaylara yönlendirdiğini hissettirir */}
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          →
        </span>
      </div>
    </Link>
  );
}