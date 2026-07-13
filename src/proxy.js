import { NextResponse } from "next/server";

const publicPaths = [
    "/login",
    "/recuperar-senha",
    "/autenticacao",
    "/nova-senha",
];

function getUsuarioPayload(token) {
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        return JSON.parse(decodedJson);
    } catch (error) {
        console.error("Erro ao decodificar o token JWT:", error);
        return null;
    }
}

export function proxy(request) {
    const token = request.cookies.get("jwt")?.value;
    const { pathname } = request.nextUrl;

    if (publicPaths.includes(pathname)) {
        if (token) {
            const usuario = getUsuarioPayload(token);
            const role = usuario?.role?.toLowerCase(); 
            
            if (role === "admin") {
                return NextResponse.redirect(new URL("/admin", request.url)); 
            }
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const usuario = getUsuarioPayload(token);
    const role = usuario?.role?.toLowerCase();

    if (pathname === "/") {
        if (role === "admin") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    if ((pathname.startsWith("/admin") || pathname.startsWith("/auditoria")) && role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/solicitacoes-compra") && role !== "comprador") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/criar-cr") && role !== "coordenador") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/coordenador")) {
        if (pathname.startsWith("/coordenador/analitico")) {
            if (role !== "coordenador" && role !== "supervisor") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } else if (role !== "coordenador") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
};