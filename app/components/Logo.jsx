"use client";

import { useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

export default function Logo({
  targetSize = 3,
  rotation = [0, 0, 0],
}) {
  const { scene } = useGLTF("/csi_3d_logo_2.glb");

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();

    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    return targetSize / maxDim;
  }, [scene, targetSize]);

  return (
    <Center>
      <primitive
        object={scene}
        scale={scale}
        rotation={rotation}
      />
    </Center>
  );
}

useGLTF.preload("/csi_3d_logo_2.glb");