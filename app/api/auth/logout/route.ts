import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });
    
    // Tarayıcıdaki mührü (cookie) Max-Age: 0 diyerek anında imha ediyoruz
    response.cookies.set('x5_auth_token', '', {
        maxAge: 0,
        path: '/',
    });

    return response;
}