import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// In rewrite method you pass a page folder name(as a string). which // you create to handle underConstraction  functionalty.
export function middleware(req: NextRequest, ev: NextFetchEvent) {
	// console.log('middleware here, mind yourself :D');
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/api/:path*', '/admin/:path*'],
};
