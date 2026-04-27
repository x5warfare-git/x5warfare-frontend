"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sayfa değiştiğinde terminali kapat
  useEffect(() => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setSearchQuery('');
  }, [pathname]);

  // ESC Tuşu Kontrolü
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // YENİ ARAMA MOTORU
  const executeSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  if (pathname.startsWith('/admin')) return null;
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* VİZÖR NAVİGASYON */}
      <nav className="fixed top-0 left-0 w-full z-[60] px-6 md:px-12 lg:px-24 py-4 md:py-6 pointer-events-none bg-pitch/70 backdrop-blur-md border-b border-warfare-red/10 transition-all duration-500">
        <div className="hidden md:flex justify-between items-center w-full pointer-events-auto">
          <Link href="/" className={`group flex items-center gap-4 text-xs font-black tracking-[0.4em] uppercase transition-all duration-500 ${isActive('/') ? 'text-warfare-red' : 'text-white/40 hover:text-white'}`}>
            <span className={`h-[1px] bg-current transition-all duration-700 ${isActive('/') ? 'w-12' : 'w-4 group-hover:w-12'}`}></span>
            [ ANASAYFA ]
          </Link>

          <div className="flex items-center gap-10">
            <button onClick={() => setIsSearchOpen(true)} className="group flex items-center gap-4 text-xs font-black tracking-[0.4em] uppercase text-white/40 hover:text-white transition-all duration-500">
              [ SEARCH ]
              <span className="h-[1px] w-4 group-hover:w-8 bg-current transition-all duration-700"></span>
            </button>
            <Link href="/categories" className={`group flex items-center gap-4 text-xs font-black tracking-[0.4em] uppercase transition-all duration-500 ${isActive('/categories') ? 'text-warfare-red' : 'text-white/40 hover:text-white'}`}>
              [ KOLEKSİYONLAR ]
              <span className={`h-[1px] bg-current transition-all duration-700 ${isActive('/categories') ? 'w-12' : 'w-4 group-hover:w-12'}`}></span>
            </Link>
          </div>
        </div>

        <div className="flex md:hidden w-full justify-between items-center pointer-events-auto">
          <Link href="/" className="text-xl font-black text-warfare-red tracking-widest">X5</Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[70] mix-blend-normal">
            <div className={`w-6 h-[2px] bg-warfare-red transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></div>
            <div className={`w-6 h-[2px] bg-warfare-red transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-[2px] bg-warfare-red transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* MOBİL MENÜ */}
      <div 
        onClick={() => setIsMobileMenuOpen(false)} 
        className={`fixed inset-0 z-[65] bg-pitch flex flex-col items-center justify-center transition-all duration-700 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-10 text-center relative z-10 w-full px-6 items-center">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 font-black tracking-[0.3em] uppercase transition-all duration-500 ${isActive('/') ? 'text-xl text-warfare-red' : 'text-xl text-white/30 hover:text-white'}`}
          >
            {isActive('/') && <span className="w-2 h-2 bg-warfare-red animate-pulse hidden sm:block"></span>}
            ANASAYFA
          </Link>
          
          <button 
            onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }} 
            className="flex items-center gap-3 text-xl font-black tracking-[0.3em] uppercase text-white/30 hover:text-white transition-all duration-500"
          >
            SEARCH
          </button>
          
          <Link 
            href="/categories" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 font-black tracking-[0.3em] uppercase transition-all duration-500 ${isActive('/categories') ? 'text-xl text-warfare-red' : 'text-xl text-white/30 hover:text-white'}`}
          >
            {isActive('/categories') && <span className="w-2 h-2 bg-warfare-red animate-pulse hidden sm:block"></span>}
            KOLEKSİYONLAR
          </Link>
        </div>
      </div>

      {/* ARAMA TERMİNALİ (Mobilde Tam Ortalandı, Klavye Boşluğu Eklendi) */}
      <div 
        onClick={() => setIsSearchOpen(false)} 
        // pt-32 iptal edildi. Yerine justify-center ve klavye payı için pb-24 md:pb-0 eklendi.
        className={`fixed inset-0 z-[80] bg-pitch/95 backdrop-blur-md flex flex-col items-center justify-center pb-24 md:pb-0 transition-all duration-700 ease-in-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl px-6 flex flex-col gap-4 relative">
          <span className="text-[10px] tracking-[0.5em] text-warfare-red/50 uppercase font-bold flex items-center gap-3">
            <div className="w-2 h-2 bg-warfare-red/50 animate-pulse"></div>
            QUERY_DATABASE // ENTER KEYWORD
          </span>
          <div className="relative flex items-center group">
            <span className="absolute left-0 text-3xl md:text-6xl text-warfare-red/30 select-none group-focus-within:text-warfare-red transition-colors duration-500">{'>'}</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={executeSearch}
              placeholder="SEARCH ARCHIVE" 
              className="w-full bg-transparent text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest text-white border-b border-warfare-red/20 focus:border-warfare-red focus:outline-none pl-12 md:pl-20 pb-4 placeholder:text-white/10 transition-colors duration-500 rounded-none"
              ref={input => input && isSearchOpen && input.focus()}
            />
          </div>
          <div className="flex justify-between items-center mt-2 border-t border-warfare-red/10 pt-4">
            <span className="text-[8px] tracking-[0.3em] text-warfare-red/30 uppercase hidden md:block">
              PRESS ENTER TO EXECUTE // ESC TO ABORT
            </span>
          </div>
        </div>
      </div>
    </>
  );
}