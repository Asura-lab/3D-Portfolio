import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl plugin — request тохиргооны замыг зааж өгнө (locale тутмын message ачаалал)
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Next 16: Turbopack default, тусдаа --turbopack флаг хэрэггүй.
  // Нэмэлт тохиргоог энд оруулна (жнь image remotePatterns) — одоохондоо хоосон.
};

export default withNextIntl(nextConfig);
