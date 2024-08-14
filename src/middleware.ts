import type { NextRequest } from 'next/server'
import { localization } from './lib/i18n/middleware'

export function middleware(request: NextRequest) {
  return localization(request)
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  /*
   * Match all request paths except for the ones starting with:
   * - .swa (Azure Static Web Apps)
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*|favicon.ico|.swa).*)']
}
