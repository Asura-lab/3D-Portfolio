"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const { damp, lerp, clamp } = THREE.MathUtils;

function getScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
}

// --- Хэсэг бүрийн "уур амьсгал" — scroll-оор уусах өнгөний палитр ---
const PALETTE = [
  new THREE.Color("#5eead4"), // Hero — mint
  new THREE.Color("#6d8bff"), // About/Work — хөх
  new THREE.Color("#a78bfa"), // Skills — ягаан-нил
  new THREE.Color("#f3a05c"), // Lab — амбер
  new THREE.Color("#5eead4"), // Contact — mint
];
function colorAt(p: number, out: THREE.Color) {
  const n = PALETTE.length - 1;
  const f = clamp(p, 0, 1) * n;
  const i = Math.min(Math.floor(f), n - 1);
  return out.copy(PALETTE[i]).lerp(PALETTE[i + 1], f - i);
}

// === "Гарын үсэг" GLSL backdrop — нарийн хөдөлгөөнт accent gradient + grain ===
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const FRAG = /* glsl */ `
  uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    vec2 c = vUv - 0.5;
    float d = length(c);
    float glow = smoothstep(0.8, 0.0, d) * 0.07;
    float wave = (0.5 + 0.5 * sin(vUv.x * 9.0 - uTime * 0.25)) * (1.0 - vUv.y) * 0.05;
    float grain = (hash(vUv + uTime) - 0.5) * 0.03;
    float a = clamp(glow + wave + grain, 0.0, 0.55);
    gl_FragColor = vec4(uColor, a);
  }
`;
function Backdrop() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#5eead4") },
  }).current;
  useFrame((_, delta) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += delta;
    colorAt(getScrollProgress(), mat.current.uniforms.uColor.value);
  });
  return (
    <mesh position={[0, 0, -7]}>
      <planeGeometry args={[44, 26]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// === Нисдэг 3D хэлтэрхийнүүд (instanced — олон, гэхдээ хямд) ===
function Shards({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Color(), []);
  const data = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.random() - 0.5) * 18,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 9 - 3,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        spd: 0.1 + Math.random() * 0.35,
        scl: 0.04 + Math.random() * 0.16,
        ph: i,
      })),
    [count],
  );

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const p = getScrollProgress();
    for (let i = 0; i < count; i++) {
      const d = data[i];
      // scroll-оор дээш парраллакс, цаг хугацаагаар хөвж/эргэлдэнэ
      const yy = ((d.y - p * 6 + 6) % 12) - 6 + Math.sin(t * d.spd + d.ph) * 0.3;
      dummy.position.set(d.x, yy, d.z);
      dummy.rotation.set(d.rx + t * d.spd, d.ry + t * d.spd * 0.7, 0);
      dummy.scale.setScalar(d.scl);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    if (mat.current) {
      colorAt(p, tmp);
      mat.current.color.copy(tmp);
      mat.current.emissive.copy(tmp);
    }
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count] as unknown as [THREE.BufferGeometry, THREE.Material, number]}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        ref={mat}
        color="#5eead4"
        emissive="#5eead4"
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.3}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

