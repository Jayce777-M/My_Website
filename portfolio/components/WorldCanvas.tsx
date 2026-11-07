"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text, Sparkles, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Zone = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  position: [number, number, number];
};

const zones: Zone[] = [
  { id: "projects", title: "PROJECT LAB", subtitle: "AI · SOFTWARE · BUILDS", color: "#6fe5ff", position: [-4.3, 0.15, -1.5] },
  { id: "experience", title: "ENGINEERING HQ", subtitle: "EXPERIENCE · SKILLS", color: "#a78bfa", position: [0, 0.15, -3.1] },
  { id: "education", title: "THE ACADEMY", subtitle: "EDUCATION · LEARNING", color: "#7ef0c2", position: [4.2, 0.15, -1.4] },
];

function NeonRing({ color, radius = 1.1 }: { color: string; radius?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.018, 8, 72]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

function Building({ zone, onSelect }: { zone: Zone; onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * (hovered ? 0.16 : 0.035);
  });

  return (
    <group position={zone.position}>
      <group ref={group}>
        <mesh position={[0, 0.72, 0]} castShadow onClick={() => onSelect(zone.id)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <boxGeometry args={[1.55, 1.45, 1.25]} />
          <meshStandardMaterial color="#101d36" metalness={0.78} roughness={0.28} emissive={zone.color} emissiveIntensity={hovered ? 0.35 : 0.12} />
        </mesh>
        <mesh position={[0, 1.52, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.12, 0.55, 4]} />
          <meshStandardMaterial color="#172b4d" metalness={0.65} roughness={0.25} emissive={zone.color} emissiveIntensity={0.22} />
        </mesh>
        {[-0.42, 0, 0.42].map((x) => (
          <mesh key={x} position={[x, 0.78, 0.636]}>
            <boxGeometry args={[0.13, 0.62, 0.025]} />
            <meshBasicMaterial color={zone.color} />
          </mesh>
        ))}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.9, 0.12, 1.65]} />
          <meshStandardMaterial color="#172b48" metalness={0.8} roughness={0.35} />
        </mesh>
      </group>
      <Float speed={1.5} floatIntensity={0.12}>
        <Text position={[0, 2.45, 0]} fontSize={0.2} color={hovered ? "#ffffff" : zone.color} anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor="#07101f">
          {zone.title}
        </Text>
        <Text position={[0, 2.18, 0]} fontSize={0.075} color="#a9bddb" anchorX="center" anchorY="middle">
          {zone.subtitle}
        </Text>
      </Float>
      <group position={[0, 0.03, 0]}>
        <NeonRing color={zone.color} radius={1.22} />
      </group>
      {hovered && <Sparkles count={18} scale={[2, 2, 2]} size={2.5} color={zone.color} />}
    </group>
  );
}

function Avatar() {
  const ref = useRef<THREE.Group>(null);
  const keys = useRef<Record<string, boolean>>({});
  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        keys.current[key] = true;
        event.preventDefault();
      }
    };
    const up = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = false; };
    const clear = () => { keys.current = {}; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, []);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const speed = 2.8 * delta;
    const x = Number(keys.current.d || keys.current.arrowright) - Number(keys.current.a || keys.current.arrowleft);
    const z = Number(keys.current.s || keys.current.arrowdown) - Number(keys.current.w || keys.current.arrowup);
    ref.current.position.x = THREE.MathUtils.clamp(ref.current.position.x + x * speed, -7.2, 7.2);
    ref.current.position.z = THREE.MathUtils.clamp(ref.current.position.z + z * speed, -4.8, 5.4);
    if (x || z) ref.current.rotation.y = Math.atan2(x, z);
    ref.current.position.y = 0.35 + Math.sin(state.clock.elapsedTime * 1.8) * 0.055;
  });
  return (
    <group ref={ref} position={[2.15, 0.35, 2.8]}>
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.58, 0.78, 0.38]} />
        <meshBasicMaterial color="#00cfff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.12, 0]}>
        <sphereGeometry args={[0.29, 24, 24]} />
        <meshBasicMaterial color="#f2fdff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.13, 0.255]}>
        <boxGeometry args={[0.3, 0.09, 0.035]} />
        <meshBasicMaterial color="#071a35" toneMapped={false} />
      </mesh>
      {[-0.19, 0.19].map((x) => <mesh key={x} position={[x, 0.08, 0]}><cylinderGeometry args={[0.085, 0.1, 0.42, 10]} /><meshBasicMaterial color="#a7f3ff" toneMapped={false} /></mesh>)}
      {[-0.39, 0.39].map((x) => <mesh key={x} position={[x, 0.62, 0]} rotation={[0, 0, x > 0 ? -0.18 : 0.18]}><cylinderGeometry args={[0.075, 0.09, 0.5, 10]} /><meshBasicMaterial color="#a7f3ff" toneMapped={false} /></mesh>)}
      <pointLight position={[0, 1.1, 0.3]} color="#38dfff" intensity={2.8} distance={4} />
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.48, 48]} />
        <meshBasicMaterial color="#54eaff" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function WorldScene({ onSelect }: { onSelect: (id: string) => void }) {
  const floor = useMemo(() => new THREE.PlaneGeometry(200, 200), []);
  return (
    <>
      <color attach="background" args={["#050a16"]} />
      <fog attach="fog" args={["#050a16", 13, 32]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 9, 5]} intensity={1.8} color="#c8e4ff" />
      <pointLight position={[-5, 4, -4]} intensity={22} distance={16} color="#397cff" />
      <pointLight position={[5, 3, -2]} intensity={16} distance={12} color="#a56bff" />
      <mesh geometry={floor} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <meshStandardMaterial color="#080f20" metalness={0.45} roughness={0.7} />
      </mesh>
      <gridHelper args={[42, 42, "#1a4970", "#10233d"]} position={[0, -0.055, 0]} />
      <Stars radius={70} depth={45} count={1800} factor={3} saturation={0.4} fade speed={0.35} />
      <Sparkles count={90} scale={[18, 8, 18]} size={1.7} speed={0.25} color="#7bdcff" />
      <Float speed={0.45} rotationIntensity={0.08} floatIntensity={0.1}>
        <mesh position={[0, 4.8, -5]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color="#2358a3" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
      {zones.map((zone) => <Building key={zone.id} zone={zone} onSelect={onSelect} />)}
      <Avatar />
      {/* Temporary render diagnostic: this magenta sphere is independent of Avatar. */}
      <mesh position={[2.15, 1.35, 2.8]} renderOrder={999}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color="#ff00d4" toneMapped={false} depthTest={false} />
      </mesh>
      <OrbitControls target={[0, 1, 0.4]} enablePan={false} enableDamping dampingFactor={0.06} minDistance={8} maxDistance={17} maxPolarAngle={Math.PI / 2.05} />
      <mesh position={[2.15, -0.03, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.82, 48]} />
        <meshBasicMaterial color="#65dfff" transparent opacity={0.09} />
      </mesh>
    </>
  );
}

export default function WorldCanvas({ onSelect }: { onSelect: (id: string) => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="world-canvas" aria-hidden="true" />;
  return (
    <div className="world-canvas" aria-label="Interactive 3D developer universe. Select a glowing building to explore a section.">
      <Canvas camera={{ position: [0, 5.2, 11.8], fov: 50 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={null}>
          <WorldScene onSelect={onSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
}
