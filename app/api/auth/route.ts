import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { passphrase } = await request.json();
        // .env.local dosyasındaki şifreleri alıp virgüllerden ayırıyoruz
        const validPasswords = process.env.ADMIN_PASSPHRASES?.split(',') || [];

        if (validPasswords.includes(passphrase)) {
            // Şifre doğruysa HTTP-Only mühür basıyoruz
            const response = NextResponse.json({ success: true });
            
            response.cookies.set('x5_auth_token', 'ACCESS_GRANTED', {
                httpOnly: true, // Hackerlar JavaScript ile bu mührü çalamaz
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 24 saat geçerli
                path: '/',
            });

            return response;
        }

        // Şifre yanlışsa 401 (Yetkisiz) hatası dön
        return NextResponse.json({ success: false }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}