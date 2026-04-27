import Link from 'next/link';

export default function HeroCanvas() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-pitch flex flex-col justify-center items-center">
      
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=2500&auto=format&fit=crop" 
          alt="X5WARFARE HERO" 
          className="object-cover w-full h-full grayscale opacity-30"
        />
      </div>

      {/* Tüm metinleri doğrudan warfare-red yaptık */}
      <div className="relative z-10 flex flex-col items-center gap-12 text-warfare-red">
        
        {/* Times New Roman ile kırmızı devasa başlık */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-none drop-shadow-[0_0_15px_rgba(255,0,0,0.0)]">
          X5WARFARE
        </h1>

        <Link 
          href="/categories" 
          className="px-8 py-4 border border-warfare-red hover:bg-warfare-red hover:text-pitch transition-all duration-500 text-sm tracking-widest font-bold uppercase backdrop-blur-sm"
        >
          ENTER THE ARCHIVE
        </Link>
        
      </div>
    </section>
  );
}