"use client";

import { useEffect, useRef } from "react";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Hero() {
  const bgWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!bgWordRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bgWordRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero">
      <span ref={bgWordRef} className="hero__ghost" aria-hidden>
        YAGA
      </span>

      <div className="hero__glow" aria-hidden />

      <div className="hero__eyebrow">
        <span className="hero__eyebrow-line" />
        <span className="hero__eyebrow-label">Студия дизайна и разработки</span>
      </div>

      <h1 className="hero__heading">
        Делаем то,
        <br />
        на что другие
        <br />
        <em className="hero__heading-accent">не решаются</em>
      </h1>

      <div className="hero__bottom">
        <p className="hero__description">
          Бутиковая студия без лишних звеньев.{" "}
          <strong>Дизайн и разработка — полный цикл.</strong>{" "}
          Вы говорите с теми, кто делает — не с менеджером, который говорит с
          теми, кто делает.
        </p>

        <div className="hero__actions">
          <a href="#contact" data-hover className="hero__cta">
            Обсудить проект
            <ArrowIcon />
          </a>
          <span className="hero__scroll-hint">↓ прокрути</span>
        </div>
      </div>

      <div className="hero__divider" aria-hidden />
    </section>
  );
}
