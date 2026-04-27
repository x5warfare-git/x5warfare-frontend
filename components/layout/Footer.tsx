"use client";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // HAYALET PROTOKOLÜ & HERO KORUMASI: 
  // Admin paneli veya doğrudan Anasayfa (/) ise footer render edilmez.
  if (pathname.startsWith('/admin') || pathname === '/') {
    return null;
  }

  return (
<footer className="w-full border-t border-warfare-red/20 bg-pitch py-6 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto">      
      {/* SOL KANAT */}
      <div className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-warfare-red/40">
        © 2026 X5WARFARE // ALL RIGHTS RESERVED
      </div>

      {/* SAĞ KANAT */}
      <div className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-warfare-red/20 flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <span>SYS.STATUS: ONLINE</span>
        <span className="hidden md:block opacity-50">|</span>
        <span>LOC: 41.0082° N, 28.9784° E</span>
      </div>

    </footer>
  );
}