import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { Suspense, useRef } from "react";

/* Flat rounded-rectangle mesh with correct UV mapping for a photo.
   Uses THREE.Shape so the geometry is 2D — UVs are normalized from the
   vertex positions so the texture fills the rect perfectly. */
function RoundedPhotoMesh({
  tex,
  size,
  radius,
}: {
  tex: THREE.Texture;
  size: number;
  radius: number;
}) {
  const geometry = useMemo(() => {
    const hw = size / 2;
    const r = Math.min(radius, hw * 0.99);
    const shape = new THREE.Shape();
    shape.moveTo(-hw + r, -hw);
    shape.lineTo(hw - r, -hw);
    shape.absarc(hw - r, -hw + r, r, -Math.PI / 2, 0, false);
    shape.lineTo(hw, hw - r);
    shape.absarc(hw - r, hw - r, r, 0, Math.PI / 2, false);
    shape.lineTo(-hw + r, hw);
    shape.absarc(-hw + r, hw - r, r, Math.PI / 2, Math.PI, false);
    shape.lineTo(-hw, -hw + r);
    shape.absarc(-hw + r, -hw + r, r, Math.PI, (3 * Math.PI) / 2, false);
    const geo = new THREE.ShapeGeometry(shape, 48);
    // Remap UVs: vertex position → 0..1 so the photo fills the rect
    const pos = geo.attributes.position;
    const uvArr = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uvArr[i * 2] = (pos.getX(i) + hw) / size;
      uvArr[i * 2 + 1] = (pos.getY(i) + hw) / size;
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
    return geo;
  }, [size, radius]);

  return (
    <mesh geometry={geometry} position={[0, 0, 0.13]}>
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

/* ------------------------------------------------------------------
   Floating 3D portrait: your photo (background removed, rounded
   corners) inside a glowing rounded bezel, with drifting sparkles
   and orbiting accent dots.
   ------------------------------------------------------------------ */
function Portrait() {
  const tex = useTexture("/styles/clean.png");
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const orbit = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.z += delta * 0.25;
  });

  return (
    <group>
      {/* soft tinted-glass halo */}
      <mesh position={[0, 0, -0.6]}>
        <circleGeometry args={[2.7, 64]} />
        <meshBasicMaterial color="#3ddc84" transparent opacity={0.07} />
      </mesh>

      {/* near-flat depth prevents 3D edge faces from appearing at any tilt angle */}
      <RoundedBox args={[3.15, 3.15, 0.05]} radius={0.6} smoothness={10}>
        <meshStandardMaterial
          color="#0c1a12"
          emissive="#3ddc84"
          emissiveIntensity={0.4}
          metalness={0.25}
          roughness={0.45}
        />
      </RoundedBox>

      {/* 2D rounded-rect with hand-computed UVs so the photo fills correctly.
          Same radius as the bezel → corners are geometrically identical. */}
      <RoundedPhotoMesh tex={tex} size={2.78} radius={0.88} />

      {/* drifting sparkles around the frame */}
      <Sparkles
        count={50}
        scale={[7, 7, 3]}
        size={2.6}
        speed={0.4}
        opacity={0.7}
        color="#6effb0"
      />

      {/* orbiting accent dots */}
      <group ref={orbit}>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.45, Math.sin(a) * 2.45, 0.4]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color="#3ddc84" emissive="#3ddc84" emissiveIntensity={2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (-pointer.y * 0.22 - group.current.rotation.x) * 0.06;
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroPhoto() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={22} color="#6effb0" />
        <pointLight position={[-5, -3, 2]} intensity={30} color="#38bdf8" />
        <directionalLight position={[0, 3, 5]} intensity={1.1} />

        <PointerRig>
          <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
            <Portrait />
          </Float>
        </PointerRig>

        <Stars radius={40} depth={30} count={1000} factor={3} fade speed={0.5} />
      </Suspense>
    </Canvas>
  );
}
