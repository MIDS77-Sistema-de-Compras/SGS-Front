import { NextResponse } from "next/server";
import { getSafeRedirect } from "@/lib/utils/safeRedirect";

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
        if (!payloadBase64) return null;

        // base64url -> base64 padrão
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);

        const decodedJson = atob(padded);
        return JSON.parse(decodedJson);
    } catch (error) {
        console.error("Erro ao decodificar o token JWT:", error);
        return null;
    }
}

export function proxy(request) {
    const token = request.cookies.get("jwt")?.value;
    const { pathname, search } = request.nextUrl;

    if (publicPaths.includes(pathname)) {
        if (token) {
            const requestedDestination = request.nextUrl.searchParams.get("returnTo");
            const safeDestination = getSafeRedirect(requestedDestination);

            if (pathname === "/login" && requestedDestination && safeDestination !== "/") {
                return NextResponse.redirect(new URL(safeDestination, request.url));
            }

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
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("returnTo", `${pathname}${search}`);

        return NextResponse.redirect(loginUrl);
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
