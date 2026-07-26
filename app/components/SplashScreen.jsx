"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const texts = ["CSI SFIT", "WE MAKE IT HAPPEN"];

export default function SplashScreen({ onFinish }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hide, setHide] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        const delay = displayText.length === 0 ? 200 : 90;
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, delay);
      } else {
        if (textIndex === 0) {
          timeout = setTimeout(() => setIsDeleting(true), 1100);
        } else {
          timeout = setTimeout(() => {
            setHide(true);
            setTimeout(() => {
              onFinish();
            }, 900);
          }, 1600);
        }
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setTextIndex(1);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black transition-all duration-900 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        hide
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute h-112 w-112 rounded-full bg-orange-500/20 blur-[160px] animate-glow-pulse" />
      <div className="absolute h-64 w-64 rounded-full bg-orange-400/10 blur-[100px] animate-glow-pulse-slow" />

      <div
        className={`relative mb-12 transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-90"
        } animate-logo-float`}
      >
        <Image
          src="/csi_logo_white_no_bg.png"
          alt="CSI Logo"
          width={240}
          height={240}
          priority
          className="drop-shadow-[0_0_40px_rgba(249,115,22,0.35)]"
        />
      </div>

      <h1
        className={`font-mono font-bold tracking-[0.3em] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {displayText}
        <span className="animate-cursor-blink text-orange-500">|</span>
      </h1>
    </div>
  );
}
