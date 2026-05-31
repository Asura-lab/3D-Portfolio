import { create } from "zustand";
import type Lenis from "lenis";

// Lenis instance-ийг апп даяар хуваалцах жижиг store (zustand — re-render багатай).
// SmoothScroll provider үүсгээд энд хадгална; nav холбоосууд эндээс аваад
// lenis.scrollTo(...)-оор "уусгалттай" дотоод гүйлгээ хийнэ.
type LenisState = {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
};

export const useLenisStore = create<LenisState>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}));
