"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };

    const onEnter = () => {
      hovering.current = true;
    };
    const onLeave = () => {
      hovering.current = false;
    };

    document.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button, [data-hover]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    let raf: number;
    const animate = () => {
      const { mx, my, rx, ry } = pos.current;
      const lerp = hovering.current ? 0.08 : 0.12;
      pos.current.rx = rx + (mx - rx) * lerp;
      pos.current.ry = ry + (my - ry) * lerp;

      if (ringRef.current) {
        const size = hovering.current ? 52 : 34;
        ringRef.current.style.transform = `translate(${pos.current.rx - size / 2}px, ${pos.current.ry - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </>
  );
}
