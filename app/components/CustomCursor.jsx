"use client";

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  const outerRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const hovering = !!target.closest("a, button");

      if (hovering !== isHovering.current) {
        isHovering.current = hovering;

        if (outerRef.current) {
          outerRef.current.setAttribute(
            "data-hovering",
            String(hovering)
          );
        }
      }
    };

    const animate = () => {
      const LERP = 0.12;

      outer.current.x +=
        (mouse.current.x - outer.current.x) * LERP;

      outer.current.y +=
        (mouse.current.y - outer.current.y) * LERP;

      if (outerRef.current) {
        outerRef.current.style.left = `${outer.current.x}px`;
        outerRef.current.style.top = `${outer.current.y}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={outerRef}
        data-hovering="false"
        className="
          fixed pointer-events-none z-9999 rounded-full
          border-2 border-[#ffffff]
          w-10 h-10
          transition-[width,height,opacity] duration-300 ease-out
          data-[hovering=true]:w-16
          data-[hovering=true]:h-16
        "
        style={{
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "transform, left, top",
        }}
      />

      <div
        ref={dotRef}
        className="
          fixed pointer-events-none z-10000
          w-2 h-2 bg-[#ffffff] rounded-full
        "
        style={{
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "left, top",
        }}
      />
    </>
  );
};

export default CustomCursor;