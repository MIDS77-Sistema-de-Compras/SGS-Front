import { NextResponse } from "next/server";

const publicPaths = [
    "/login",
    "/recuperar-senha",
    "/autenticacao",
    "/nova-senha",
];

export function proxy(request) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (publicPaths.includes(pathname)) {
        if (pathname === "/login" && token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    mcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
}