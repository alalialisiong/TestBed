import { Canvas } from "@react-three/fiber";
import { STLMesh } from "@/objects/index.js";
import { STLLoadButton } from "@/components/LoadButton.js";
import { OrbitControls, Environment, SoftShadows } from "@react-three/drei";

export function App() {
  return (
    <>
      <STLLoadButton />
      <Canvas
        orthographic
        camera={{
          position: [100, 100, 100],
          zoom: 8,
          near: 0.1,
          far: 2000,
        }}
      >
        {/* 부드러운 그림자 설정 */}
        <SoftShadows size={10} samples={16} />

        {/* 기본 주변광 */}
        <ambientLight intensity={0.3} />

        {/* 모든 방향에서 표면이 잘 보이도록 여러 조명 배치 */}
        <directionalLight position={[50, 100, 50]} intensity={0.5} castShadow />
        <directionalLight position={[-50, 50, -50]} intensity={0.3} />
        <directionalLight position={[100, 0, 0]} intensity={0.2} />
        <directionalLight position={[-100, 0, 0]} intensity={0.2} />
        <directionalLight position={[0, 0, 100]} intensity={0.2} />
        <directionalLight position={[0, 0, -100]} intensity={0.2} />

        {/* 전체적인 환경광 추가 */}
        {/* <Environment preset="city" background={false} /> */}
        {/* 배경색 설정 */}
        {/* <color attach="background" args={["#f0f0f0"]} /> */}
        <STLMesh />
        <OrbitControls />
        <axesHelper args={[20]} />
        <gridHelper args={[200, 20]} />
      </Canvas>
    </>
  );
}
