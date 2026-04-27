import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="h-screen w-full bg-pitch flex flex-col items-center justify-center relative overflow-hidden text-warfare-red">
      
      {/* ARKA PLAN EFEKTİ (Sinyal Bozulması / Glitch Hissi) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center text-[20vw] font-black">
        404_ERR
      </div>

      {/* MERKEZ UYARI PANELİ */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Teknik Uyarı Işığı Animasyonu */}
        <div className="w-2 h-2 bg-warfare-red rounded-full animate-pulse mb-6 shadow-[0_0_15px_rgba(var(--warfare-red-rgb),0.8)]"></div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
          SECTOR NOT FOUND
        </h1>
        
        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-50 max-w-md leading-relaxed mb-12">
          The requested archive path is restricted or does not exist in our current database. 
          Please re-authenticate or return to the main terminal.
        </p>

        {/* GERİ DÖNÜŞ BUTONU */}
        <Link 
          href="/" 
          className="group relative px-8 py-3 border border-warfare-red overflow-hidden transition-all duration-500 hover:bg-warfare-red"
        >
          <span className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-pitch transition-colors duration-500">
            [ RETURN TO TERMINAL ]
          </span>
        </Link>
      </div>

      {/* ALT TEKNİK DETAY */}
      <div className="absolute bottom-8 text-[8px] tracking-[0.5em] opacity-20 uppercase">
        ENCRYPTION_KEY: NULL // ACCESS_DENIED
      </div>

    </main>
  );
}