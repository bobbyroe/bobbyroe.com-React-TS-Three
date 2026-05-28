import * as THREE from "three/webgpu"
import React from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { color, screenUV } from 'three/tsl'
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function UltraHDREnvironment() {
  const scene = useThree((state) => state.scene);
  const hdr = useLoader(UltraHDRLoader, './assets/env/studio_garden_4k.jpg');
  React.useEffect(() => {
    if (!hdr) return;
    hdr.mapping = THREE.EquirectangularReflectionMapping;
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
  React.useEffect(() => {
    const bgColor = screenUV.y.mix(color('#112262'), color('#213f98'));
    const bgVignette = screenUV.distance(.35).remapClamp(0.0, 0.6).oneMinus();
    scene.backgroundNode = bgColor.mul(bgVignette);
    return () => {
      scene.backgroundNode = null;
    };
  }, [scene]);
  return null;
}

type MeshEntry = {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  offset: number;
  z: number;
}

function HeroMesh({ index, entry }: { index: number; entry: MeshEntry }) {
  const ref = React.useRef<THREE.Mesh>(null!)
  const t = React.useRef(0)
  const radius = 2
  const rate = 0.25
  
  useFrame((_, delta) => {
    t.current += delta;
    ref.current.position.z = entry.z;
    if (index < 4) {
      ref.current.position.x = Math.cos(t.current * rate + entry.offset) * radius;
      ref.current.position.y = Math.sin(t.current * rate + entry.offset) * radius;
    }
  });
  return (
    <mesh ref={ref} geometry={entry.geometry} material={entry.material} />
  );
}

function MouseLight() {
  const lightMesh = React.useRef<THREE.Mesh>(null!);
  const { camera, pointer, raycaster } = useThree();

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / document.documentElement.scrollHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
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
      <meshBasicMaterial color={0xffffff} transparent opacity={0.05} />
      <icosahedronGeometry args={[0.025, 1]} />
      <pointLight color={0xffffff} intensity={1.5} />
    </mesh>
  );
}

function HeroGroup() {
  const ref = React.useRef<THREE.Group>(null!);
  const glb = useLoader(GLTFLoader, "./assets/duck.glb");
  const woodMap = useLoader(THREE.TextureLoader, "./assets/wood/baseColor.jpg");
  const woodNormalMap = useLoader(THREE.TextureLoader, "./assets/wood/normal.jpg");
  const woodRoughnessMap = useLoader(THREE.TextureLoader, "./assets/wood/roughness.jpg");

  const entries = React.useMemo<MeshEntry[]>(() => {
    let duckGeometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(0.75, 1);
    let duckMaterial: THREE.Material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

    glb.scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      duckGeometry = child.geometry.clone();
      duckGeometry.scale(0.01, 0.01, 0.01);
      const meshMaterial = Array.isArray(child.material) ? child.material[0] : child.material;
      if (meshMaterial) {
        duckMaterial = meshMaterial;
      }
    });

    return [
      {
        geometry: new THREE.TorusKnotGeometry(0.5, 0.2, 128, 64),
        material: new THREE.MeshPhysicalMaterial({ roughness: 0.0, metalness: 1.0, thickness: 1.0 }),
        offset: 0,
        z: 0,
      },
      {
        geometry: new RoundedBoxGeometry(1, 1, 1, 4, 0.02),
        material: new THREE.MeshStandardMaterial({ 
          map: woodMap, 
          normalMap: woodNormalMap, 
          roughnessMap: woodRoughnessMap,
          normalScale: new THREE.Vector2(6, 6), 
        }),
        offset: Math.PI * 0.5,
        z: 0,
      },
      {
        geometry: new THREE.IcosahedronGeometry(0.75, 4),
        material: new THREE.MeshPhysicalMaterial({
          roughness: 0.0,
          metalness: 0.0,
          transmission: 1.0,
          thickness: 1.0,
          transparent: true,
          flatShading: true,
        }),
        offset: Math.PI,
        z: 0,
      },
      {
        geometry: duckGeometry,
        material: duckMaterial,
        offset: Math.PI * 1.5,
        z: 0,
      },
      {
        geometry: new THREE.IcosahedronGeometry(0.75, 1),
        material: new THREE.MeshBasicMaterial({ color: 0x00ccff, wireframe: true }),
        offset: Math.PI * 2,
        z: 1.5,
      },
      {
        geometry: new TeapotGeometry(0.6),
        material: new THREE.MeshPhysicalMaterial({
          color: 0x0099ff, roughness: 0.0, metalness: 1.0, thickness: 1.0
        }),
        offset: 0,
        z: -1.5,
      },
    ];
  }, [glb]);

  const groupRate = 0.15;
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * groupRate;
  });

  return (
    <group ref={ref} position={[1.5, 7, 0]}>
      {entries.map((entry, index) => <HeroMesh index={index} entry={entry} key={index} />)}
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
    <Canvas id="three-canvas" style={canvasStyle} camera={{ position: [0, 0, 35], fov: 35 }}
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
      <UltraHDREnvironment />
      <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
      <HeroGroup />
      <MouseLight />
    </Canvas >
  );
}

export default HeroBackground;
