import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Lab from "@/components/sections/Lab";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

// Нэг хуудаст (one-page) portfolio — бүх хэсэг scroll-ийн нэг аян (02-design#2).
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
