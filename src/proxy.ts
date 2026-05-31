import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16-д middleware → "proxy" болж нэршсэн (nodejs runtime).
// next-intl-ийн locale routing/redirect-ийг энд холбоно:
// locale-гүй замыг (/work) зөв хэл рүү (/en/work) чиглүүлнэ.
export default createMiddleware(routing);

export const config = {
  // api, _next, статик файл (өргөтгөлтэй) зэргээс бусад бүх замд ажиллана
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
