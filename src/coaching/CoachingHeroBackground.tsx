import * as THREE from "three/webgpu"
import { Suspense, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { useProgress } from "@react-three/drei"
import { color, mix, screenUV, time } from 'three/tsl'
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js'

function UltraHDREnvironment() {
  const scene = useThree((state) => state.scene);
  const hdr = useLoader(UltraHDRLoader, './assets/env/royal_esplanade_2k.hdr.jpg');
  useEffect(() => {
    if (!hdr) return;
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    hdr.colorSpace = THREE.SRGBColorSpace;
    scene.environment = hdr;
    scene.environmentIntensity = 2.0;
    return () => {
      scene.environment = null;
      hdr.dispose?.()
    }
  }, [scene, hdr]);
  return null;
}

function GradientBackground() {
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    const bgColor = screenUV.y.mix(color('#112262'), color('#213f98'));
    const bgVignette = screenUV.distance(.35).remapClamp(0.0, 0.6).oneMinus();
    const goalColor = bgColor.mul(bgVignette);
    scene.backgroundNode = mix(color(0x000000), goalColor, time.mul(0.1).clamp(0, 1));
    return () => {
      scene.backgroundNode = null;
    };
  }, [scene]);
  return null;
}

function HeroMesh() {
  const ref = useRef<THREE.Mesh>(null!)
  const t = useRef(0);
  const rate = 0.25;
  const scrollPosY = useRef(0);

  useEffect(() => {
    const scrollMult = 4;
    function handleScroll() {
      scrollPosY.current = (window.scrollY / window.innerHeight) * scrollMult;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useFrame((_, delta) => {
    t.current += delta;
    ref.current.rotation.x = t.current * rate;
    ref.current.rotation.z = t.current * rate;
    ref.current.position.y = scrollPosY.current;
  });
  return (
    <mesh ref={ref} position={[1, 0, 0]} scale={0.85}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial color={"#004b88"} roughness={0.2} metalness={0.6} envMapIntensity={0.05} />
    </mesh>
  );
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const canvasStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const progressStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  color: "rgba(255,255,255,1.0)",
  fontFamily: "monospace",
  fontSize: "0.75rem",
  pointerEvents: "none",
  transition: "opacity 0.5s ease",
  zIndex: 1,
};

function CoachingHeroBackground() {
  const { active, progress } = useProgress();
  return (
    <>
      <Canvas id="three-canvas" style={canvasStyle} camera={{ position: [0, 0, 12], fov: 35 }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer({
            canvas: props.canvas instanceof HTMLCanvasElement ? props.canvas : undefined,
            antialias: props.antialias ?? true,
            alpha: props.alpha ?? true,
            powerPreference: "high-performance",
            forceWebGL: isMobile,
          });
          await renderer.init();
          return renderer;
        }}>
        <GradientBackground />
        <Suspense fallback={null}>
          <UltraHDREnvironment />
          <HeroMesh />
        </Suspense>
      </Canvas>
      <div style={{ ...progressStyle, opacity: active ? 1 : 0 }}>
        {Math.round(progress)}%
      </div>
    </>
  );
}

export default CoachingHeroBackground;
