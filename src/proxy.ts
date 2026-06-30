import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Delte øktplaner skal være offentlig tilgjengelig uten innlogging.
  // Resten av appen (å sette opp treninger mm.) krever fortsatt pålogging.
  if (request.nextUrl.pathname === "/okt") {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (
        user === process.env.AUTH_USER &&
        pass === process.env.AUTH_PASS
      ) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Krever innlogging", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Treningsplanlegger"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
