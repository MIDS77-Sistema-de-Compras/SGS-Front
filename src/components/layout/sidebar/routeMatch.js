const ROUTE_ALIASES = {
    "/usuarios/gerenciar": ["/usuarios/criar", "/usuarios/editar"],
};

export function isRouteActive(pathname, href, allHrefs = []) {
    if (!pathname || !href) return false;

    if (pathname === href) return true;

    if (href === "/") return false;

    const aliases = ROUTE_ALIASES[href] || [];
    if (aliases.some((alias) => pathname === alias || pathname.startsWith(`${alias}/`))) {
        return true;
    }

    if (!pathname.startsWith(`${href}/`)) return false;

    const hasMoreSpecificMatch = allHrefs.some(
        (other) =>
            other !== href &&
            other.startsWith(`${href}/`) &&
            (pathname === other || pathname.startsWith(`${other}/`))
    );

    return !hasMoreSpecificMatch;
}