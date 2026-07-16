import { NextResponse } from "next/server";

const publicPaths = [
    "/login",
    "/recuperar-senha",
    "/autenticacao",
    "/nova-senha",
];

const routePermissions = [
    { path: "/admin", roles: ["admin"] },
    { path: "/auditoria", roles: ["admin"] },
    { path: "/usuarios", roles: ["admin", "supervisor", "coordenador"] },
    { path: "/solicitacoes-compra", roles: ["comprador"] },
    { path: "/criar-cr", roles: ["coordenador"] },
    { path: "/solicitacoes/gestao", roles: ["supervisor", "coordenador"] },
    { path: "/solicitacoes/criar", roles: ["docente", "supervisor", "coordenador"] },
    { path: "/solicitacoes", roles: ["docente", "supervisor", "coordenador"] },
    { path: "/analitico", roles: ["supervisor", "coordenador"] },
    { path: "/notificacoes", roles: ["docente", "admin", "comprador", "supervisor", "coordenador"] },
    { path: "/configuracoes", roles: ["docente", "admin", "comprador", "supervisor", "coordenador"] },
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
        return NextResponse.next();
    }

    const matchedRoute = routePermissions.find(r => pathname.startsWith(r.path));

    if (matchedRoute) {
        if (!matchedRoute.roles.includes(role)) {
            const fallbackUrl = role === "admin" ? "/admin" : "/";
            return NextResponse.redirect(new URL(fallbackUrl, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
};