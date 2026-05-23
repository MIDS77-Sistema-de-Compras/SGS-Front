import { NextResponse } from "next/server";

export function proxy(request){
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    if(pathname === '/login'){
        if(token){
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }
    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    

    if(!token && pathname !== '/login'){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if(token && pathname !== '/login'){
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
}