import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-г автоматаар зөв залгадаг navigation API-ууд.
// Эдгээрийг next/link, next/navigation-ийн оронд ашиглавал хэл хадгалагдана.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
