"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// R3F нь client-only (WebGL/DOM шаардана) тул ssr:false-аар lazy load хийнэ.
// Энэ нь three.js-ийн томоохон bundle-ийг эхний ачаалалд оруулахгүй (01-tech-stack#2, #11).
const Background3D = dynamic(() => import("./Background3D"), { ssr: false });

// 3D-г хэзээ үзүүлэхийг шийднэ: prefers-reduced-motion бол ОГТ ачаалахгүй
// (accessibility + performance) — хэрэглэгч цэвэр static сайт авна.
export default function Background3DLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mobile/touch дээр 3D-г унтрааж performance хадгална (mobile fallback — 01-tech-stack#11).
    // Эдгээр төхөөрөмж дэвсгэрийн dark theme-ийг л харна (контент бүрэн ажиллана).
    const lite = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    setShow(!reduce && !lite);
  }, []);

  return show ? <Background3D /> : null;
}
