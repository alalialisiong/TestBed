import { useEffect, useRef } from "react";
import { useSTLStore } from "@/stores/index.js";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function STLMesh() {
  const { isLoaded, geometry } = useSTLStore();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isLoaded) {
      // 필요한 애니메이션이나 업데이트를 여기에 추가할 수 있습니다
    }
  });

  if (!isLoaded || !geometry) return null;

  return (
    <mesh ref={meshRef}>
      <primitive object={geometry} attach="geometry" />
      <meshPhongMaterial
        color="skin"
        emissive="black"
        shininess={50}
        specular={new THREE.Color(0x111111)}
        flatShading={false}
      />
    </mesh>
  );
}
