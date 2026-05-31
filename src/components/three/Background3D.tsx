"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

// Persistent canvas — бүх хэсгийн ард тогтмол байх 3D дэвсгэр (01-tech-stack#7).
// fixed + -z-10 тул контент үүний дээр уншигдана; pointer-events-none тул
// scroll/click саад болохгүй.
export default function Background3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas
        // Retina дээр 3× биш 2× хүртэл хязгаарлана (performance — 01-tech-stack#11)
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