// === Scroll-д уясан camera аялал + cursor parallax ===
function CameraRig() {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  useFrame((_, delta) => {
    const p = getScrollProgress();
    // Зөөлөн dolly + бага зэрэг өнцөг + cursor parallax (робот байрлалыг эвдэхгүй хэмжээнд)
    const tx = Math.sin(p * Math.PI) * 0.5 + pointer.current.x * 0.25;
    const ty = -p * 0.7 + pointer.current.y * 0.2;
    const tz = 5 + p * 1.2;
    camera.position.x = damp(camera.position.x, tx, 2.5, delta);
    camera.position.y = damp(camera.position.y, ty, 2.5, delta);
    camera.position.z = damp(camera.position.z, tz, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// === Signature робот — кодоор, scroll-оор дохио зангаа + өнгө морф ===
function RobotCharacter() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const rArm = useRef<THREE.Group>(null);
  const lArm = useRef<THREE.Group>(null);
  const visor = useRef<THREE.MeshStandardMaterial>(null);
  const chest = useRef<THREE.MeshStandardMaterial>(null);
  const tip = useRef<THREE.MeshStandardMaterial>(null);
  const pose = useRef({ rZ: 0.12, rX: 0, lZ: -0.12, lX: 0, hT: 0 });
  const tmp = useRef(new THREE.Color()).current;

  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = getScrollProgress();
    const t = state.clock.elapsedTime;

    g.rotation.y = damp(g.rotation.y, pointer.current.x * 0.4, 4, delta);
    g.rotation.x = damp(g.rotation.x, pointer.current.y * 0.25, 4, delta);

    const rec = clamp(p * 2, 0, 1);
    g.scale.setScalar(lerp(1.15, 0.66, rec));
    g.position.x = lerp(1.5, 1.95, rec);
    g.position.y = lerp(0, -0.4, rec) + Math.sin(t * 1.1) * 0.06;

    let rZ = 0.12,
      rX = 0,
      lZ = -0.12,
      lX = 0,
      hT = 0;
    let gesture: "waveR" | "point" | "excited" | "" = "";
    if (p < 0.12) {
      rZ = 2.15;
      hT = 0.05;
      gesture = "waveR";
    } else if (p >= 0.35 && p < 0.7) {
      rX = -1.2;
      rZ = 0.2;
      hT = 0.12;
      gesture = "point";
    } else if (p >= 0.8 && p < 0.9) {
      rZ = 2.3;
      lZ = -2.3;
      gesture = "excited";
    } else if (p >= 0.92) {
      rZ = 2.15;
      hT = 0.05;
      gesture = "waveR";
    }

    const po = pose.current;
    po.rZ = damp(po.rZ, rZ, 6, delta);
    po.rX = damp(po.rX, rX, 6, delta);
    po.lZ = damp(po.lZ, lZ, 6, delta);
    po.lX = damp(po.lX, lX, 6, delta);
    po.hT = damp(po.hT, hT, 5, delta);

    if (rArm.current) {
      const osc =
        gesture === "waveR" || gesture === "excited" ? Math.sin(t * 6) * 0.22 : 0;
      rArm.current.rotation.z = po.rZ + osc;
      rArm.current.rotation.x = po.rX;
    }
    if (lArm.current) {
      const osc = gesture === "excited" ? -Math.sin(t * 6) * 0.22 : 0;
      lArm.current.rotation.z = po.lZ + osc;
      lArm.current.rotation.x = po.lX;
    }
    if (head.current) head.current.rotation.z = po.hT;

    colorAt(p, tmp);
    const pulse = 1.3 + Math.sin(t * 2.5) * 0.35; // гэрэлтэлт зөөлөн лугшина
    [visor, chest, tip].forEach((m) => {
      if (m.current) {
        m.current.color.copy(tmp);
        m.current.emissive.copy(tmp);
        m.current.emissiveIntensity = pulse;
      }
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={group} position={[1.5, 0, 0]}>
        <RoundedBox args={[1.0, 1.15, 0.8]} radius={0.18} smoothness={4}>
          <meshStandardMaterial color="#15151b" metalness={0.7} roughness={0.32} />
        </RoundedBox>
        <mesh position={[0, 0.08, 0.41]}>
          <boxGeometry args={[0.5, 0.08, 0.04]} />
          <meshStandardMaterial ref={chest} color="#5eead4" emissive="#5eead4" emissiveIntensity={1.1} toneMapped={false} />
        </mesh>
        <group ref={rArm} position={[0.6, 0.42, 0]} rotation={[0, 0, 0.12]}>
          <RoundedBox args={[0.2, 0.66, 0.24]} radius={0.08} position={[0, -0.38, 0]}>
            <meshStandardMaterial color="#23232b" metalness={0.6} roughness={0.4} />
          </RoundedBox>
        </group>
        <group ref={lArm} position={[-0.6, 0.42, 0]} rotation={[0, 0, -0.12]}>
          <RoundedBox args={[0.2, 0.66, 0.24]} radius={0.08} position={[0, -0.38, 0]}>
            <meshStandardMaterial color="#23232b" metalness={0.6} roughness={0.4} />
          </RoundedBox>
        </group>
        <group ref={head} position={[0, 0.96, 0]}>
          <RoundedBox args={[0.96, 0.76, 0.84]} radius={0.16} smoothness={4}>
            <meshStandardMaterial color="#1f1f29" metalness={0.65} roughness={0.28} />
          </RoundedBox>
          <mesh position={[0, 0.04, 0.43]}>
            <boxGeometry args={[0.68, 0.22, 0.08]} />
            <meshStandardMaterial ref={visor} color="#5eead4" emissive="#5eead4" emissiveIntensity={1.5} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.54, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.42]} />
            <meshStandardMaterial color="#3a3a44" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial ref={tip} color="#5eead4" emissive="#5eead4" emissiveIntensity={1.8} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// Гэрэл — нэг point light scroll-оор өнгөө сольж scene-ийн уур амьсгалыг хөтөлнө
function MoodLight() {
  const light = useRef<THREE.PointLight>(null);
  const tmp = useRef(new THREE.Color()).current;
  useFrame(() => {
    if (light.current) colorAt(getScrollProgress(), light.current.color.copy(tmp));
  });
  return <pointLight ref={light} position={[-4, -1, -2]} intensity={26} color="#5eead4" />;
}

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0a0b"]} />
      <fog attach="fog" args={["#0a0a0b", 8, 22]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <MoodLight />

      <CameraRig />
      <Backdrop />
      <Shards />

      {/* Тусгалтай шал — робот/хэлтэрхийн гэрэл доош тусч "премиум" гүн өгнө */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={35}
          roughness={1}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0b"
          metalness={0.6}
          mirror={0.45}
        />
      </mesh>

      <RobotCharacter />

      <Sparkles count={80} scale={[16, 9, 7]} size={2.5} speed={0.25} opacity={0.5} color="#5eead4" position={[0, 0, -2]} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.95} mipmapBlur radius={0.75} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
