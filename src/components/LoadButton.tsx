import { useCallback } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useSTLStore } from "@/stores/index.js";
import * as THREE from "three";

export function STLLoadButton() {
  const { setGeometryData } = useSTLStore();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;
        if (!contents) return;

        const loader = new STLLoader();
        const geometry = loader.parse(contents as ArrayBuffer);

        // BufferGeometry에서 vertices 및 indices 추출
        const positionAttribute = geometry.getAttribute("position");
        const vertices = positionAttribute.array as Float32Array;

        // STL Loader로 로드된 기하학은 인덱스가 없을 수 있으므로 생성해줌
        let indices: Uint32Array;

        if (!geometry.index) {
          // 인덱스가 없는 경우 생성 (각 삼각형 면에 대해 3개의 정점)
          const count = positionAttribute.count;
          indices = new Uint32Array(count);
          for (let i = 0; i < count; i++) {
            indices[i] = i;
          }
        } else {
          indices = geometry.index.array as Uint32Array;
        }

        setGeometryData(vertices, indices);
      };

      reader.readAsArrayBuffer(file);
    },
    [setGeometryData]
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: 100,
        background: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <input type="file" accept=".stl" onChange={handleFileChange} />
    </div>
  );
}
