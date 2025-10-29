import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  
  // ========================================
  // GESTION DES TRAILING SLASHES
  // ========================================
  // Rediriger /page/ vers /page SEULEMENT pour certaines pages statiques
  // Ne PAS toucher aux pages dynamiques comme /strasbourg/* qui ont des sous-routes
  const staticPages = ['/mentions-legales', '/cgv', '/politique-confidentialite', '/cgu'];
  
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const pathWithoutSlash = url.pathname.slice(0, -1);
    
    // Seulement rediriger si c'est une page statique connue
    if (staticPages.includes(pathWithoutSlash)) {
      return NextResponse.redirect(new URL(pathWithoutSlash + url.search, request.url), 301);
    }
  }
  
  // ========================================
  // HEADERS DE SÉCURITÉ
  // ========================================
  const response = NextResponse.next();
  
  // Headers CSP identiques à moverz-fr
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://movers-test.gslv.cloud https://*.gslv.cloud; frame-src 'self' https://movers-test.gslv.cloud https://*.gslv.cloud;");
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // PRODUCTION: Permettre l'indexation
  // response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive, nocache');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
