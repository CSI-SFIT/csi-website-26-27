"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Logo from "./Logo.jsx";

export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  // Don't initialize WebGL on phones. A static logo gives the same visual
  // identity without making the first mobile render depend on GPU/WebGL.
  if (isMobile === true) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src="/csi_logo_white_no_bg.png"
          alt="CSI SFIT"
          width={360}
          height={360}
          priority
          className="h-[78%] w-[78%] object-contain drop-shadow-[0_0_40px_rgba(249,115,22,0.35)]"
        />
      </div>
    );
  }

  // Keep the server/initial client render lightweight and deterministic while
  // the viewport is being detected. Desktop swaps to WebGL immediately after
  // mount; mobile swaps to the static image above.
  if (isMobile === null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src="/csi_logo_white_no_bg.png"
          alt="CSI SFIT"
          width={360}
          height={360}
          priority
          className="h-[78%] w-[78%] object-contain drop-shadow-[0_0_40px_rgba(249,115,22,0.35)]"
        />
      </div>
    );
  }

  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
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
