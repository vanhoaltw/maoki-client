import { NextRequest } from "next/server";

const publicPages = ["/(.*)"];

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(`^(${publicPages.join("|")})?/?$`, "i");

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    /**
     * If user tries to access a PUBLIC route without being
     * authenticated, just do nothing and close middleware.
     */
    // return intlMiddleware(req);
  } else {
    /**
     * If user tries to access a PRIVATE route without being
     * authenticated, redirect them to the app sign-in page.
     */
    // return (authjsMiddleware as any)(req);
  }
}

export const config = {
  /**
   * Matcher entries are linked with logical "or", therefore
   * if one of them matches, the middleware will be invoked.
   *
   * Skips all paths where the middleware configuration will be ignored.
   * To improve i18n, every dot files was specified (e.g. favicon.ico).
   *
   * @see https://next-intl-docs.vercel.app/docs/routing/middleware#unable-to-find-locale
   */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
