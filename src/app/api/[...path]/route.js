const API_TARGET_URL = process.env.API_TARGET_URL || "https://sgs-back.onrender.com";

function buildTargetUrl(path, search) {
    const cleanBaseUrl = API_TARGET_URL.replace(/\/$/, "");
    const cleanPath = Array.isArray(path) ? path.join("/") : "";
    return `${cleanBaseUrl}/${cleanPath}${search}`;
}

function buildForwardHeaders(request) {
    const headers = new Headers(request.headers);

    headers.delete("host");
    headers.delete("connection");
    headers.delete("content-length");

    return headers;
}

async function proxyRequest(request, context) {
    const { path } = await context.params;
    const targetUrl = buildTargetUrl(path, new URL(request.url).search);
    const method = request.method;
    const hasBody = !["GET", "HEAD"].includes(method);

    const upstreamResponse = await fetch(targetUrl, {
        method,
        headers: buildForwardHeaders(request),
        body: hasBody ? await request.arrayBuffer() : undefined,
        redirect: "manual",
    });

    const responseHeaders = new Headers();
    const contentType = upstreamResponse.headers.get("content-type");

    if (contentType) {
        responseHeaders.set("content-type", contentType);
    }

    return new Response(await upstreamResponse.arrayBuffer(), {
        status: upstreamResponse.status,
        headers: responseHeaders,
    });
}

export async function GET(request, context) {
    return proxyRequest(request, context);
}

export async function POST(request, context) {
    return proxyRequest(request, context);
}

export async function PUT(request, context) {
    return proxyRequest(request, context);
}

export async function PATCH(request, context) {
    return proxyRequest(request, context);
}

export async function DELETE(request, context) {
    return proxyRequest(request, context);
}