import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Eski "middleware" kelimesi yerine yeni standart olan "proxy" kullanıyoruz
export default function proxy(request: NextRequest) {
    
    // Sadece /admin ana sayfasına girmeye çalışanları denetle
    if (request.nextUrl.pathname === '/admin') {
        
        // Tarayıcıdaki hayalet mührü (cookie) kontrol et
        const token = request.cookies.get('x5_auth_token');

        // Mühür yoksa ziyaretçiyi karanlık terminale (login) fırlat
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin'],
};