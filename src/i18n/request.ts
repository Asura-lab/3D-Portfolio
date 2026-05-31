import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Хүсэлт бүрд locale-г тогтоож, тухайн хэлний орчуулгын JSON-г ачаална.
// Server Component-ууд энэ тохиргоог автоматаар уншина.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // Дэмжигдээгүй locale ирвэл default рүү унагана
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
