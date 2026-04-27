"use client"; // Next.js'te tarayıcı olayları (scroll) için bu şarttır

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 500px aşağı inildiğinde buton görünür olur
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-6 md:right-12 lg:right-24 z-40 p-4 border-warfare-red/50 text-warfare-red hover:bg-warfare-red hover:text-bone transition-all duration-500 rounded-tl-xl rounded-br-xl mix-blend-difference ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <span className="text-[10px] font-black tracking-widest leading-none">UP</span>
    </button>
  );
}