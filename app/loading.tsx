// app/loading.tsx dosyanın güncel hali:
export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] bg-pitch flex flex-col items-center justify-center text-warfare-red overflow-hidden">
      
      <div className="flex flex-col items-center gap-8">
        {/* RADAR / TARAMA ANİMASYONU */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border border-warfare-red/20 rotate-45"></div>
          <div className="absolute w-8 h-8 bg-warfare-red/10 border border-warfare-red/50 rotate-45 animate-ping"></div>
          <div className="w-2 h-2 bg-warfare-red rounded-full"></div>
        </div>

        {/* METİN KISMI */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[10px] md:text-xs font-black tracking-[0.5em] uppercase">
            DECRYPTING ARCHIVE
          </h2>
          
          <div className="w-48 h-[1px] bg-warfare-red/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-warfare-red animate-[slideRight_1.5s_ease-in-out_infinite]"></div>
          </div>
          
          <p className="text-[8px] tracking-[0.3em] uppercase opacity-40 mt-1">
            ESTABLISHING SECURE CONNECTION...
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideRight {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}} />
      
    </main>
  );
}