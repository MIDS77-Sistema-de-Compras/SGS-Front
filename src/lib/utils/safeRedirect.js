const DEFAULT_REDIRECT = "/";
const MAX_DECODE_PASSES = 5;
const UNSAFE_PATH_CHARACTERS = /[\\\u0000-\u001F\u007F]/;

function hasUnsafePath(pathname) {
    let decodedPath = pathname;

    for (let pass = 0; pass < MAX_DECODE_PASSES; pass += 1) {
        if (
            !decodedPath.startsWith("/") ||
            decodedPath.startsWith("//") ||
            UNSAFE_PATH_CHARACTERS.test(decodedPath)
        ) {
            return true;
        }

        try {
            const nextDecodedPath = decodeURIComponent(decodedPath);

            if (nextDecodedPath === decodedPath) {
                return false;
            }

            decodedPath = nextDecodedPath;
        } catch {
            return true;
        }
    }

    return true;
}

export function getSafeRedirect(destination) {
    if (
        typeof destination !== "string" ||
        !destination.startsWith("/") ||
        destination.startsWith("//") ||
        UNSAFE_PATH_CHARACTERS.test(destination)
    ) {
        return DEFAULT_REDIRECT;
    }

    const [pathname] = destination.split(/[?#]/, 1);

    if (hasUnsafePath(pathname)) {
        return DEFAULT_REDIRECT;
    }

    return destination;
}
