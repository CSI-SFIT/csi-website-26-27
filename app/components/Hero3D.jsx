"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Logo from "./Logo.jsx";

export default function Hero3D() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Environment preset="city" />

      <Logo targetSize={3} rotation={[0, Math.PI, 0]} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={1}
        maxDistance={8}
        target={[0, 0, 0]}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}