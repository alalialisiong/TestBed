import { create } from "zustand";
import * as THREE from "three";

interface ModelState {
  vertices: Float32Array | null;
  indices: Uint32Array | null;
  isLoaded: boolean;
  geometry: THREE.BufferGeometry | null;

  // Actions
  setGeometryData: (vertices: Float32Array, indices: Uint32Array) => void;
  resetGeometry: () => void;
}

export const useSTLStore = create<ModelState>((set) => ({
  vertices: null,
  indices: null,
  isLoaded: false,
  geometry: null,

  setGeometryData: (vertices: Float32Array, indices: Uint32Array) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    set({
      vertices,
      indices,
      isLoaded: true,
      geometry,
    });
  },

  resetGeometry: () =>
    set({
      vertices: null,
      indices: null,
      isLoaded: false,
      geometry: null,
    }),
}));
