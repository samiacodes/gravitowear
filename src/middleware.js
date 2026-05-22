import { NextResponse } from "next/server";

// Edge-compatible JWT verification using standard Web Crypto API
async function verifyJWT(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Decode base64url safely in Edge
    const base64UrlDecode = (str) => {
      let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) base64 += "=";
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };

    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const signature = base64UrlDecode(signatureB64);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      data
    );

    if (!isValid) return null;

    const payloadJson = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);

    // Expiration check
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (err) {
    console.error("Middleware JWT verification error:", err);
    return null;
  }
}

export async function middleware(request) {
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;

  const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecretkeyforlocaldev123456!";

  // Check routes that require authentication
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/protected") || path.startsWith("/admin") || path.startsWith("/checkout") || path.startsWith("/dashboard")) {
    if (!token) {
      if (path.startsWith("/api/")) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }
      // Redirect to login page if web route
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyJWT(token, JWT_SECRET);
    if (!payload) {
      if (path.startsWith("/api/")) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        );
      }
      // Clear invalid token cookie and redirect
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }

    // Role authorization check (admin-only routes)
    if (path.startsWith("/admin") && payload.role !== "admin") {
      if (path.startsWith("/api/")) {
        return NextResponse.json(
          { message: "Forbidden" },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Add user info to headers to pass to API routes if needed
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/protected/:path*",
    "/admin/:path*",
    "/checkout/:path*",
    "/dashboard",
  ],
};
