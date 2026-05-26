import * as THREE from "three/webgpu";
import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { color, screenUV } from 'three/tsl';

function GradientBackground() {
  const scene = useThree((state) => state.scene);
  React.useEffect(() => {
    const bgColor = screenUV.y.mix(color(0x050a1e), color(0x102050));
    const bgVignette = screenUV.distance(.35).remapClamp(0.0, 0.6).oneMinus();
    scene.backgroundNode = bgColor.mul(bgVignette);

    return () => {
      scene.backgroundNode = null;
    };
  }, [scene]);
  return null;
}

const offsets = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 2, 0];
const zPos = [0, 0, 0, 0, 1.5, -1.5];
const radius = 2;
const rate = 0.25;
function IcoSphere({ index }: { index: number }) {
  const ref = React.useRef<THREE.Mesh>(null!);
  const t = React.useRef(0);
  const materialColor = React.useMemo(
    () => new THREE.Color(Math.random() * 0xffffff).offsetHSL(0, 0, 0.25),
    []
  );
  useFrame((_, delta) => {
    t.current += delta;
    ref.current.position.z = zPos[index];
    if (index < 4) {
      ref.current.position.x = Math.cos(t.current * rate + offsets[index]) * radius;
      ref.current.position.y = Math.sin(t.current * rate + offsets[index]) * radius;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial color={materialColor} flatShading />
    </mesh>
  );
}

function MouseLight() {
  const lightMesh = React.useRef<THREE.Mesh>(null!);
  const { camera, pointer, raycaster } = useThree();

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / document.documentElement.scrollHeight) * 2 - 1);
      console.log(pointer, document.documentElement.scrollTop);
    };
    // window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  const plane = React.useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );

  const mouseWorld = React.useRef(new THREE.Vector3());

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, mouseWorld.current);

    lightMesh.current.position.copy(mouseWorld.current);
  });
  return (
    <mesh ref={lightMesh}>
      <meshBasicMaterial color={0xffffff} />
      <icosahedronGeometry args={[0.025, 1]} />
      <pointLight color={0xffffff} intensity={1.5} />
    </mesh>
  );
}

function HeroGroup() {
  const ref = React.useRef<THREE.Group>(null!);
  const children = [];
  const groupRate = 0.15;
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * groupRate;
  });
  for (let i = 0; i < 6; i += 1) {
    children.push(<IcoSphere index={i} key={i} />);
  }
  return (
    <group ref={ref} position={[1.5, 6, 0]}>
      {children}
    </group>
  );
}

const canvasStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

function HeroBackground() {
  return (
    <Canvas id="three-canvas" style={canvasStyle} camera={{ position: [0, 0, 30], fov: 35 }}
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer({
          canvas: props.canvas instanceof HTMLCanvasElement ? props.canvas : undefined,
          antialias: props.antialias ?? true,
          alpha: props.alpha ?? true,
          powerPreference: "high-performance",
        });
        await renderer.init();
        return renderer;
      }}>
      <GradientBackground />
      <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
      <HeroGroup />
      <MouseLight />
    </Canvas >
  );
}

export default HeroBackground;
