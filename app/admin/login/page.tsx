"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GhostTerminal() {
    const [passphrase, setPassphrase] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'AWAITING' | 'DENIED'>('IDLE');
    const router = useRouter();

    const handleAccess = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('AWAITING');

        // Az önce yazdığımız güvenlik motoruna şifreyi yolluyoruz
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passphrase })
        });

        if (res.ok) {
            // Şifre doğru, mühür basıldı. Control Room'a geçiş yap!
            router.push('/admin');
            router.refresh();
        } else {
            // Şifre yanlış, kırmızı alarm ver.
            setStatus('DENIED');
            setPassphrase('');
            setTimeout(() => setStatus('IDLE'), 2000); // 2 saniye sonra eski haline dön
        }
    };

    return (
        <main className="min-h-screen bg-pitch flex items-center justify-center font-serif selection:bg-warfare-red selection:text-pitch">
            <div className="w-full max-w-md flex flex-col gap-8 px-6">
                
                <div className="flex flex-col gap-2 text-center">
                    <span className="text-[10px] tracking-[0.5em] text-warfare-red opacity-50 font-bold uppercase">
                        RESTRICTED AREA
                    </span>
                    <div className="w-full h-[1px] bg-warfare-red/30 mt-2"></div>
                </div>

                <form onSubmit={handleAccess} className="flex flex-col gap-6">
                    <input 
                        type="password" 
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        autoFocus
                        placeholder="ENTER PASSPHRASE"
                        className="bg-transparent border-none outline-none text-center text-warfare-red text-xl tracking-[0.5em] uppercase placeholder-warfare-red/20 focus:ring-0"
                        autoComplete="off"
                    />
                    
                    {/* Durum Ekranı */}
                    <div className="h-4 text-center">
                        {status === 'DENIED' && (
                            <span className="text-[10px] tracking-widest text-warfare-red font-black uppercase">
                                ACCESS DENIED
                            </span>
                        )}
                        {status === 'AWAITING' && (
                            <span className="text-[10px] tracking-widest text-warfare-red/50 font-bold uppercase animate-pulse">
                                VERIFYING PROTOCOL...
                            </span>
                        )}
                    </div>
                </form>
                
            </div>
        </main>
    );
}