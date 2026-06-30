import { NextResponse } from "next/server";

const publicPaths = [
    "/login",
    "/recuperar-senha",
    "/autenticacao",
    "/nova-senha",
];

export function proxy(request) {
    const token = request.cookies.get("jwt")?.value ?? request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (publicPaths.includes(pathname)) {
        if (pathname === "/login" && token) {
            const usuario = getUsuarioPayload(token);
            
            if (usuario && usuario.role === "admin") {
                return NextResponse.redirect(new URL("/admin", request.url)); 
            }

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
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
};