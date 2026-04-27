import Link from 'next/link';

export const metadata = {
  title: 'COLLECTIONS', // Bu değer, Layout'taki %s yerine geçer -> COLLECTIONS // X5WARFARE olur.
};

const CATEGORIES = [
    { id: 'outerwear', title: 'OUTERWEAR', image: 'https://images.unsplash.com/photo-1550614000-4b95d41b0b73?q=80&w=800&auto=format&fit=crop' },
    { id: 'tops', title: 'TOPS / TEES', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
    { id: 'bottoms', title: 'BOTTOMS', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
    { id: 'footwear', title: 'FOOTWEAR', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop' },
    { id: 'accessories', title: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800&auto=format&fit=crop' },
];

export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-pitch pt-32 pb-32 px-6 md:px-12 lg:px-24 font-serif">

            {/* Yazılar ve çizgiler doğrudan kırmızı */}
            <div className="mb-16 border-b border-warfare-red/30 pb-8 text-center text-warfare-red">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">COLLECTIONS</h1>
                <p className="text-sm tracking-[0.3em] mt-4 opacity-80 font-bold uppercase">CHOOSE A SECTOR TO EXPLORE</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-16 lg:gap-24 max-w-7xl mx-auto">
                {CATEGORIES.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/categories/${cat.id}`}
                        /* Mobilde köşeleri 50px'den 30px'e çektik ki çok keskin durmasın */
                        className="group relative w-full aspect-[3/4] overflow-hidden bg-warfare-red/5 border-none transition-colors duration-500"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000"
                        />

                        <div className="absolute inset-0 flex items-center justify-center p-2">
                            {/* Buton mobilde daha küçük (text-[9px]) ve daha az dolgulu (px-3 py-2) */}
                            <span className="bg-pitch/90 px-3 py-2 md:px-6 md:py-3 text-[9px] md:text-sm font-black tracking-[0.2em] md:tracking-widest uppercase border border-warfare-red text-warfare-red group-hover:bg-warfare-red group-hover:text-pitch transition-colors duration-500 text-center">
                                {cat.title}
                            </span>
                        </div>

                    </Link>
                ))}
            </div>

        </main>
    );
}